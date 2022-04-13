import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import TransactionsTable from './TransactionsTable'
import RoundButton from '../../components/RoundButton'
import Dropdown from '../../components/Dropdown'

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
          <p className="text-center text-2xl font-semibold text-white antialiased">
            100000
          </p>
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
                  className="mx-10 my-3 basis-1/3 p-2 text-slate-400"
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
      <TransactionsTable />
    </>
  )
}

export default Balances
