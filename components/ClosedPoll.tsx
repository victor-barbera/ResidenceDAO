import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { ethers } from 'ethers'
import Poll from './Poll'
import RoundButton from './RoundButton'
import DAO from '../contracts/abi/DAO.json'
import toast from 'react-hot-toast'


const ClosedPoll = (props: any) => {
  const [votedcolor, setVotedcolor] = useState("text-blue")
  const { web3 } = useMoralis()

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
    if(props.result.yes > props.result.no) return `Approved with ${Math.floor(props.result.yes/total*100)}%`
    return `Rejected with ${Math.floor(props.result.no/total*100)}%`
  }

  const evaluateClickHandler = async () => {
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_DAO_ADDRESS!,DAO.abi, web3?.getSigner())
    const transaction = await contract.evaluatePoll(props.id)
    await transaction.wait()
    toast.success("Poll evaluated succesfully")
  }

  return (
    <Poll {...props} footerText= {leadingOption()}>
      <p className='text-slate-300 my-3'>{props.description}</p>
      <div className="flex items-end">
        <div>
          {props.status === "Pending" && <RoundButton onClick={evaluateClickHandler}>Evaluate</RoundButton>}
          <p className={votedcolor}>You've voted <b>{props.value}</b></p>
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

