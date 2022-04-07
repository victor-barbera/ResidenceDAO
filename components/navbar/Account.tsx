import { useEffect } from 'react';
import Image from 'next/image'
import { useMoralis } from 'react-moralis'
import MoralisType from "moralis";
import { Menu } from '@headlessui/react'
import RoundButton from '../RoundButton'
import RoundBlockie from '../RoundBlockie'

const Account = () => {
  const { authenticate, isAuthenticated, account, logout, isWeb3Enabled, isWeb3EnableLoading, enableWeb3 } = useMoralis()

  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId') as MoralisType.Web3ProviderType
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId })
  }, [isAuthenticated, isWeb3Enabled])
  const addrShortener = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`
  const handleAuthenticateClick = () =>
    authenticate({ signingMessage: 'Login with you metamask wallet' })
  const handleLogoutClick = () => logout()
  return !isAuthenticated || !account ? (
    <RoundButton
      className="ml-auto flex items-center"
      onClick={handleAuthenticateClick}
    >
      <Image width="30" height="30" src="/metamask.png" alt="Metamask icon." />
      <p className="ml-2 font-mono">Authenticate</p>
    </RoundButton>
  ) : (
    <div className="ml-auto mr-3 flex items-center rounded bg-slate-800 py-2 px-3 ring ring-slate-700">
      <RoundBlockie addr={account} />
      <p className="ml-3 font-mono text-slate-500">{addrShortener(account)}</p>
    </div>
  )
}
export default Account
