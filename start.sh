#!/bin/sh

set -e

echo "Running migrations..."
yarn migrations:run

echo "start the app"
exec "$@"