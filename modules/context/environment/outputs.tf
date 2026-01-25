output "tags" {
  value = merge(
    module.subscription.tags,
    {
      environment = var.environment
    }
  )
}

output "env_sub" {
  value = local.env_sub[var.environment]
}

output "k8s_secret_reader_principal" {
  value = local.k8s_secret_reader_principal
}
