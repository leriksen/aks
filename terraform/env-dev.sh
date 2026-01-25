export env=dev
export TF_VAR_env="${env}"
export TF_VAR_pod1secret="pod1secret"
export TF_VAR_pod2secret="pod2secret"

export ARM_USE_AZUREAD=true
export ARM_CLIENT_ID="$(cat .client_id_dev)"
export ARM_CLIENT_SECRET="$(cat .key_${env})"
export ARM_SUBSCRIPTION_ID="$(cat .subscription_id)"
export ARM_TENANT_ID="$(cat .tenant_id)"

az login