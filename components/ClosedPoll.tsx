import { useEffect, useState } from 'react'
import Poll from './Poll'

const ClosedPoll = (props: any) => {
  const [votedcolor, setVotedcolor] = useState("text-blue")

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
    if(props.result.yes == props.result.no) return "Rejected: it's a draw"
    if(props.result.yes > props.result.no) return `Approved with ${props.result.yes/total*100}%`
    return `Rejected with ${props.result.no/total*100}%`
  }

  return (
    <Poll {...props} footerText= {leadingOption()}>
      <p className='text-slate-300 my-3'>{props.description}</p>
      <div className="flex items-end">
        <div>
          {<p className={votedcolor}>You've voted <b>{props.value}</b></p>}
        </div>
        <div className='flex flex-col items-end ml-auto'>
          <p className='text-slate-600'><b>Yes: </b>{props.result.yes}</p>
          <p className='text-slate-600'><b>No: </b>{props.result.no}</p>
          <p className='text-slate-600'><b>Blank: </b>{props.result.blank}</p>
        </div>
      </div>
    </Poll>  )
}

export default ClosedPoll

