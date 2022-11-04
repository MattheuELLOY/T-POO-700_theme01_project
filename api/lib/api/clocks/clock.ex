defmodule Api.Clocks.Clock do
  use Ecto.Schema
  import Ecto.Changeset
  alias Api.Users.User

  schema "clocks" do
    field :status, :boolean, default: true
    field :time, :naive_datetime
    field :user, :id

    belongs_to :users, User

    timestamps()
  end

  @doc false
  def changeset(clock, attrs) do
    clock
    |> cast(attrs, [:time, :status, :user])
    |> validate_required([:time, :status])
  end
end
