#!/bin/bash -e
### Warning: environment variables will exposed to build logs after this line ###
set -x

export GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"

chmod 700 ci
chmod 600 ci/deploy-key

eval `ssh-agent -s`
ssh-add ci/deploy-key

DEPLOY_DIR=dist

find "$DEPLOY_DIR" -name '*.htm' -exec sed -i '/<meta name="description" content="最终幻想14超实用萌新手册，为最终幻想14国服玩家提供涵盖广泛、清晰易懂的基础攻略指引。">/d' {} \;

EXEGIT="git -C $DEPLOY_DIR"
$EXEGIT init
$EXEGIT remote add origin git@github.com:thewakingsands/novice-network-pages.git
$EXEGIT add -A
$EXEGIT config user.name "bot"
$EXEGIT config user.email "root@localhost"
$EXEGIT commit -m "Auto deploy by Travis CI"

$EXEGIT push -f origin master

# $EXEGIT remote add coding git@e.coding.net:ffcafe/novice-network-pages.git
# $EXEGIT push -f coding master

curl -o- -L https://yarnpkg.com/install.sh | bash
yarn
INDEX_SERVER=https://novice-network-search.wakingsands.com yarn deploy:searchindex
