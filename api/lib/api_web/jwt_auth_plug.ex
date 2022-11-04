defmodule ApiWeb.JWTAuthPlug do

  import Plug.Conn
  alias Api.Users
  alias Api.Users.User
  alias Api.AuthTokens
  alias Api.AuthTokens.AuthToken

  def init(opts), do: opts

  def call(conn, _) do
    bearer = get_req_header(conn, "authorization") |> List.first()
    if bearer == nil do
      conn |> put_status(401) |> halt
    else
      token = bearer |> String.split(" ") |> List.last()
      signer = Joken.Signer.create("HS256","d1KJ/oxkRv2KyIqBn+eUvrgBnNEIXei8hfCkthPBxB1kY9rTa4c07OlzrojbE4z0")

      with {:ok, %{"user_id" => user_id}} <- ApiWeb.JWTToken.verify_and_validate(token, signer), %User{} = user <- Users.get_user(user_id)
       do
        if AuthTokens.get_auth_token_by_token(token) !=nil do
          conn |> put_status(401)  |> halt
        else
          conn |> assign(:current_user, user)
        end
        else
        {:error, _reason} -> conn |> put_status(401) |> halt
        _ -> conn |> put_status(401)  |> halt
      end
    end
  end
end