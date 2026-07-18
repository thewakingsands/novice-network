#!/bin/bash
### Warning: environment variables will exposed to build logs after this line ###
set -x
set -eo pipefail

export GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"

chmod 700 ci
chmod 600 ci/deploy-key

eval "$(ssh-agent -s)"
ssh-add ci/deploy-key

DEPLOY_DIR=dist
GIT_REPO=git@github.com:thewakingsands/novice-network-pages.git

git config --global init.defaultBranch master

git clone "$GIT_REPO" lastDeploy
rm -rf lastDeploy/.git

pnpm deploy:filemap

rsync -avu --ignore-existing lastDeploy/ "$DEPLOY_DIR/"

pnpm deploy:cleanup

EXEGIT="git -C $DEPLOY_DIR"
$EXEGIT init
$EXEGIT remote add origin git@github.com:thewakingsands/novice-network-pages.git
$EXEGIT add -A
$EXEGIT config user.name "bot"
$EXEGIT config user.email "root@localhost"
$EXEGIT commit --quiet -m "Deploy"

$EXEGIT push -f --quiet origin master
