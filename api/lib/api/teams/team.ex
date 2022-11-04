defmodule Api.Teams.Team do
  use Ecto.Schema
  import Ecto.Changeset
  alias Api.Users.User

  schema "teams" do
    field :name, :string

    belongs_to :users, User

    timestamps()
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
