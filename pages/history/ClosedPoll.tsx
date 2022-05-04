import { useEffect, useState } from 'react'
import Poll from '../../components/Poll'

const ClosedPoll = (props: any) => {
  const [closedAt, setClosedAt] = useState("")
  const [votedcolor, setVotedcolor] = useState("text-blue")
  // ? Ha de calcular el temps restant i anar-se actualitzant (si queda poc mostrar segons)
  useEffect(()=>{
    setClosedAt((props)=>{
      return "5D 10H"
    })
  },[])
  useEffect(()=>{
    switch(props.value) {
      case 'Yes': 
        setVotedcolor("text-green-600")
        break
      case 'No':
        setVotedcolor("text-red-600")
        break
      case 'Abs':
        setVotedcolor("text-blue-600")
        break
    }
  },[props.value])
  return (
    <Poll {...props} footerText= {props.status+": "+props.value+ props.result.yes + "  %"}>
      <p className='text-slate-300 my-3'>{props.description}</p>
      <div className="flex items-end">
        <div>
          {<p className={votedcolor}>You've voted <b>{props.value}</b></p>}
          <p className='text-slate-300 mt-3'>{`${closedAt} AGO`}</p>
        </div>
        <div className='flex flex-col items-end ml-auto'>
          <p className='text-slate-600'><b>Yes: </b>{props.result.yes}%</p>
          <p className='text-slate-600'><b>No: </b>{props.result.no}%</p>
          <p className='text-slate-600'><b>Abs: </b>{props.result.abs}%</p>
        </div>
      </div>
    </Poll>
  )
}

export default ClosedPoll

