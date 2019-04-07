#!/bin/bash -e
openssl aes-256-cbc -K $encrypted_74088940e92b_key -iv $encrypted_74088940e92b_iv -in ci/deploy-key.enc -out ci/deploy-key -d

### Warning: environment variables will exposed to build logs after this line ###
set -x

chmod 700 ci
chmod 600 ci/deploy-key

eval `ssh-agent -s`
ssh-add ci/deploy-key

DEPLOY_DIR=dist
EXEGIT="git -C $DEPLOY_DIR"

$EXEGIT config user.name "bot"
$EXEGIT config user.email "root@localhost"
$EXEGIT init
$EXEGIT remote add origin git@github.com:thewakingsands/novice-network-pages.git
$EXEGIT add -A
$EXEGIT commit -m "Auto deploy by Travis CI"

$EXEGIT push -f origin master
