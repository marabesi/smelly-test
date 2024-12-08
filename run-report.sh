#!/bin/bash

clear && \
  npm run build && \
  rm smelly-report.html && \
  npm run cli -w cli -- "$1" typescript --report=html --report-output=$(pwd) && \
  open smelly-report.html