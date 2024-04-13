#!/usr/bin/env zsh

set euo -pipefail

terraform init -backend-config="storage_account_name=tfmininit" -backend-config="container_name=terraform" -backend-config="key=aks-${env}.tfstate"
