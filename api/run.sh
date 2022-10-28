#!/bin/bash

mix deps.clean --all

mix deps.get

mix ecto.create

mix ecto.migrate

mix phx.server