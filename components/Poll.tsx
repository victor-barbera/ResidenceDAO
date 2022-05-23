import toast from 'react-hot-toast'
import moment from 'moment'
import {ClipboardIcon} from '@heroicons/react/outline'

const addrShortener = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`
const displayAmount = (amount: number, decimals: number) => amount/(10**decimals)

const Poll = (props: any) => {
  const copyToClipboard = ()=> {
    navigator.clipboard.writeText(props.addr)
    toast.success("Copied to clipboard!")
  }
  return (
    <div className="bg-slate-900 border border-slate-600 rounded-lg my-8 pt-5 px-5 lg:w-[56rem]">
      <div className="flex flex-row">
        <div>
          <p className="text-slate-700 text-sm">POSTED ON {moment(props.date).format('MMMM Do YYYY, h:mm a')} | POLL ID {props.id}</p>
          <h2 className="text-slate-300 text-lg">{props.title}</h2>
        </div>
        <div className="flex items-center rounded bg-slate-800 ml-auto my-auto py-2 px-3">
          <p className="font-mono text-slate-500">{displayAmount(props.qty,6)} MMT ⮕ {addrShortener(props.addr)}</p>
          <button onClick={copyToClipboard}><ClipboardIcon className='ml-2 w-5 h-5 text-slate-500 hover:text-slate-300' /></button>
        </div>
      </div>
      {props.children}
      <div className='flex justify-center border-t border-slate-600 py-2 mt-5 -mx-5'>
        <p className='text-slate-400'>{props.footerText}</p>
      </div>
    </div>
  )
}

export default Poll