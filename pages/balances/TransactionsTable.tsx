import TransactionTr from './Transaction'
import { Transaction } from '../../interfaces'

const Transactions =  (props: any) => {
  return (
    <>
        <div className="relative  my-8 overflow-x-auto bg-slate-900 px-10 py-10 shadow-md sm:rounded-lg">
            <h1 className=" text-2xl font-semibold text-white antialiased">
                TRANSACTIONS
            </h1>
            <table className="mt-8 w-full table-fixed rounded-lg bg-slate-800  py-5 px-5 text-slate-400">
                <thead>
                <tr>
                    <th className="p-4 text-center  font-medium  text-slate-400">
                    Description
                    </th>
                    <th className="p-4 text-center  font-medium  text-slate-400">
                    Amount
                    </th>
                    <th className="p-4 text-center  font-medium  text-slate-400">
                    Date
                    </th>
                    <th className="p-4 text-center  font-medium  text-slate-400">
                    State
                    </th>
                </tr>
                </thead>
                <tbody>
                    {DUMMY_EVENTS_TRANSFER.map((transaction) => <TransactionTr {...transaction} key={transaction.id} />)}
                </tbody>
            </table>
        </div>
    </>

  )
}
export default Transactions

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
