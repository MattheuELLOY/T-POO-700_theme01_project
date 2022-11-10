defmodule ApiWeb.ParameterView do
  use ApiWeb, :view
  alias ApiWeb.ParameterView

  def render("index.json", %{parameters: parameters}) do
    %{data: render_many(parameters, ParameterView, "parameter.json")}
  end

  def render("show.json", %{parameter: parameter}) do
    %{data: render_one(parameter, ParameterView, "parameter.json")}
  end

  def render("parameter.json", %{parameter: parameter}) do
    %{
      id: parameter.id,
      daily_hours: parameter.daily_hours,
      day_per_week: parameter.day_per_week,
      filling_mode: parameter.filling_mode,
      allowed_to_modify_WT: parameter.allowed_to_modify_WT
    }
  end
end
