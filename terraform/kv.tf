resource "azurerm_key_vault" "kv" {
  location                   = azurerm_resource_group.rg.location
  name                       = "leifakskv"
  resource_group_name        = azurerm_resource_group.rg.name
  sku_name                   = "standard"
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  enable_rbac_authorization  = true
  purge_protection_enabled   = false
  soft_delete_retention_days = 7 # minimum
}