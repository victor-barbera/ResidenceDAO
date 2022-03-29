const Poll = (props: any) => {
  return (
    <div className="bg-slate-900 border border-slate-600 rounded-lg my-8 py-5 px-5"> {/* full-card */}
      <div className="flex flex-row"> {/* date,title || qty,dest */}
        <div>
          <p className="text-slate-700 text-sm">{`POSTED ON ${props.date} | POLL ID ${props.id}`}</p>
          <h2 className="text-slate-300 text-lg">{props.title}</h2>
        </div>
        <div className="flex rounded bg-slate-800 ml-auto">
          <p className="font-mono text-slate-500">{`${props.qty} BTC | ${props.addr}`}</p>
        </div>
      </div>
    </div>
  )
}

export default Poll