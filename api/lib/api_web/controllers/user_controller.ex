defmodule ApiWeb.UserController do
  use ApiWeb, :controller

  alias Api.Users
  alias Api.Users.User

  action_fallback ApiWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def index(conn, %{"email" => email, "username" => username}) do
    users = Users.list_users(%{"email" => email, "username" => username})
    render(conn, "index.json", users: users)
  end

  def index(conn, %{"email" => email}) do
    users = Users.list_users(%{"email" => email})
    render(conn, "index.json", users: users)
  end

  def index(conn, %{"username" => username}) do
    users = Users.list_users(%{"username" => username})
    render(conn, "index.json", users: users)
  end

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
