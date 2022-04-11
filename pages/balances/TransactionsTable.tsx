const Transactions = () => {
    return (
<div class="relative  bg-slate-900 px-10 py-10 my-8 overflow-x-auto shadow-md sm:rounded-lg">
<h1 className=" text-2xl font-semibold text-white antialiased">
    TRANSACTIONS
</h1>
    <table className="table-fixed w-full bg-slate-800 text-slate-400 rounded-lg  mt-8 py-5 px-5">
        <thead>
            <tr>
                <th className="font-medium p-4  text-slate-400  text-center">Description</th> 
                <th className="font-medium p-4  text-slate-400  text-center">Amount</th> 
                <th className="font-medium p-4  text-slate-400  text-center">Date</th> 
                <th className="font-medium p-4  text-slate-400  text-center">State</th> 
            </tr> 
        </thead> 
        <tbody >
            {/* className="bg-slate-800 dark:bg-slate-900">  */}
            <tr  className="border-b bg-slate-700 border-slate-900"> 
                <td className="text-slate-300 text-center px-5 py-4">Tokens sent  0x08AG.....8877a</td> 
                <td className="text-slate-300 text-center px-5 py-4">80 $</td> 
                <td className="text-slate-300 text-center px-5 py-4">2 Apr 2022 2:00</td> 
                <td className="text-slate-300 text-center px-5 py-4">Pending</td> 
            </tr> 
            <tr  className="border-b bg-slate-700 border-slate-900"> 
                <td className="text-slate-300 text-center px-5 py-4">Tokens sent  0x08AG.....8877a</td> 
                <td className="text-slate-300 text-center px-5 py-4">80 $</td> 
                <td className="text-slate-300 text-center px-5 py-4">2 Apr 2022 2:00</td> 
                <td className="text-slate-300 text-center px-5 py-4">Pending</td> 
            </tr>             <tr  className="border-b bg-slate-700 border-slate-900"> 
                <td className="text-slate-300 text-center px-5 py-4">Tokens sent  0x08AG.....8877a</td> 
                <td className="text-slate-300 text-center px-5 py-4">80 $</td> 
                <td className="text-slate-300 text-center px-5 py-4">2 Apr 2022 2:00</td> 
                <td className="text-slate-300 text-center px-5 py-4">Pending</td> 
            </tr> 

        </tbody> 
    </table>
    </div>

    )} 
    export default Transactions