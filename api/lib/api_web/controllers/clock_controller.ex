defmodule ApiWeb.ClockController do
  use ApiWeb, :controller

  alias Api.Clocks
  alias Api.Clocks.Clock

  action_fallback ApiWeb.FallbackController

  def index(conn, _params) do
    clocks = Clocks.list_clocks()
    render(conn, "index.json", clocks: clocks)
  end

  def create(conn, %{"userId" => id,"clock" => clock_params}) do
    completed_params = Map.put(clock_params, "user", id)
    with {:ok, %Clock{} = clock} <- Clocks.create_clock(completed_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.clock_path(conn, :show, clock))
      |> render("show.json", clock: clock)
    end
  end

  def show(conn, %{"userId" => id}) do
    clock = Clocks.list_clocks_by_userId!(id)
    render(conn, "show.json", clock: clock)
  end

#  def update(conn, %{"id" => id, "clock" => clock_params}) do
#    clock = Clocks.get_clock!(id)
#
#    with {:ok, %Clock{} = clock} <- Clocks.update_clock(clock, clock_params) do
#      render(conn, "show.json", clock: clock)
#    end
#  end
#
#  def delete(conn, %{"id" => id}) do
#    clock = Clocks.get_clock!(id)
#
#    with {:ok, %Clock{}} <- Clocks.delete_clock(clock) do
#      send_resp(conn, :no_content, "")
#    end
#  end
end
