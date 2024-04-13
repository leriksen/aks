Apart from forking this repo, you need the following in Azure RM or Azure DevOps

# DevOps

## Library Variables

  - `sa`- storage account name
  - `container` - container in the sa
  - `project` in azure devops hosting the code and pipelines
  - `service_connection` -  the name of the service connection in AZDO holding the creds for a service principal in the testing subscription, and the subscriptionwe are deploying resources to, in Azure RM
  - `environment` - the name of the environment in azure devops we are deploying to
  - `subscription_id` - the id of the subscription we will deploy resources to - separate to the subscription holding the storage account we hold TF state in (that is always `testing`)
  - `terraform_version` - default `1.5.2` - match this to the version of terraform hosted in the azure devops ubuntu agents, or a separate version if installing from apt or hashicorp site
  - `terraform_path` - default `/usr/local/bin` - path to install terraform to, if not using default

## Service Connection

This needs `Storage Account Blob Contributor` on the `tfminit` SA in the `testing` subscription, and `Contributor` on the subscription we will be deploying resources to.

## Pipelines

Grant open permissions to the variable groups you use for the `Library Variables` section

# Azure RM

## Service Principal
  - create and grant roles as described above

## Subscription
  - if not deploying to `testing`, create a subscription and grant the `Contributor` role on the subscription, to the SP created above