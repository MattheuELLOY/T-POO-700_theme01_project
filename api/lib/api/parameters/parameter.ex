defmodule Api.Parameters.Parameter do
  use Ecto.Schema
  import Ecto.Changeset

  schema "parameters" do
    field :allowed_to_modify_WT, :boolean, default: false
    field :daily_hours, :float
    field :day_per_week, :float
    field :filling_mode, :string

    timestamps()
  end

  @doc false
  def changeset(parameter, attrs) do
    parameter
    |> cast(attrs, [:daily_hours, :day_per_week, :filling_mode, :allowed_to_modify_WT])
    |> validate_required([:daily_hours, :day_per_week, :filling_mode, :allowed_to_modify_WT])
  end
end
