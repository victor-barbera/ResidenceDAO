import { useState, Fragment } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {useAtomValue} from 'jotai'
import { useMoralis } from 'react-moralis'
import { ethers } from 'ethers'
import { Dialog, Transition } from '@headlessui/react'
import ActivePoll from '../../components/ActivePoll'
import RoundButton from '../../components/RoundButton'
import {activePollsAtom, isAdminAtom} from '../../store/atoms'
import DAO from '../../contracts/abi/DAO.json'
import toast from 'react-hot-toast'



// TODO: Move createPoll form to another file and optimize.
const Polls: NextPage = () => {
  const [mVisible, setMV] = useState(false)
  const [npTitle, setTitle] = useState("")
  const [npDesc, setDesc] = useState("")
  const [npAddr, setAddr] = useState("")
  const [npQty, setQty] = useState("")

  const activePolls = useAtomValue(activePollsAtom)
  const isAdmin = useAtomValue(isAdminAtom)

  const { web3 } = useMoralis()

  const handleSubmit = async () => {
    setMV(false)
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_DAO_ADDRESS!,DAO.abi, web3?.getSigner())
    const transaction = await contract.createPoll(npTitle,npDesc,npAddr,npQty);
    await transaction.wait()
    toast.success("New poll created")
  }

  return (
    <>
      <Head>
        <title>Polls - ResidenceDAO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {activePolls?.length ? (<>
      <h1 className="mt-10 text-2xl font-semibold text-white antialiased">
        {activePolls.length} ACTIVE POLLS
      </h1>
      {isAdmin && <RoundButton className="mt-5" onClick={()=>setMV(true)}>New Proposal</RoundButton>}
      {activePolls.map((poll) => <ActivePoll {...poll} key={poll.id} />)}</>
      ) : <h1 className="mt-10 text-2xl font-semibold text-white antialiased">There are no active polls to display</h1>}
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
                    Create a new Poll
                  </Dialog.Title>
                  <div className="mt-4">
                    <input
                      value={npTitle}
                      onChange={e=>setTitle(e.target.value)}
                      type="text"
                      placeholder="Title"
                      className="inline-flex rounded-md border-2 border-slate-400 bg-slate-200 w-full py-1 px-2 font-mono mb-5"
                    />
                    <textarea
                      value={npDesc}
                      onChange={e=>setDesc(e.target.value)}
                      rows={3}
                      placeholder="Description"
                      className="inline-flex rounded-md border-2 border-slate-400 bg-slate-200 w-full py-1 px-2 font-mono mb-5"
                    />
                    <input
                      value={npAddr}
                      onChange={e=>setAddr(e.target.value)}
                      type="text"
                      placeholder="Destination address"
                      className="inline-flex rounded-md border-2 border-slate-400 bg-slate-200 w-full py-1 px-2 font-mono mb-5"
                    />
                    <input
                      value={npQty}
                      onChange={e=>setQty(e.target.value)}
                      type="number"
                      placeholder="Quantity"
                      className="inline-flex rounded-md border-2 border-slate-400 bg-slate-200 w-full py-1 px-2 font-mono mb-5"
                    />
                    {/* <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 mb-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none w-full"
                      onClick={()=> handleVote(2)}
                    >
                      No
                    </button>*/}
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 mb-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none w-full"
                      onClick={handleSubmit}
                    >
                      Submit
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

export default Polls
