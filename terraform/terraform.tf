terraform {
  required_version = "~>1.0"
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "~>3.0"
    }
    azuread = {
      source = "hashicorp/azuread"
      version = "~> 2.0"
    }

    azuredevops = {
      source = "microsoft/azuredevops"
      version = "1.0.1"
    }

    external = {
      source = "hashicorp/external"
      version = "~> 2.0"
    }

    null = {
      source = "hashicorp/null"
      version = "~> 3.0"
    }
  }

  backend "azurerm" {}
}
