import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { Toaster } from 'react-hot-toast'
import NavBar from '../components/NavBar'

// TODO: Enviar això a .env
const APP_ID = 'vxRfT23BgKAB7xdJDmaqwOJRwnC9YmdCGFK9A6Fw'
const SERVER_URL = 'https://ss5pmkqpc8n0.usemoralis.com:2053/server'

function MyApp({ Component, pageProps }: AppProps) {
  // ! El problema és que això s'executa masses cops
  // if (!APP_ID || !SERVER_URL)
  //   throw new Error(
  //     'Missing Moralis Application ID or Server URL. Make sure to set your .env file.'
  //   );
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
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
