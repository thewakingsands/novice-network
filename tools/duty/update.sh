#!/bin/bash
set -eo pipefail
wget -O ContentFinderCondition.csv https://cdn.jsdelivr.net/gh/thewakingsands/ffxiv-datamining-cn@master/ContentFinderCondition.csv
node instanceList.js
