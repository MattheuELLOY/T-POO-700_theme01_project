defmodule Api.Workingtimes.Workingtime do
  use Ecto.Schema
  import Ecto.Changeset
  alias Api.Users.User


  schema "workingtimes" do
    field :end, :naive_datetime
    field :start, :naive_datetime
    field :user, :id
    field :validated, :boolean, default: false
    field :team_id, :id

    belongs_to :users, User

    timestamps()
  end

  @doc false
  def changeset(workingtime, attrs) do
    workingtime
    |> cast(attrs, [:start, :end, :user, :validated, :team_id])
    |> validate_required([:start, :end])
  end
end
