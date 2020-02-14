#!/bin/bash
set -e
ssh-keyscan -H $IP >> ~/.ssh/known_hosts
# Copy generated war files to the server
scp target/ROOT.war $USER_NAME@$IP:$DEPLOY_PATH
