defmodule ApiWeb.ParameterControllerTest do
  use ApiWeb.ConnCase

  import Api.ParametersFixtures

  alias Api.Parameters.Parameter

  @create_attrs %{
    allowed_to_modify_WT: true,
    daily_hours: 120.5,
    day_per_week: 120.5,
    filling_mode: "some filling_mode"
  }
  @update_attrs %{
    allowed_to_modify_WT: false,
    daily_hours: 456.7,
    day_per_week: 456.7,
    filling_mode: "some updated filling_mode"
  }
  @invalid_attrs %{allowed_to_modify_WT: nil, daily_hours: nil, day_per_week: nil, filling_mode: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all parameters", %{conn: conn} do
      conn = get(conn, Routes.parameter_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create parameter" do
    test "renders parameter when data is valid", %{conn: conn} do
      conn = post(conn, Routes.parameter_path(conn, :create), parameter: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.parameter_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "allowed_to_modify_WT" => true,
               "daily_hours" => 120.5,
               "day_per_week" => 120.5,
               "filling_mode" => "some filling_mode"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.parameter_path(conn, :create), parameter: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update parameter" do
    setup [:create_parameter]

    test "renders parameter when data is valid", %{conn: conn, parameter: %Parameter{id: id} = parameter} do
      conn = put(conn, Routes.parameter_path(conn, :update, parameter), parameter: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.parameter_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "allowed_to_modify_WT" => false,
               "daily_hours" => 456.7,
               "day_per_week" => 456.7,
               "filling_mode" => "some updated filling_mode"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, parameter: parameter} do
      conn = put(conn, Routes.parameter_path(conn, :update, parameter), parameter: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete parameter" do
    setup [:create_parameter]

    test "deletes chosen parameter", %{conn: conn, parameter: parameter} do
      conn = delete(conn, Routes.parameter_path(conn, :delete, parameter))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.parameter_path(conn, :show, parameter))
      end
    end
  end

  defp create_parameter(_) do
    parameter = parameter_fixture()
    %{parameter: parameter}
  end
end
