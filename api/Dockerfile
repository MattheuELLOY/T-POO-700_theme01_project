#FROM elixir:latest
#
#RUN apt-get update && \
  #apt-get install -y postgresql-client
#
#
#RUN mkdir /api
#COPY . /api
#WORKDIR /api
#
#RUN cd ../
#
#RUN mix local.hex --force
#
#RUN mix deps.get
#
#RUN mix local.rebar --force
#
#RUN mix compile
#
#CMD ["/api/entrypoint.sh"]
FROM elixir:1.14.0
RUN apt-get update
RUN apt-get install --yes build-essential inotify-tools postgresql-client

RUN mkdir /app

WORKDIR /app

RUN mix local.rebar --force && mix local.hex --force 

RUN wget https://github.com/phoenixframework/archives/raw/master/phx_new.ez

RUN mix archive.install ./phx_new.ez

COPY mix.exs ./

RUN mix deps.get

RUN mix ecto.create

RUN mix ecto.migrate

COPY . /app

CMD ["./run.sh"]