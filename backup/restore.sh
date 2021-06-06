#!/bin/bash
echo "=> Restore database from $1"
echo "mongorestore --gzip --host "$MONGO_HOST" --port "$MONGO_PORT" --archive=$1"

if mongorestore --gzip --host "$MONGO_HOST" --port "$MONGO_PORT" --archive=$1
then
    echo "=> Restore succeeded"
else
    echo "=> Restore failed"
fi