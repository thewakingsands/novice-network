#!/bin/bash -e
openssl aes-256-cbc -K $encrypted_74088940e92b_key -iv $encrypted_74088940e92b_iv -in ci/deploy-key.enc -out ci/deploy-key -d

### Warning: environment variables will exposed to build logs after this line ###
set -x

export GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"

chmod 700 ci
chmod 600 ci/deploy-key

eval `ssh-agent -s`
ssh-add ci/deploy-key

DEPLOY_DIR=dist

find "$DEPLOY_DIR" -name '*.htm' -exec sed -i '/<meta name="description" content="">/d' {} \;

EXEGIT="git -C $DEPLOY_DIR"
$EXEGIT config user.name "bot"
$EXEGIT config user.email "root@localhost"
$EXEGIT init
$EXEGIT remote add origin git@github.com:thewakingsands/novice-network-pages.git
$EXEGIT add -A
$EXEGIT commit -m "Auto deploy by Travis CI"

$EXEGIT push -f origin master

$EXEGIT remote add coding git@e.coding.net:ffcafe/novice-network-pages.git
$EXEGIT push -f coding master

curl -o- -L https://yarnpkg.com/install.sh | bash
yarn
INDEX_SERVER=https://novice-network-search.wakingsands.com yarn deploy:searchindex
