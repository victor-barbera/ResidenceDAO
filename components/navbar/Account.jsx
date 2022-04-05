import { useMoralis } from 'react-moralis'
import Image from 'next/image'

const Account = () => {
  const { authenticate, isAuthenticated, account, logout } = useMoralis()
  const handleAuthenticateClick = () =>
    authenticate({ signingMessage: 'Login with you metamask wallet' })
  const handleLogoutClick = () => logout()

  if (!isAuthenticated || !account) {
    return (
      <button
        className="flex basis-1/3 items-center justify-end"
        onClick={handleAuthenticateClick}
      >
        <Image
          width="30"
          height="30"
          src="/metamask.png"
          alt="Metamask icon."
        />
        <p className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-700 hover:text-white lg:mx-6 lg:inline-flex lg:w-auto">
          Authenticate
        </p>
      </button>
    )
  } else {
    return (
      <>
        <div>
          <p className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-700 hover:text-white lg:mx-6 lg:inline-flex lg:w-auto">
            {account}
          </p>
        </div>

        <div>
          <button
            className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-700 hover:text-white lg:mx-6 lg:inline-flex lg:w-auto"
            onClick={handleLogoutClick}
          >
            LogOut
          </button>
        </div>
      </>
    )
  }
}
export default Account
