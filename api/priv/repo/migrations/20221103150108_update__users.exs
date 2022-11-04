defmodule Api.Repo.Migrations.Update_Users do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :parameter, references(:parameters)
      add :password, :string
      add :role, :string
    end
    create index(:parameters, [:id])
  end
end
