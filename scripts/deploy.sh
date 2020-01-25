#!/bin/bash
set -e
ssh-keyscan -H $IP >> ~/.ssh/known_hosts
mv target/ROOT.war v3.war
# Copy generated war files to the server
scp v3.war $USER_NAME@$IP:$DEPLOY_PATH
