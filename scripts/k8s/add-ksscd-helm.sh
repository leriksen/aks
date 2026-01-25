#!/usr/bin/env bash

set -euo pipefail

helm repo add csi-secrets-store-provider-azure https://azure.github.io/secrets-store-csi-driver-provider-azure/charts

helm install csi csi-secrets-store-provider-azure/csi-secrets-store-provider-azure --namespace kube-system

kubectl apply -f https://raw.githubusercontent.com/Azure/secrets-store-csi-driver-provider-azure/master/deployment/provider-azure-installer.yaml