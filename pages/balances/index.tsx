import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import TransactionsTable from './TransactionsTable'
import RoundButton from '../../components/RoundButton'
import Dropdown from '../../components/Dropdown'
import { Transaction } from '../../interfaces'


const Balances: NextPage = () => {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState(0);

  const handleTransferClick = (e) => {
    e.preventDefault();
    let success = true;
    let error = 'Wallet incorrect';
    if(amount <= 0) {
      success = false;
      error = 'Amount must be > 0 ';
    }
    if(success){
      toast.success('Send token to wallet: '+ wallet+' and amount:'+ amount);
    }else{
      toast.error(error);
    }
  }
  return (
    <>
      <div className="mt-10 flex flex-row gap-4  ">
        <div className="basis-1/4 overflow-x-auto bg-slate-900 shadow-md sm:rounded-lg ">
          <p className="text-2l mx-5 mt-5 bg-slate-900 text-center font-semibold text-white antialiased">
            Your $Coin balance
          </p>
          <div className="mx-10 mt-3  bg-slate-800  shadow-md sm:rounded-lg">
          <p className="text-center p-2 text-2xl font-semibold text-white antialiased">
            {DUMMY_BALANCE}
          </p>
          </div>

        </div>
        <div className="basis-3/4 overflow-x-auto bg-slate-900 shadow-md sm:rounded-lg ">
          <div className="text-2l mx-10 mt-5 bg-slate-900 text-left font-semibold text-white antialiased">
            Transfer
          </div>
          {/* <div className="mb-5 flex flex-row gap-4"> */}
            <form onSubmit={handleTransferClick}  className="mb-5 flex flex-row gap-4">
                <input
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  placeholder="Select Account"
                  className="mx-10 my-3 basis-1/3 bg-slate-800  p-2 text-slate-400 sm:rounded-lg"/>

                {/* <Dropdown ></Dropdown> */}

                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  className="mx-5 my-3 basis-1/3 bg-slate-800  p-2 text-slate-400 sm:rounded-lg"
                />
              {/* <div className="  "> */}
                <input 
                  className="mx-10 my-3 basis-1/3 p-2 text-slate-400  bg-slate-800  shadow-md sm:rounded-lg"
                  type="submit"
                  value="Send" />
                {/* <RoundButton
                  className=" my-3 ml-5 mr-10 basis-1/3 self-center"
                >
                  Send
                </RoundButton> */}
              {/* </div> */}
            </form>
          {/* </div> */}
        </div>
      </div>
      <TransactionsTable data = { DUMMY_EVENTS_TRANSFER } />
    </>
  )
}

// const COLUMNS_EVENTS_TRANSFER: Array = [
//   'Description',
//   'Amount',
//   'Date',
//   'State'
// ]
const DUMMY_EVENTS_TRANSFER: Array<Transaction> = [
  {
      id: 2,
      state: 'confirmed',
      txHash: '0x64d4b51ba78bfdea503ed861908d62b2bdc498b15250a90b9ccf8be095ce7b08',
      from: '0x0000000000000000000000000000000000000000',
      to: '0xF9F613BDec2703ede176cC98A2276fA1F618A1b1',
      value: 100,
      date: 'Thu, 14 Apr 2022 11:45:30 GMT'
    },
    {
      id: 1,
      state: 'pending',
      txHash: '0x64d4b51ba78bfdea503ed861908d62b2bdc498b15250a90b9ccf8be095ce7b08',
      from: '0xF9F613BDec2703ede176cC98A2276fA1F618A1b1',
      to: '0x0000000000000000000000000000000000000000',
      value: 1000,
      date: 'Thu, 14 Apr 2022 15:45:30 GMT'
    },

    {
      id: 3,
      state: 'failed',
      txHash: '0x64d4b51ba78bfdea503ed861908d62b2bdc498b15250a90b9ccf8be095ce7b08',
      from: '0x0000000000000000000000000000000000000000',
      to: '0xF9F613BDec2703ede176cC98A2276fA1F618A1b1',
      value: 100,
      date: 'Thu, 14 Apr 2022 09:45:30 GMT'
    },
]

const DUMMY_BALANCE : Number = 100000;
export default Balances
