#!/bin/sh

args="$@"

env_files="notes.env.development backend.env.development calendar.env.development apps/backend-app/.env" 
command="docker compose"

for env_file in $env_files; do
  command="$command --env-file=$env_file"
done

command="$command -f $args"


eval $command
