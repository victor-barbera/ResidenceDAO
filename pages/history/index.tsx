import type { NextPage } from 'next'
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import ClosedPoll from './ClosedPoll'
import {Poll, Result, Category} from '../../interfaces'
import TabPolls from './TabPolls'

const History: NextPage = () => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
  <div className="flex justify-center">
    <div className="flex-col lg:basis-1/2">
      <h1 className="text-white font-semibold antialiased text-2xl mt-10">4 CLOSED POLLS</h1>
        <Tab.Group >
          <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl mt-10">
            {Object.keys(DUMMY_CATEGORIES).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
           <Tab.Panels className="mt-2">
            {Object.values(DUMMY_CATEGORIES).map((polls, idx) => (
              <Tab.Panel
              key={idx}
            >
              <ul>
              {polls.map((poll) => (
              <ClosedPoll {...poll} />
              ))
              }
              </ul>
              </Tab.Panel>

            ))}
          </Tab.Panels> 
        </Tab.Group>
    </div>
  </div>


  )
}
const DUMMY_POLLS_APPROVED: Array<Poll>  = [    
  {
  id: 2,
  title: "Titol del proposal - XIP1334",
  description: "Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.",
  date: (new Date()).toUTCString(),
  value: "Yes",
  result: {yes:23,no:47,abs:10},
  qty: 10,
  addr: "0x06D...6583"
},
{
  id: 3,
  title: "Encara falta per les metaproposals - XIP1334",
  description: "Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.",
  date: (new Date()).toUTCString(),
  value: undefined,
  result: {yes:23,no:47,abs:10},
  qty: 36,
  addr: "0x06D...6583"
}]
const DUMMY_POLLS_DECLINED: Array<Poll>  = [    
  {
  id: 4,
  title: "Titol del proposal - XIP1334",
  description: "Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.",
  date: (new Date()).toUTCString(),
  value: "Yes",
  result: {yes:23,no:47,abs:10},
  qty: 10,
  addr: "0x06D...6583"
},
{
  id: 5,
  title: "Encara falta per les metaproposals - XIP1334",
  description: "Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.",
  date: (new Date()).toUTCString(),
  value: undefined,
  result: {yes:23,no:47,abs:10},
  qty: 36,
  addr: "0x06D...6583"
}]
const DUMMY_CATEGORIES: Object = {
  All: [...DUMMY_POLLS_APPROVED, ...DUMMY_POLLS_DECLINED],
  Approved: DUMMY_POLLS_APPROVED,
  Rejected: DUMMY_POLLS_DECLINED,
}

// Dades ja transformades desde front.
// let DUMMY_CATEGORIES: Array<Category> = [
//   "APPROVED" = [
//     {
//       id: 1,
//       title: 'Is tech making coffee better or worse?',
//       date: 'Jan 7',
//       commentCount: 29,
//       shareCount: 16,
//     },
//     {
//       id: 2,
//       title: 'The most innovative things happening in coffee',
//       date: 'Mar 19',
//       commentCount: 24,
//       shareCount: 12,
//     },
//   ],
//   "DENIED"= [
//     {
//       id: 1,
//       title: 'Is tech making coffee better or worse?',
//       date: 'Jan 7',
//       commentCount: 29,
//       shareCount: 16,
//     },
//     {
//       id: 2,
//       title: 'The most innovative things happening in coffee',
//       date: 'Mar 19',
//       commentCount: 24,
//       shareCount: 12,
//     },
//   ]
// ]


// const DUMMY_POLLS: Array<Poll> = [
//   {
//     id: 1,
//     title: "Titol del proposal - XIP1334",
//     description: "Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.",
//     date: (new Date()).toUTCString(),
//     value: "Yes",
//     result: {yes:23,no:47,abs:10},
//     qty: 10,
//     addr: "0x06D...6583"
//   },
//   {
//     id: 2,
//     title: "Encara falta per les metaproposals - XIP1334",
//     description: "Una curta descripció per descriure per sobre la proposal, la descripció llarga de moment a Github del repositori.",
//     date: (new Date()).toUTCString(),
//     value: undefined,
//     result: {yes:23,no:47,abs:10},
//     qty: 36,
//     addr: "0x06D...6583"
//   }
// ]

export default History