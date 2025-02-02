#!/bin/bash

clear && \
  npm run build && \
  rm -rf smelly-report.html && \
  npm run cli -w cli -- "$1" --report=html --report-output=$(pwd) && \
  open smelly-report.html