import { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useMoralis } from 'react-moralis'
import { ethers } from 'ethers'
import Poll from '../../components/Poll'
import RoundButton from '../../components/RoundButton'
import { signTransferWithAuthorization } from '../../lib'
import DAO from '../../Contracts/DAO.json'

function secondsToDhm(seconds: number) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes") : "";
  return dDisplay + hDisplay + mDisplay;
}

const displayAmount = (amount: number, decimals: number) => amount/(10**decimals)

const ActivePoll = (props: any) => {
  const [mVisible, setMV] = useState(false)
  const [remaining, setRemaining] = useState("")
  const [votedcolor, setVotedcolor] = useState("text-blue")
  const { account, isAuthenticated, web3, provider } = useMoralis()
  useEffect(()=>{
    setRemaining(secondsToDhm(Math.floor(props.date+Number(process.env.NEXT_PUBLIC_POLL_DURATION) - (Date.now()/1000))))
  })
  useEffect(()=>{
    switch(props.value) {
      case 'Yes': 
      setVotedcolor("text-green-600")
      break
      case 'No':
        setVotedcolor("text-red-600")
        break
        case 'Blank':
          setVotedcolor("text-white")
          break
        }
      },[props.value]) 

      const leadingOption = ()=> {
        const total = props.result.yes + props.result.no + props.result.blank
        if(props.result.yes == props.result.no) return "it's a draw"
        if(props.result.yes > props.result.no) return `Yes with ${props.result.yes/total*100}%`
        return `No with ${props.result.no/total*100}%`
      }
      
      const voteClickHandler = ()=> {
         setMV(true)
      }

      const handleVote = async (vote: number) => {
        setMV(false)
        const signature = await signTransferWithAuthorization(account, process.env.NEXT_PUBLIC_DAO_ADDRESS, props.qty, provider)
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_DAO_ADDRESS!,DAO.abi, web3?.getSigner())
        const transaction = await contract.voteWithDeposit(props.id, vote, signature.from, signature.to, signature.value, signature.validAfter, signature.validBefore, signature.nonce, signature.v, signature.r, signature.s);
        await transaction.wait()

      }

  return (
  <>
    <Poll {...props} footerText={`Leading option: ${leadingOption()}`}> {/* TODO: Posar el Yes en negrita (renderProps?¿) */}
      <p className='text-slate-300 my-3'>{props.description}</p> {/* TODO: Falta afegir un link a github */}
      <div className="flex items-end">
        <div>
          {isAuthenticated ? (props.value ? <p className={votedcolor}>You've voted <b>{props.value}</b></p> :  <RoundButton onClick={voteClickHandler}>Vote</RoundButton>) : <p className='text-purple-600'>Authenticate to vote</p>}
          <p className='text-slate-300 mt-3'>{`${remaining} remaining`}</p>
        </div>
        <div className='flex flex-col items-end ml-auto'>
          <p className='text-slate-600'><b>Yes: </b>{props.result.yes}</p>
          <p className='text-slate-600'><b>No: </b>{props.result.no}</p>
          <p className='text-slate-600'><b>Blank: </b>{props.result.blank}</p>
        </div>
      </div>
    </Poll>
    <Transition appear show={mVisible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setMV(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-slate-900"
                  >
                    Poll {props.id} ballot
                  </Dialog.Title>
                  <Dialog.Description as="p" className="text-sm text-slate-500 mt-2">
                  To cast your vote you'll have to sign an approval for spending a weighted amount of the total which is: {displayAmount(props.qty,6)/2} MMT
                  </Dialog.Description>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 mb-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none w-full"
                      onClick={()=> handleVote(1)}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 mb-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none w-full"
                      onClick={()=> handleVote(2)}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 mb-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none w-full"
                      onClick={()=> handleVote(0)}
                    >
                      Blank vote
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ActivePoll
