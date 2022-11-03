defmodule Api.Repo.Migrations.CorrectifTableTeams do
  use Ecto.Migration

  def change do
    drop table("teams"), mode: :cascade
  end
end
