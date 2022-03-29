import type { NextPage } from 'next'
import Poll from './Poll'

const Polls: NextPage = () => {
  return (
    <div className="flex justify-center">
      <div className="flex-col lg:basis-1/2">
        <h1 className="text-white font-semibold antialiased text-2xl mt-10">5 ACTIVE POLLS</h1>
        {DUMMY_POLLS.map(poll => <Poll {...poll} />)}
      </div>
    </div>
  )
}

// Dades ja transformades desde front.
const DUMMY_POLLS: Array<Poll> = [
  {
    id: 1,
    title: "Titol del proposal - XIP1334",
    description: "Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.",
    date: (new Date()).toUTCString(),
    value: "Yes",
    result: {yes:23,no:47,abs:10},
    qty: 10,
    addr: "0x06D...6583"
  },
  {
    id: 2,
    title: "Encara falta per les metaproposals - XIP1334",
    description: "Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.",
    date: (new Date()).toUTCString(),
    value: undefined,
    result: {yes:23,no:47,abs:10},
    qty: 36,
    addr: "0x06D...6583"
  }
]

interface Poll{
  id: number,
  title: string,
  description: string,
  date: string,
  value: string | undefined,
  result: Result,
  qty: number,
  addr: string
}
interface Result{
  yes: number,
  no: number,
  abs: number
}

export default Polls
