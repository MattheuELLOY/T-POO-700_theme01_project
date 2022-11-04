defmodule Api.ParametersTest do
  use Api.DataCase

  alias Api.Parameters

  describe "parameters" do
    alias Api.Parameters.Parameter

    import Api.ParametersFixtures

    @invalid_attrs %{allowed_to_modify_WT: nil, daily_hours: nil, day_per_week: nil, filling_mode: nil}

    test "list_parameters/0 returns all parameters" do
      parameter = parameter_fixture()
      assert Parameters.list_parameters() == [parameter]
    end

    test "get_parameter!/1 returns the parameter with given id" do
      parameter = parameter_fixture()
      assert Parameters.get_parameter!(parameter.id) == parameter
    end

    test "create_parameter/1 with valid data creates a parameter" do
      valid_attrs = %{allowed_to_modify_WT: true, daily_hours: 120.5, day_per_week: 120.5, filling_mode: "some filling_mode"}

      assert {:ok, %Parameter{} = parameter} = Parameters.create_parameter(valid_attrs)
      assert parameter.allowed_to_modify_WT == true
      assert parameter.daily_hours == 120.5
      assert parameter.day_per_week == 120.5
      assert parameter.filling_mode == "some filling_mode"
    end

    test "create_parameter/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Parameters.create_parameter(@invalid_attrs)
    end

    test "update_parameter/2 with valid data updates the parameter" do
      parameter = parameter_fixture()
      update_attrs = %{allowed_to_modify_WT: false, daily_hours: 456.7, day_per_week: 456.7, filling_mode: "some updated filling_mode"}

      assert {:ok, %Parameter{} = parameter} = Parameters.update_parameter(parameter, update_attrs)
      assert parameter.allowed_to_modify_WT == false
      assert parameter.daily_hours == 456.7
      assert parameter.day_per_week == 456.7
      assert parameter.filling_mode == "some updated filling_mode"
    end

    test "update_parameter/2 with invalid data returns error changeset" do
      parameter = parameter_fixture()
      assert {:error, %Ecto.Changeset{}} = Parameters.update_parameter(parameter, @invalid_attrs)
      assert parameter == Parameters.get_parameter!(parameter.id)
    end

    test "delete_parameter/1 deletes the parameter" do
      parameter = parameter_fixture()
      assert {:ok, %Parameter{}} = Parameters.delete_parameter(parameter)
      assert_raise Ecto.NoResultsError, fn -> Parameters.get_parameter!(parameter.id) end
    end

    test "change_parameter/1 returns a parameter changeset" do
      parameter = parameter_fixture()
      assert %Ecto.Changeset{} = Parameters.change_parameter(parameter)
    end
  end
end
