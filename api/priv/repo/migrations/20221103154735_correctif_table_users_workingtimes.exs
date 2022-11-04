defmodule Api.Repo.Migrations.CorrectifTableUsersWorkingtimes do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :team_id, references(:teams)
    end


    alter table("workingtimes") do
      remove :team_id
      add :team_id, references(:teams)
    end

    create index(:teams, [:id])
  end
end
