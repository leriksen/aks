#!/usr/bin/env bash

set -euo pipefail

helm repo add csi-secrets-store-provider-azure https://azure.github.io/secrets-store-csi-driver-provider-azure/charts

helm install csi csi-secrets-store-provider-azure/csi-secrets-store-provider-azure --namespace kube-system
