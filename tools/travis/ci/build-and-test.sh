#!/usr/bin/env bash
set -ex

echo "=======  Starting build-and-test.sh  ========================================"

# Go to project dir
cd $(dirname $0)/../../..

# Include sources.
source tools/travis/ci/sources/mode.sh

if is_lint; then
  npm run lint
else
  npm run build
fi
