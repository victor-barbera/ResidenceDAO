import type { NextPage } from 'next'
import {  useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { useMoralisQuery } from 'react-moralis'
import { Tab } from '@headlessui/react'
import ClosedPoll from '../../components/ClosedPoll'
import { Poll } from '../../interfaces'
import { historyPollsAtom } from '../../store/atoms'

const TABS = ['All', 'Approved', 'Rejected']

const History: NextPage = () => {
  const historyPolls = useAtomValue(historyPollsAtom)
  const [hPolls, setHPolls] = useState<Poll[]>([])
  const { data: resultsData, isLoading: resultsLoading } = useMoralisQuery("Results",query=>query.descending("pollId_decimal"),[],{live:true})
  const tabscontent = [
    hPolls,
    hPolls.filter((poll) => poll.status === 'Approved'),
    hPolls.filter((poll) => poll.status === 'Rejected'),
  ]
  useEffect(()=>{
    if(!resultsLoading  && resultsData.length && historyPolls.length) {
      resultsData.map(result=> {
        const i = historyPolls.findIndex( poll => poll.id === result.attributes.pollId)
        historyPolls[i].status = decodeResult(result.attributes.result)
      })
      setHPolls(historyPolls)
    }
  },[resultsData, historyPolls])
  return (
      <Tab.Group>
        <Tab.List className="flex mt-10">
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
  )
}

const decodeResult = (vote: string) => {
  switch(vote) {
    case "1": return "Approved"
    case "2": return "Rejected"
  }
}
