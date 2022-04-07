import type { NextPage } from 'next'
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import ClosedPoll from './ClosedPoll'
import { Poll, Result, Category } from '../../interfaces'

/*
TODO: Les cateories són 3, no cal posar-les com a dummy-data,
* apart, la llogica s'hauria de repensar ja que no cal tindre un array
* per cada categoria, amb filtrar per status ja aniria. 
*/
const History: NextPage = () => {
  return (
    <>
      <h1 className="mt-10 text-2xl font-semibold text-white antialiased">
        {DUMMY_CATEGORIES['All'].length} CLOSED POLLS
      </h1>
      <Tab.Group>
        <Tab.List className="mt-10 flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(DUMMY_CATEGORIES).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(DUMMY_CATEGORIES).map((polls, idx) => (
            <Tab.Panel key={idx}>
              <ul>
                {polls.map((poll) => (
                  <ClosedPoll {...poll} />
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

const DUMMY_POLLS_APPROVED: Array<Poll> = [
  {
    id: 2,
    title: 'Titol del proposal - XIP1334',
    description:
      'Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.',
    date: new Date().toUTCString(),
    value: 'Yes',
    result: { yes: 23, no: 47, abs: 10 },
    qty: 10,
    addr: '0x06D...6583',
    duration: 7,
    state: 'Approved',
  },
  {
    id: 3,
    title: 'Encara falta per les metaproposals - XIP1334',
    description:
      'Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.',
    date: new Date().toUTCString(),
    value: 'No',
    result: { yes: 23, no: 47, abs: 10 },
    qty: 36,
    addr: '0x06D...6583',
    duration: 30,
    state: 'Approved',
  },
]
const DUMMY_POLLS_REJECTED: Array<Poll> = [
  {
    id: 4,
    title: 'Titol del proposal - XIP1334',
    description:
      'Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.',
    date: new Date().toUTCString(),
    value: 'Yes',
    result: { yes: 23, no: 47, abs: 10 },
    qty: 10,
    addr: '0x06D...6583',
    duration: 30,
    state: 'Rejected',
  },
  {
    id: 5,
    title: 'Encara falta per les metaproposals - XIP1334',
    description:
      'Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.',
    date: new Date().toUTCString(),
    value: 'Yes',
    result: { yes: 23, no: 47, abs: 10 },
    qty: 36,
    addr: '0x06D...6583',
    duration: 7,
    state: 'Rejected',
  },
]
const DUMMY_CATEGORIES: Object = {
  All: [...DUMMY_POLLS_APPROVED, ...DUMMY_POLLS_REJECTED],
  Approved: DUMMY_POLLS_APPROVED,
  Rejected: DUMMY_POLLS_REJECTED,
}

export default History
