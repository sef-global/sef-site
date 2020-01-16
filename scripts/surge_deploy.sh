#!/usr/bin/env bash
if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    echo "Not a PR. Skipping surge deployment"
    exit 0
fi
# Check if the travis credentials exists
if [ -z "$SURGE_LOGIN" ] || [ -z "$SURGE_TOKEN" ]; then
    echo "Surge credentials not set. Skipping surge deployment"
    exit 0
fi
# Install surge
npm i -g surge
# Create a domain to the PR
export DEPLOY_DOMAIN=https://pr-${TRAVIS_PULL_REQUEST}-sef-site.surge.sh
# Upload to surge.sh
surge --project ./src/main/webapp --domain $DEPLOY_DOMAIN;
