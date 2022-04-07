import type { NextPage } from 'next'
import Head from 'next/head'
import ActivePoll from './ActivePoll'
import { Poll } from '../../interfaces'

const Polls: NextPage = () => {
  return (
    <>
      <Head>
        <title>Polls | ResidenceDAO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mt-10 text-2xl font-semibold text-white antialiased">
        {DUMMY_POLLS.length} ACTIVE POLLS
      </h1>
      {DUMMY_POLLS.map((poll) => <ActivePoll {...poll} key={poll.id} />)}
    </>
  )
}

// Dades ja transformades desde front.
const DUMMY_POLLS: Array<Poll> = [
  {
    id: 1,
    title: 'Titol del proposal - XIP1334',
    description:
      'Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.',
    date: 'Thu, 14 Apr 2022 15:45:30 GMT',
    value: 'Yes',
    result: { yes: 23, no: 47, abs: 10 },
    qty: 10,
    addr: '0x06D...6583',
    duration: 7,
    state: 'Active',
  },
  {
    id: 2,
    title: 'Encara falta per les metaproposals - XIP1334',
    description:
      'Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori. Descripció bastant més llarga en aquest cas, per provar multiline.',
    date: 'Thu, 07 Apr 2022 15:45:30 GMT',
    value: undefined,
    result: { yes: 23, no: 47, abs: 10 },
    qty: 36,
    addr: '0x06D...6583',
    duration: 30,
    state: 'Active',
  },
]

export default Polls
