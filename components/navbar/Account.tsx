import { useEffect, Fragment } from 'react'
import { useMoralis } from 'react-moralis'
import { ethers } from 'ethers'
import { useSetAtom } from 'jotai'
import IERC20 from '../../contracts/abi/IERC20.json'
import IERC721 from '../../contracts/abi/IERC721.json'
import { Menu, Transition } from '@headlessui/react'
import RoundButton from '../RoundButton'
import RoundBlockie from '../RoundBlockie'
import {LogoutIcon} from '@heroicons/react/outline'
import {gBalanceAtom, isAdminAtom } from '../../store/atoms'


const addrShortener = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

const Account = () => {
  const { authenticate, isAuthenticated, account, logout, isWeb3Enabled, isWeb3EnableLoading, enableWeb3, web3 } = useMoralis()
  const setGBalance = useSetAtom(gBalanceAtom)
  const setIsAdmin = useSetAtom(isAdminAtom)
  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
    const getTokenData = async () => {
      const gContract = new ethers.Contract(process.env.NEXT_PUBLIC_GTOKEN_ADDRESS!,IERC20.abi, web3?.getSigner())
      const rContract = new ethers.Contract(process.env.NEXT_PUBLIC_RTOKEN_ADDRESS!,IERC721.abi, web3?.getSigner())
      setGBalance((await gContract.balanceOf(account)).toNumber())
      setIsAdmin((await rContract.ownerOf(0)).toLowerCase() == account ? true : false)
    }
    if (account) {
      getTokenData()
    }
  }, [isAuthenticated, isWeb3Enabled])
  const handleAuthenticateClick = () =>
    authenticate({ signingMessage: 'Login with you metamask wallet' })
  const handleLogoutClick = () => logout()
  return !isAuthenticated || !account ? (
    <RoundButton
      className="ml-auto flex items-center"
      onClick={handleAuthenticateClick}
    >
      <img width="30" height="30" src="/metamask.png" alt="Metamask icon." />
      <p className="ml-2 font-mono">Authenticate</p>
    </RoundButton>
  ) : (
    <Menu as="div" className="ml-auto">
      <Menu.Button>
        <div className="mr-3 flex items-center rounded bg-slate-800 py-2 px-3 ring ring-slate-700">
          <RoundBlockie addr={account} />
          <p className="ml-3 font-mono text-slate-500">{addrShortener(account)}</p>
        </div>
      </Menu.Button>
      <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
      <Menu.Items className="absolute mt-2">
        <Menu.Item>
          {({ active }) => (
            <button
            onClick={handleLogoutClick}
              className={`${
                active ? 'bg-purple-500 text-white' : 'bg-slate-600 text-white'
              } flex items-center w-full rounded-md text-lg px-3 py-2 mr-2`}
            >
              <LogoutIcon className="w-7 h-7 mr-2 text-red-600" />
              Logout
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
      </Transition>
    </Menu>
  )
}
export default Account