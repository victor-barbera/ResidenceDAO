import Link from 'next/link'
import Account from './Account'


const NavBar = () => {
  return (
    <nav className="flex flex-wrap items-center bg-slate-900 p-3 ">
      <div
        className="flex w-full"
      >
        <Link href="/">
          <a className="mr-4 inline-flex items-center p-2 basis-1/3">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-8 w-8 fill-current text-white"
            >
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
            </svg>
            <span className="text-xl font-bold uppercase tracking-wide text-white">
              ResidenceDAO
            </span>
          </a>
        </Link>
        <div className="flex inline-flex h-auto w-auto items-center basis-1/3 justify-center">
          <Link href="/polls">
            <a className="w-auto rounded px-3 py-2 mx-6 font-bold text-white hover:bg-slate-700">
              Polls
            </a>
          </Link>
          <Link href="/history">
            <a className="w-auto rounded px-3 py-2 mx-6 font-bold text-white hover:bg-slate-700">
              History
            </a>
          </Link>
          <Link href="/balances">
            <a className="w-auto rounded px-3 py-2 mx-6 font-bold text-white hover:bg-slate-700">
              Balances
            </a>
          </Link>
        </div>
        <Account />
      </div>
    </nav>
  )
}

export default NavBar
