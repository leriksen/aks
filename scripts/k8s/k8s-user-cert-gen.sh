#!/usr/bin/env bash
# requires bash5, which is default on MS-hosted ubuntu build agents

set -euo pipefail

function parseCLIArgs() {
  local -n args="${1}"

  shift

  while getopts "n:" arg; do
    case "${arg}" in
    n) args[username]="${OPTARG}"     ;;
    *) usage && exit 1                ;;
    esac
  done
}

function argSanity() {
  local -nr args="${1}"

  if [[ ${#args[username]} -eq 0 ]]; then
    echo "must specify -n username"
    usage
    exit 1
  fi
}

function usage() {
  echo "Mandatory arguments - "
  echo "  -n <username>     : username to generate the certificate for"
}

function generate_cert_for_username() {
  local -nr args="${1}"

  echo "generating certificate for ${args[username]}"

  openssl genrsa -out ${args[username]}.key 2048
  openssl req -new -key ${args[username]}.key -out ${args[username]}.csr -subj "/CN=${args[username]}/O=developers"
  openssl x509 -req -in ${args[username]}.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out ${args[username]}.crt -days 365
  kubectl config set-credentials ${args[username]} --client-certificate=${args[username]}.crt --client-key=${args[username]}.key
}

declare -A arguments=()

echo "Before processing, CLI args are"
echo "${*}"

echo "parse CLI"
parseCLIArgs arguments "${@}"

echo "check argument sanity"
argSanity arguments

generate_cert_for_username arguments

exit 0
