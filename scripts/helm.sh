#!/usr/bin/env bash

set -euxo pipefail

helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts
