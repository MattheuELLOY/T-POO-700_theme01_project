defmodule Api.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Api.AuthTokens.AuthToken
  alias Api.Workingtimes.Workingtime

    @derive {Jason.Encoder, except: [:__meta__, :auth_tokens, :password, :workingtimes]}
  schema "users" do
    field :email, :string
    field :username, :string
    field :password, :string
    field :role, :string, default: "user"

    has_many :auth_tokens, AuthToken
    has_many :workingtimes, Workingtime

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :role, :password])
    |> validate_required([:username, :email, :role, :password])
    |> validate_length(:username, min: 2, max: 20)
    |> validate_length(:password, min: 6, max: 30)
    |> validate_format(:email, ~r/^[A-Za-z0-9\._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/)
    |> validate_format(:password, ~r/^[A-Za-z0-9_%+-]/)
    |> unique_constraint([:email, :username])
    |> update_change(:email, fn email -> String.downcase(email) end)
    |> hash_password
    end

    defp hash_password(changeset) do
      case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} -> put_change(changeset, :password, Pbkdf2.hash_pwd_salt(password))
      _-> changeset
   end
  end
end
