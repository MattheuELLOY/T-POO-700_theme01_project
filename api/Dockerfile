FROM elixir:latest

 RUN apt-get update && \
   apt-get install -y postgresql-client && \
   apt-get install -y inotify-tools

 RUN mkdir /app
 COPY . /app
 WORKDIR /app

RUN mix local.hex --force

RUN mix deps.get

RUN mix local.rebar --force

RUN mix do compile

CMD ["./tools/docker/docker-entrypoint.sh"]