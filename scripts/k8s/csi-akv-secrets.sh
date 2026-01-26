#!/usr/bin/env bash

set -euo pipefail

kubectl create secret generic secrets-store-creds --from-file=clientid="../../terraform/.ksscd_id" --from-file=clientsecret="../../terraform/.ksscd_key"

# Label the secret
# Refer to https://secrets-store-csi-driver.sigs.k8s.io/load-tests.html for more details on why this is necessary in future releases.
kubectl label secret secrets-store-creds secrets-store.csi.k8s.io/used=true