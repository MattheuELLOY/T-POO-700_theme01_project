defmodule ApiWeb.AuthController do
  use ApiWeb, :controller

  alias Api.Users
  alias Api.Users.User
  alias ApiWeb.Utils

  def register(conn, params) do
    case Users.create_user(params) do
      {:ok, _user} ->
        conn |> render("ack.json", %{success: true, message: "Registration successfull"})

        {:error, %Ecto.Changeset{} = changeset} ->
        conn |> render("errors.json", %{errors: Utils.format_changeset_errors(changeset)})

        _ ->
        conn |> render("error.json", %{error: Utils.internal_server_error()})

    end
  end
end