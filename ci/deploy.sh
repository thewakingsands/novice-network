#!/bin/bash -e
### Warning: environment variables will exposed to build logs after this line ###
set -x

export GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"

chmod 700 ci
chmod 600 ci/deploy-key

eval "$(ssh-agent -s)"
ssh-add ci/deploy-key

DEPLOY_DIR=dist
GIT_REPO=git@github.com:thewakingsands/novice-network-pages.git

find "$DEPLOY_DIR" -name '*.htm' -exec sed -i '/<meta name="description" content="最终幻想14超实用萌新手册豆芽站，为最终幻想14中文玩家提供涵盖广泛、清晰易懂的新人基础攻略指引。">/d' {} \;

git config --global init.defaultBranch master

git clone "$GIT_REPO" lastDeploy
rm -rf lastDeploy/.git

yarn deploy:filemap

rsync -avu lastDeploy/ "$DEPLOY_DIR/"

EXEGIT="git -C $DEPLOY_DIR"
$EXEGIT init
$EXEGIT remote add origin git@github.com:thewakingsands/novice-network-pages.git
$EXEGIT add -A
$EXEGIT config user.name "bot"
$EXEGIT config user.email "root@localhost"
$EXEGIT commit -m "Deploy"

$EXEGIT push -f origin master

# $EXEGIT remote add coding git@e.coding.net:ffcafe/novice-network-pages.git
# $EXEGIT push -f coding master

curl -o- -L https://yarnpkg.com/install.sh | bash
yarn
INDEX_SERVER=https://novice-network-search.wakingsands.com yarn deploy:searchindex
