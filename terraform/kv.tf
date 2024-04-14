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

resource "azurerm_role_assignment" "kv_secret_officer" {
  principal_id         = data.azurerm_client_config.current.object_id
  scope                = azurerm_key_vault.kv.id
  role_definition_name = "Key Vault Secrets Officer"
}

resource "azurerm_key_vault_secret" "pod1secret" {
  depends_on = [
    azurerm_role_assignment.kv_secret_officer
  ]
  key_vault_id = azurerm_key_vault.kv.id
  name         = "pod1secret"
  value        = var.pod1secret
}

resource "azurerm_key_vault_secret" "pod2secret" {
  depends_on = [
    azurerm_role_assignment.kv_secret_officer
  ]
  key_vault_id = azurerm_key_vault.kv.id
  name         = "pod2secret"
  value        = var.pod2secret
}
