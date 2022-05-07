import { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Poll from '../../components/Poll'
import RoundButton from '../../components/RoundButton'

function secondsToDhm(seconds: number) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes") : "";
  return dDisplay + hDisplay + mDisplay;
}

const ActivePoll = (props: any) => {
  const [mVisible, setMV] = useState(false)
  const [remaining, setRemaining] = useState("")
  const [votedcolor, setVotedcolor] = useState("text-blue")
  // ? Ha de calcular el temps restant i anar-se actualitzant (si queda poc mostrar segons)
  useEffect(()=>{
    setRemaining(secondsToDhm(Math.floor(props.date+Number(process.env.NEXT_PUBLIC_POLL_DURATION) - (Date.now()/1000))))
  })
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
      

    const voteClickHandler = ()=> {
       setMV(true)
    }
    const leadingOption = ()=> {
      const total = props.result.yes + props.result.no + props.result.abs
      if(props.result.yes == props.result.no) return "it's a draw"
      if(props.result.yes > props.result.no) return `Yes with ${props.result.yes/total*100}%`
      return `No with ${props.result.no/total*100}%`
    }

  return (
    <Poll {...props} footerText={`Leading option: ${leadingOption()}`}> {/* TODO: Posar el Yes en negrita (renderProps?¿) */}
      <p className='text-slate-300 my-3'>{props.description}</p> {/* TODO: Falta afegir un link a github */}
      <div className="flex items-end">
        <div>
          {props.value ? <p className={votedcolor}>You've voted <b>{props.value}</b></p> : <RoundButton onClick={voteClickHandler}>Vote</RoundButton>}
          <p className='text-slate-300 mt-3'>{`${remaining} remaining`}</p>
        </div>
        <div className='flex flex-col items-end ml-auto'>
          <p className='text-slate-600'><b>Yes: </b>{props.result.yes}</p>
          <p className='text-slate-600'><b>No: </b>{props.result.no}</p>
          <p className='text-slate-600'><b>Abs: </b>{props.result.abs}</p>
        </div>
      </div>
    </Poll>
  )
}

export default ActivePoll
