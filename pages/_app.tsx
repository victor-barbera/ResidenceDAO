import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { Toaster } from 'react-hot-toast'
import NavBar from '../components/NavBar'

/* TODO:
        * Fer que hagafi els decimals i tokenName del SC.
        * Plantejar si la duració pot ser dinamica.
        * Ficar totes les funcions auxiliars en una llibreria.
*/
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId={process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID!} serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL!}>
      <div className="flex flex-col bg-slate-800 min-h-screen">
        <NavBar />
        <Toaster containerStyle={{ top: 80 }} />
        <div className="flex flex-col max-w-4xl self-center">
          <Component {...pageProps} />
        </div>
      </div>
    </MoralisProvider>
  )
}

export default MyApp
