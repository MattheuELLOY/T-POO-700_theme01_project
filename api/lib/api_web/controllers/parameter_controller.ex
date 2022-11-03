defmodule ApiWeb.ParameterController do
  use ApiWeb, :controller

  alias Api.Parameters
  alias Api.Parameters.Parameter

  action_fallback ApiWeb.FallbackController

  def index(conn, _params) do
    parameters = Parameters.list_parameters()
    render(conn, "index.json", parameters: parameters)
  end

  def create(conn, %{"parameter" => parameter_params}) do
    with {:ok, %Parameter{} = parameter} <- Parameters.create_parameter(parameter_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.parameter_path(conn, :show, parameter))
      |> render("show.json", parameter: parameter)
    end
  end

  def show(conn, %{"id" => id}) do
    parameter = Parameters.get_parameter!(id)
    render(conn, "show.json", parameter: parameter)
  end

  def update(conn, %{"id" => id, "parameter" => parameter_params}) do
    parameter = Parameters.get_parameter!(id)

    with {:ok, %Parameter{} = parameter} <- Parameters.update_parameter(parameter, parameter_params) do
      render(conn, "show.json", parameter: parameter)
    end
  end

  def delete(conn, %{"id" => id}) do
    parameter = Parameters.get_parameter!(id)

    with {:ok, %Parameter{}} <- Parameters.delete_parameter(parameter) do
      send_resp(conn, :no_content, "")
    end
  end
end
