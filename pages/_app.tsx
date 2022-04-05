import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { MoralisProvider } from 'react-moralis'
import NavBar from '../components/NavBar'

const APP_ID = 'vxRfT23BgKAB7xdJDmaqwOJRwnC9YmdCGFK9A6Fw' // process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = 'https://ss5pmkqpc8n0.usemoralis.com:2053/server' //process.env.REACT_APP_MORALIS_SERVER_URL;

function MyApp({ Component, pageProps }: AppProps) {
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      'Missing Moralis Application ID or Server URL. Make sure to set your .env file.'
    )
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <div className="h-screen bg-slate-800">
        <NavBar />
        <Toaster containerStyle={{ top: 80 }} />
        <Component {...pageProps} />
      </div>
    </MoralisProvider>
  )
}

export default MyApp
