output "tags" {
  value = {
    project      = "PE"
    project_code = "PE001"
    costcentre   = "00001"
  }
}

output location {
  value = "australiasoutheast"
}

output "aks_control_ports" {
  value = [
    "6443",  # API server
    "2379",  # etcd
    "2380",  # etcd
    "10250", # kubelet
    "10259", # scheduler
    "10257", # controller
  ]
}