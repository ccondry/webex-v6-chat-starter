#!/bin/sh
echo "running yarn"
yarn
if [ $? -eq 0 ]; then
  echo "running yarn build..."
  yarn build
  while [ $? != 0 ]
  do
    echo "failed to build webex-v6-chat-starter website files. trying again..."
    yarn build
  done
  echo "yarn build successful. copying dist files to www folder..."
  mkdir -p /var/www/html/static/webex-v6-chat-starter
  cp -rf dist/* /var/www/html/static/webex-v6-chat-starter/
  if [ $? -eq 0 ]; then
    echo "successfully installed webex-v6-chat-starter website files"
  else
    echo "failed to install webex-v6-chat-starter website files"
  fi
else
  echo "yarn failed"
fi
