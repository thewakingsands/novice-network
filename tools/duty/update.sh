#!/bin/bash
set -eo pipefail
wget -O ContentFinderCondition.csv https://raw.githubusercontent.com/thewakingsands/ffxiv-datamining-cn/master/ContentFinderCondition.csv
node instanceList.js
