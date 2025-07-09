#!/bin/bash

AcrResourceGroup="my-core-operations"
AcrName="myextarc"
ImageName="adpf-homepage"
ImageVersion="latest"
# ---
AciRsourceGroup="my-frameworks-poc"
AciLocation="WestEurope"
AciName="adpf"
# ---
FdResourceGroup=$AciRsourceGroup
FdName="adpf-framework"
FdCustomDomain="my-net"

function build-image {
  # Build and push to Azure Container Registry
  az acr build --registry $AcrName --image $ImageName:$ImageVersion .
}

function deploy-container {
  # Deploy to Azure Container Instance
  az container create \
    --resource-group $AciRsourceGroup \
    --name $AciName \
    --image $AcrName.azurecr.io/$ImageName:$ImageVersion \
    --cpu 1 --memory 1 \
    --ports 3000 \
    --dns-name-label "$AciName-framework" \
    --location $AciLocation
}

function deploy-frondoor {
  # Create a Front Door (Standard SKU)
  az network front-door standard create \
    --resource-group $FdResourceGroup \
    --name $FdName \
    --sku Standard_AzureFrontDoor
}

function frontdoor-custom-domain {
  # Add Your Custom Domain
  az network front-door custom-domain create \
    --resource-group $FdResourceGroup \
    --front-door-name $FdName \
    --name $FdCustomDomain \
    --host-name adpf.$FdCustomDomain.be
}

function frontdoor-https {
  # Enable HTTPS with Azure-Managed Certificate
  az network front-door custom-domain https enable \
    --resource-group $FdResourceGroup \
    --front-door-name $FdName \
    --name $FdCustomDomain \
    --certificate-type ManagedCertificate
}

if [[ $1 ]]
then
  $1
fi