import TransactionTr from './Transaction'
import { Transaction } from '../../interfaces'

const Transactions =  (props: any) => {
  return (
    <>


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
                    {props.data.map((transaction:any) => <TransactionTr {...transaction} key={transaction.id} />)}
                </tbody>
            </table>
    </>

  )
}
export default Transactions
