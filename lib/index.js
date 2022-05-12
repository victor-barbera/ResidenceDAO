import Web3Utils from 'web3-utils'

// TODO: S'ha de pillar tota la info de la chain del .env
const SC_ADDRESS = '0x5dc380906c9C291f3e1FfB261Afe5bb47D76bf7f'
const SC_CHAIN = 80001


export const signTransferWithAuthorization = async (
  addressSigner,
  addressTo,
  amountToSign,
  provider
) => {
  // generate signature fields
  const deadlineTimeAfter = Math.floor(Date.now() / 1000 - 1000)
  const deadlineTimeBefore = Math.floor(Date.now() / 1000 + 3600)
  const nonce = Web3Utils.randomHex(32)
  const domain = {
    name: 'Metatransaction Monetary Token',
    version: '1',
    chainId: SC_CHAIN,
    verifyingContract: SC_ADDRESS,
  }
  const EIP712Domain = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ]
  // TransferWithAuthorization(address from,address to,uint256 value,uint256 validAfter,uint256 validBefore,bytes32 nonce)
  const TransferWithAuthorization = [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'validAfter', type: 'uint256' },
    { name: 'validBefore', type: 'uint256' },
    { name: 'nonce', type: 'bytes32' },
  ]
  const message = {
    from: addressSigner,
    to: addressTo,
    value: amountToSign,
    validAfter: deadlineTimeAfter,
    validBefore: deadlineTimeBefore,
    nonce: nonce,
  }
  const data = JSON.stringify({
    types: {
      EIP712Domain,
      TransferWithAuthorization,
    },
    domain,
    primaryType: 'TransferWithAuthorization',
    message,
  })
  const params = [addressSigner, data]
  const method = 'eth_signTypedData_v3'
  let signature = null
  await new Promise((resolve) => {
    provider.sendAsync(
      {
        method,
        params,
        from: addressSigner,
      },
      function (err, result) {
        if (err) {
          return err
        }
        signature = result.result.substring(2)
        resolve(signature)
      }
    )
  })
  const r = '0x' + signature.substring(0, 64)
  const s = '0x' + signature.substring(64, 128)
  const v = parseInt(signature.substring(128, 130), 16)
  const JSONdata = {
    from: addressSigner,
    to: addressTo,
    value: amountToSign,
    validAfter: deadlineTimeAfter,
    validBefore: deadlineTimeBefore,
    nonce: nonce,
    r,
    s,
    v,
  }
  return JSONdata
}
