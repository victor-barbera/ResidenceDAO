const Transactions =  (props: any) => {
  return (
    <div class="relative  my-8 overflow-x-auto bg-slate-900 px-10 py-10 shadow-md sm:rounded-lg">
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
          {/* className="bg-slate-800 dark:bg-slate-900">  */}
          <tr className="border-b border-slate-900 bg-slate-700">
            <td className="px-5 py-4 text-center text-slate-300">
               <div className="flex flex-row gap-4">
<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>                    <p className="basis-3/4">Tokens sent 0x08AG.....8877a</p>
               </div>
            </td>
            <td className="px-5 py-4 text-center text-slate-300"> - 80 $</td>
            <td className="px-5 py-4 text-center text-slate-300">
              2 Apr 2022 2:00
            </td>
            <td>
              <a target="_blank" href="https://polygonscan.com/tx/0x64d4b51ba78bfdea503ed861908d62b2bdc498b15250a90b9ccf8be095ce7b08">
                  <div className="flex flex-row  p-1  mx-10 bg-slate-800 shadow-md sm:rounded">
                    <p className="basis-3/4 text-center text-slate-300">Pending</p>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                  </div>
              </a>
            </td>
          </tr>
          <tr className="border-b border-slate-900 bg-slate-700">
          <td className="px-5 py-4 text-center text-slate-300">
               <div className="flex flex-row gap-4">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" /></svg>                    
               <p className="basis-2/3">Tokens received 0x08AG.....8877a</p>
               </div>
            </td>
            <td className="px-5 py-4 text-center text-slate-300"> + 80 $</td>
            <td className="px-5 py-4 text-center text-slate-300">
              2 Apr 2022 2:00
            </td>
            <td>
            <a target="_blank" href="https://polygonscan.com/tx/0x64d4b51ba78bfdea503ed861908d62b2bdc498b15250a90b9ccf8be095ce7b08">
                  <div className="flex flex-row  p-1  mx-10 bg-slate-800 shadow-md sm:rounded">
                    <p className="basis-3/4 text-center text-slate-300">Confirmed</p>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>                    </div>
              </a>
            </td>          </tr>{' '}
          <tr className="border-b border-slate-900 bg-slate-700">
          <td className="px-5 py-4 text-center text-slate-300">
               <div className="flex flex-row gap-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
                    <p className="basis-3/4">Tokens sent 0x08AG.....8877a</p>
               </div>
            </td>
            <td className="px-5 py-4 text-center text-slate-300">- 80 $</td>
            <td className="px-5 py-4 text-center text-slate-300">
              2 Apr 2022 2:00
            </td>
            <td>
            <a target="_blank" href="https://polygonscan.com/tx/0x64d4b51ba78bfdea503ed861908d62b2bdc498b15250a90b9ccf8be095ce7b08">
                  <div className="flex flex-row  p-1  mx-10 bg-slate-800 shadow-md sm:rounded">
                    <p className="basis-3/4 text-center text-slate-300">Failed</p>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>                  </div>
              </a>
            </td>          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Transactions
