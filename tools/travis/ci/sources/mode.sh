#!/usr/bin/env bash

is_demo() {
  [[ "$MODE" = demo ]]
}

is_lint() {
  [[ "$MODE" = lint ]]
}

