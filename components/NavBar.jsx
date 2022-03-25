import { useState } from 'react'
import Link from 'next/link'

const NavBar = () => {
  const [active, setActive] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleHamburguerClick = () => setActive(prev => !prev)
  const handleAuthenticateClick = () => setIsAuthenticated(prev=> !prev)

  return (
    <nav className="flex flex-wrap items-center bg-slate-900 p-3 ">
      <Link href="/">
        <a className="mr-4 inline-flex items-center p-2 ">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-8 w-8 fill-current text-white"
          >
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
          </svg>
          <span className="text-xl font-bold uppercase tracking-wide text-white">
            TalwindCSS
          </span>
        </a>
      </Link>
      <button className=" ml-auto inline-flex rounded p-3 text-white outline-none hover:bg-slate-700 hover:text-white lg:hidden" onClick={handleHamburguerClick}>
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={`${
          active ? '' : 'hidden'
        }   w-full lg:inline-flex lg:w-auto lg:flex-grow lg:justify-center`}
      >
        <div className="flex w-full flex-col items-start lg:inline-flex lg:h-auto  lg:w-auto lg:flex-row lg:items-center">
          <Link href="/">
            <a className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-700 hover:text-white lg:inline-flex lg:w-auto ">
              Polls
            </a>
          </Link>
          <Link href="/">
            <a className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-700 hover:text-white lg:inline-flex lg:w-auto">
              History
            </a>
          </Link>
          <Link href="/">
            <a className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-700 hover:text-white lg:inline-flex lg:w-auto">
              Balances
            </a>
          </Link>
        </div>
      </div>
      <button className='' onClick={handleAuthenticateClick}>{!isAuthenticated ? "Athenticate" : "0x123...9876"}</button>
    </nav>
  )
}

export default NavBar
