import { useEffect, useState } from 'react'
import {ClipboardIcon} from '@heroicons/react/outline'
import toast from 'react-hot-toast'
import { useMoralis} from 'react-moralis'



const TransactionTr =  (props: any) => {
  const { account } = useMoralis();

  const [stateIcon, setStateIcon] = useState("")
  const [direction, setDirection] = useState("")
  const [directionIcon, setDirectionIcon] = useState("")
  const [wallet, setWallet] = useState("")
  const [shortWallet, setShortWallet] = useState("")

  useEffect(()=>{

    switch(props.state) {
      case 'confirmed': 
        setStateIcon("M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z")
        break
      case 'pending':
        setStateIcon("M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z")
        break
      case 'failed':
        setStateIcon("M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z")
        break
    }
    if(props.from == account?.toLowerCase() ){
      // you are the sender
      setDirection("sent");
      setDirectionIcon("M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z");
      setWallet(props.to);
      setShortWallet(addrShortener(props.to))
    }else{
      setDirection("received")
      setDirectionIcon("M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z")
      setWallet(props.from);
      setShortWallet(addrShortener(props.from))

    }
  },[account, props.state, props.from, props.to ])

  const copyToClipboard = ()=> {
    navigator.clipboard.writeText(wallet)
    toast.success("Copied to clipboard!")
  }
  const addrShortener = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`


  return (
    <>
      <tr className="border-b border-slate-900 bg-slate-700">
        <td className="px-4 py-4 text-center text-slate-300">
            <div className="flex flex-row">
                <svg className="basis-1/4 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d={directionIcon} clipRule="evenodd" /></svg>                    
                <p className="basis-3/4 text-left" >Tokens {direction} </p>

            </div>
            <div className="flex flex-row">
                <p className="basis-3/4 ml-11 text-left" > {shortWallet}</p>
                <button onClick={copyToClipboard}><ClipboardIcon className='basis-1/4 w-5 h-5 text-slate-500 hover:text-slate-300' /></button>

            </div>
        </td>
        <td className="px-5 py-4 text-center text-slate-300"> {props.value}$</td>
        <td className="px-5 py-4 text-center text-slate-300">
          {props.date}
        </td>
        <td>
          <a target="_blank" href={"https://mumbai.polygonscan.com/tx/"+props.txHash}>
              <div className="flex flex-row  p-1  mx-10 bg-slate-800 shadow-md sm:rounded">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d={stateIcon} clipRule="evenodd" /></svg>
                <p className="basis-3/4 text-center text-slate-300">{props.state}</p>
              </div>
          </a>
        </td>
      </tr>
    </>
  )
}
export default TransactionTr