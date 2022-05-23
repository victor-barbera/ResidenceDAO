// import Image from 'next/image'
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
            <img width={30} height={30} src="/residence-logo.png" />
            <span className="ml-3 text-xl font-mono font-light tracking-wide text-white">
              {process.env.NEXT_PUBLIC_DAO_NAME}
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
          <Link href="/payments">
            <a className="w-auto rounded px-3 py-2 mx-6 font-bold text-white hover:bg-slate-700">
              Payments
            </a>
          </Link>
        </div>
        <Account />
      </div>
    </nav>
  )
}

export default NavBar
