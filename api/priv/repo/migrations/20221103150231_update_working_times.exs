defmodule Api.Repo.Migrations.UpdateWorkingTimes do
  use Ecto.Migration

  def change do
    alter table("workingtimes") do
      add :team_id, references(:teams)
      add :validated, :boolean, default: true, null: false
    end
    create index(:teams, [:id])
  end
end
