defmodule ApiWeb.WorkingtimeController do
  use ApiWeb, :controller

  alias Api.Workingtimes
  alias Api.Workingtimes.Workingtime

  action_fallback ApiWeb.FallbackController

  def create(conn, %{"userId" => id, "workingtime" => workingtime_params}) do
    completed_params = Map.put(workingtime_params, "user", id)
    with {:ok, %Workingtime{} = workingtime} <- Workingtimes.create_workingtime(completed_params) do
      conn
      |> put_status(:created)
#      |> put_resp_header("location", Routes.workingtime_path(conn, :show, workingtime))
      |> render("show.json", workingtime: workingtime)
    end
  end

  def index(conn, %{"userId" => userId, "start" => start, "end" => end_time}) do
    workingtimes = Workingtimes.list_workingtimes(%{"userId" => userId, "start" => start, "end" => end_time})
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def index(conn, _params) do
    workingtimes = Workingtimes.list_workingtimes()
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def show(conn, %{"userId" => userId, "id" => id}) do
    workingtime = Workingtimes.get_workingtime_by_user(userId, id)
    render(conn, "show.json", workingtime: workingtime)
  end

  def show(conn, %{"userId" => userId, "id"=> id}) do
    workingtime = Workingtimes.get_workingtime_by_user!(userId, id)
    render(conn, "show.json", workingtime: workingtime)
  end



  def update(conn, %{"id" => id, "workingtime" => workingtime_params}) do
    workingtime = Workingtimes.get_workingtime!(id)

    with {:ok, %Workingtime{} = workingtime} <- Workingtimes.update_workingtime(workingtime, workingtime_params) do
      render(conn, "show.json", workingtime: workingtime)
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtime = Workingtimes.get_workingtime!(id)

    with {:ok, %Workingtime{}} <- Workingtimes.delete_workingtime(workingtime) do
      send_resp(conn, :no_content, "")
    end
  end
end
