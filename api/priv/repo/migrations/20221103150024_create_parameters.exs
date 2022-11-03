defmodule Api.Repo.Migrations.CreateParameters do
  use Ecto.Migration

  def change do
    create table(:parameters) do
      add :daily_hours, :float
      add :day_per_week, :float
      add :filling_mode, :string
      add :allowed_to_modify_WT, :boolean, default: false, null: false

      timestamps()
    end
  end
end
