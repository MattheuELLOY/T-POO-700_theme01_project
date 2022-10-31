FROM elixir:1.14-alpine
RUN apk update && \
	apk add postgresql-client inotify-tools

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN mix local.hex --force
RUN mix deps.get
RUN mix local.rebar --force
RUN mix do compile

ENTRYPOINT ["mix", "phx.server"]