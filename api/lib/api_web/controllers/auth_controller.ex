defmodule ApiWeb.AuthController do
  use ApiWeb, :controller
  import Ecto.Query, warn: false
  import Plug.Conn
  alias Api.Users
  alias Api.Users.User
  alias ApiWeb.Utils
  alias ApiWeb.JWTToken
  alias Api.AuthTokens.AuthToken
  alias Api.Repo

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

  def login(conn, %{"email" => email, "password" => password}) do
    with %User{} = user <- Users.get_user_by_userCredentials(email),
    true <- Pbkdf2.verify_pass(password, user.password)
    do
      signer = Joken.Signer.create("HS256","d1KJ/oxkRv2KyIqBn+eUvrgBnNEIXei8hfCkthPBxB1kY9rTa4c07OlzrojbE4z0")
      extra_claims = %{user_id: user.id}
      {:ok, token, _claims} = JWTToken.generate_and_sign(extra_claims, signer)
      conn |> render("login.json", %{success: true, message: "Login Successful", token: token})
    else
    _-> conn |> render("error.json", %{error: Utils.invalid_credentials()})
  end
  end

  def get(conn, _params) do
    conn |> render("data.json", %{data: conn.assigns.current_user})
  end

  def delete(conn, _params) do
    case Ecto.build_assoc(conn.assigns.current_user, :auth_tokens, %{token: get_token(conn)})
      |> Repo.insert!() do
      %AuthToken{} -> conn |> render("ack.json", %{success: true, message: "Logged Out"})
      _-> conn |> render("error.json", %{error: Utils.internal_server_error()})
      end

  end

  defp get_token(conn) do
      bearer = get_req_header(conn, "authorization") |> List.first()
      if bearer == nil do
        ""
      else
         bearer |> String.split(" ") |> List.last()
     end
  end
end