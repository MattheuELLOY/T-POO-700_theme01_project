defmodule ApiWeb.ClockController do
  use ApiWeb, :controller

  alias Api.Clocks
  alias Api.Clocks.Clock

  action_fallback ApiWeb.FallbackController

  def index(conn, _params) do
    clocks = Clocks.list_clocks()
    render(conn, "index.json", clocks: clocks)
  end

  def create(conn, %{"clock" => clock_params,"userId" => userId}) do
    exist = Clocks.if_clock_exist!(userId)
    cond do
      exist ->
      clock = Clocks.get_clock_by_user!(userId)
      Clocks.update_clock(clock, %{status: !clock.status})
      new_clock = Clocks.get_clock_by_user!(userId)
      render(conn, "show.json", clock: new_clock)
      !exist ->
      completed_params = Map.put(clock_params, "user", userId)
      with {:ok, %Clock{} = clock} <- Clocks.create_clock(completed_params) do
      conn
      |> put_status(:created)
      |> render("show.json", clock: clock)
        end
      end
    end

  def show(conn, %{"userId" => userId}) do
    clock = Clocks.get_clock_by_user!(userId)
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
