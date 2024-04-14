# this doesnt work at the moment, create manually


#resource "azuredevops_serviceendpoint_kubernetes" "aks" {
#  project_id            = data.azuredevops_project.aks.id
#  service_endpoint_name = "aks"
#  apiserver_url         = "https://${azurerm_kubernetes_cluster.aks.fqdn}"
#  authorization_type    = "AzureSubscription"
#
#  azure_subscription {
#    subscription_id   = data.azurerm_client_config.current.subscription_id
#    subscription_name = data.azurerm_subscription.current.display_name
#    tenant_id         = data.azurerm_client_config.current.tenant_id
#    resourcegroup_id  = azurerm_resource_group.rg.id
#    namespace         = "default"
#    cluster_name      = azurerm_kubernetes_cluster.aks.name
#  }
#}
#
#resource "azuredevops_resource_authorization" "aks" {
#  project_id  = data.azuredevops_project.aks.id
#  resource_id = azuredevops_serviceendpoint_kubernetes.aks.id
#  authorized  = true
#}