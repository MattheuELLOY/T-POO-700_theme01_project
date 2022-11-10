defmodule Api.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string, null: false
      add :email, :string, null: false
      add :password, :string, null: false
      add :role, :string, null: false
      add :parameter, :id
      add :team_id, :id

      timestamps()
    end
      create unique_index(:users, :email)
      create unique_index(:users, :username)
  end
end
