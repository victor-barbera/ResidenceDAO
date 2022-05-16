import type { NextPage } from 'next'
import {  useState } from 'react'
import { Tab } from '@headlessui/react'
import ClosedPoll from '../../components/ClosedPoll'
import { Poll } from '../../interfaces'

const TABS = ['All', 'Approved', 'Rejected']

const History: NextPage = () => {
  const [tabscontent, setTabscontent] = useState([
    DUMMY_POLLS,
    DUMMY_POLLS.filter((poll) => poll.status === 'Approved'),
    DUMMY_POLLS.filter((poll) => poll.status === 'Rejected'),
  ])
  return (
    <>
      <h1 className="mt-10 text-2xl font-semibold text-white antialiased">
        {DUMMY_POLLS.length} CLOSED POLLS
      </h1>
      <Tab.Group>
        <Tab.List className="flex mt-2">
          {TABS.map((category) => (
            <Tab
              key={category}
              className={({selected}) => `w-full text-white antialising rounded-lg py-2 ${selected ? "bg-slate-700" : "bg-slate-800"}`}
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="">
          {tabscontent.map((polls) => (
            <Tab.Panel>
                {polls.map((poll) => (<ClosedPoll {...poll} />))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

const DUMMY_POLLS: Array<Poll> = [
  {
    id: 2,
    title: 'Titol del proposal - XIP1334',
    description:
      'Una curta descripció per descriure per sobre la proposal.',
    date: Date.now(),
    value: 'Yes',
    result: { yes: 23, no: 47, blank: 10 },
    qty: 10,
    addr: '0x06D...6583',
    //duration: 7,
    status: 'Approved',
  },
  {
    id: 3,
    title: 'Encara falta per les metaproposals - XIP1334',
    description:
      'Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.',
    date: Date.now(),
    value: 'No',
    result: { yes: 23, no: 47, blank: 10 },
    qty: 36,
    addr: '0x06D...6583',
    //duration: 30,
    status: 'Approved',
  },
  {
    id: 4,
    title: 'Titol del proposal - XIP1334',
    description:
      'Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.',
    date: Date.now(),
    value: 'Yes',
    result: { yes: 23, no: 47, blank: 10 },
    qty: 10,
    addr: '0x06D...6583',
    //duration: 30,
    status: 'Rejected',
  },
  {
    id: 5,
    title: 'Encara falta per les metaproposals - XIP1334',
    description:
      'Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.',
    date: Date.now(),
    value: 'Yes',
    result: { yes: 23, no: 47, blank: 10 },
    qty: 36,
    addr: '0x06D...6583',
    //duration: 7,
    status: 'Rejected',
  },
]

export default History