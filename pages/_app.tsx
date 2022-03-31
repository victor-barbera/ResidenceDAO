import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen bg-slate-800">
      <NavBar />
      <Toaster containerStyle={{top: 80}} />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
