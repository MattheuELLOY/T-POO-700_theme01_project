defmodule ApiWeb.WorkingtimeView do
  use ApiWeb, :view
  alias ApiWeb.WorkingtimeView

  def render("index.json", %{workingtimes: workingtimes}) do
    %{data: render_many(workingtimes, WorkingtimeView, "workingtime.json")}
  end

  def render("show.json", %{workingtime: workingtime}) do
    %{data: render_one(workingtime, WorkingtimeView, "workingtime.json")}
  end

  def render("workingtime.json", %{workingtime: workingtime}) do
    %{
      id: workingtime.id,
      start: workingtime.start,
      end: workingtime.end,
      user: workingtime.user,
      validated: workingtime.validated,
      team_id: workingtime.team_id
    }
  end
end
