#!/usr/bin/env bash

set -e

cd "$(dirname "$(cd $(dirname "${0}") && pwd)")"

app=journal-guide
source ./.env
source ../docker-rs/local-docker.sh

export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --output text --query "Account")

aws_login
init_ares_user
init_aws_env_variables
init_history bash
init_ssh

run_case ${@}
