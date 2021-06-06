#!/bin/bash
source /env.sh
OPTS="--gzip"
DATE=$(date +%Y.%m.%d.%H.%M)
OUTPUT=/backup/$MONGO_HOST-$DATE.archive.gz

echo "=> Backup started at $DATE"
echo "mongodump $OPTS --forceTableScan --host="$MONGO_HOST" --port="$MONGO_PORT" --archive="$OUTPUT""
mongodump $OPTS --forceTableScan --host="$MONGO_HOST" --port="$MONGO_PORT" --archive="$OUTPUT"
sleep 5

if [ -n "$MAX_BACKUPS" ]; then
  while [ "$(find /backup -maxdepth 1 | wc -l)" -gt "$MAX_BACKUPS" ]
  do
    TARGET=$(find /backup -maxdepth 1 | sort | tail -1)
    rm -rf "$TARGET"
    echo "Backup $TARGET is deleted"
  done
fi

echo "=> Backup done"