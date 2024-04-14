variable "env" {
  description = "which environment we are deploying the iac to"
  type        = string
}

variable "pod1secret" {
  type = string
}

variable "pod2secret" {
  type = string
}