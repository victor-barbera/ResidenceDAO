import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import { MoralisProvider } from "react-moralis";
const APP_ID = "vxRfT23BgKAB7xdJDmaqwOJRwnC9YmdCGFK9A6Fw";// process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = "https://ss5pmkqpc8n0.usemoralis.com:2053/server";//process.env.REACT_APP_MORALIS_SERVER_URL;

function MyApp({ Component, pageProps }: AppProps) {

  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  if (!APP_ID || !SERVER_URL)
  throw new Error(
    "Missing Moralis Application ID or Server URL. Make sure to set your .env file.",
  );
  console.log(isServerInfo, APP_ID, SERVER_URL)
  if (isServerInfo){
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <div className="bg-slate-800 h-screen">
          <NavBar />
          <Component {...pageProps} />
        </div>
      </MoralisProvider>
    );  
  }

  
  // return (
  //   <div className="bg-slate-800 h-screen">
  //     <NavBar />
  //     <Component {...pageProps} />
  //   </div>
  // )
}

export default MyApp
