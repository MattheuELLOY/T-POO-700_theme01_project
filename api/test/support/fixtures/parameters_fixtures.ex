defmodule Api.ParametersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.Parameters` context.
  """

  @doc """
  Generate a parameter.
  """
  def parameter_fixture(attrs \\ %{}) do
    {:ok, parameter} =
      attrs
      |> Enum.into(%{
        allowed_to_modify_WT: true,
        daily_hours: 120.5,
        day_per_week: 120.5,
        filling_mode: "some filling_mode"
      })
      |> Api.Parameters.create_parameter()

    parameter
  end
end
