import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import ActivePoll from './ActivePoll'
import { Poll } from '../../interfaces'


const decodeVote = (vote: string) => {
  switch(vote) {
    case "0": return "Blank"
    case "1": return "Yes"
    case "2": return "No"
  }
}


const Polls: NextPage = () => {
  const [activePolls, setAP] =useState<Poll[]>([])
  const { account } = useMoralis()
  const { data: pollsData, isLoading: pollsLoading } = useMoralisQuery("Polls",query=>query.descending("pollId_decimal"),[],{live:true})
  const { data: votesData, isLoading: votesLoading } = useMoralisQuery("Votes", query=>query.descending("pollId_decimal"),[],{live:true})
  useEffect(()=>{
    const getPollVotes = (pollId: string) => {
      const result = {yes: 0, no: 0, blank:0}
      let userVote
      votesData.filter(vote=> vote.attributes.pollId === pollId).map(vote=> {
        if(vote.attributes.addr === account) userVote = decodeVote(vote.attributes.value)
        switch(vote.attributes.value) {
          case "0": result.blank += Number(vote.attributes.weight)
          break;
          case "1": result.yes += Number(vote.attributes.weight)
          break;
          case "2": result.no += Number(vote.attributes.weight)
          break;
        }
      })
      return {result, userVote}

    }
    if(!pollsLoading && !votesLoading && pollsData.length) setAP((pollsData.filter(poll=> Date.now()/1000 <= Number(poll.attributes.pollCreatedAt) + Number(process.env.NEXT_PUBLIC_POLL_DURATION)).map(poll=> {
      const { result, userVote} = getPollVotes(poll.attributes.pollId)
      return {
          id: poll.attributes.pollId,
          title: poll.attributes.title,
          description: poll.attributes.description,
          date: Number(poll.attributes.pollCreatedAt),
          value: userVote,
          result: result,
          qty: poll.attributes.qty,
          addr: poll.attributes.destAddr,
    }})))
  },[pollsData, votesData]);

  return (
    <>
      <Head>
        <title>Polls - ResidenceDAO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {activePolls?.length ? (<>
      <h1 className="mt-10 text-2xl font-semibold text-white antialiased">
        {activePolls.length} ACTIVE POLLS
      </h1>
      {activePolls.map((poll) => <ActivePoll {...poll} key={poll.id} />)}</>
      ) : <h1 className="mt-10 text-2xl font-semibold text-white antialiased">There are no active polls to display</h1>}
    </>
  )
}

export default Polls
