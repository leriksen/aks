module "globals" {
  source = "../globals"
}

locals {
  env_sub = {
    dev = "NP"
  }

  k8s_secret_reader_principal = "02c9ce2a-f122-40a2-a34a-c0f024420c0a"
}

module "subscription" {
  source = "../subscription"
  subscription = local.env_sub[var.environment]
}



