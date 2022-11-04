defmodule ApiWeb.Router do
  use ApiWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {ApiWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug CORSPlug
    plug :accepts, ["json"]
  end

  scope "/", ApiWeb do
    pipe_through :browser

    get "/", PageController, :index

  end

  # Other scopes may use custom stacks.
   scope "/api", ApiWeb do
     pipe_through :api

     resources "/users", UserController, [:new, :edit]
     resources "/teams", TeamController, [:new, :edit]
     resources "/parameters", ParameterController, [:new, :edit]

     get "/workingtimes/", WorkingtimeController, :index
     get "/workingtimes/:userId", WorkingtimeController, :index
     get "/workingtimes/:userId/:id", WorkingtimeController, :show
     post "/workingtimes/:userId", WorkingtimeController, :create
     put "/workingtimes/:id", WorkingtimeController, :update
     delete "/workingtimes/:id", WorkingtimeController, :delete

     get "/clocks/:userId", ClockController, :show
     post "/clocks/:userId", ClockController, :create

     post "/register", AuthController, :register
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: ApiWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
