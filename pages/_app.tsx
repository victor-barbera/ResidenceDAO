import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import {useSetAtom} from 'jotai'
import { MoralisProvider, useMoralis, useMoralisQuery } from 'react-moralis'
import { Toaster } from 'react-hot-toast'
import NavBar from '../components/NavBar'
import {pollsAtom} from '../store/atoms'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId={process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID!} serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL!}>
      <AppWithMoralis>
      <div className="flex flex-col bg-slate-800 min-h-screen">
        <NavBar />
        <Toaster containerStyle={{ top: 80 }} />
        <div className="flex flex-col max-w-4xl self-center">
          <Component {...pageProps} />
        </div>
      </div>
      </AppWithMoralis>
    </MoralisProvider>
  )
}


const AppWithMoralis = ({children}) => {
  const setPolls = useSetAtom(pollsAtom)
  const { account } = useMoralis()
  const { data: pollsData, isLoading: pollsLoading } = useMoralisQuery("PollsDAO",query=>query.descending("pollId_decimal"),[],{live:true})
  const { data: votesData, isLoading: votesLoading } = useMoralisQuery("VotesDAO", query=>query.descending("pollId_decimal"),[],{live:true})
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
    if(!pollsLoading && !votesLoading && pollsData.length) setPolls((pollsData.map(poll=> {
      const { result, userVote} = getPollVotes(poll.attributes.pollId)
      return {
          id: poll.attributes.pollId,
          title: poll.attributes.title,
          description: poll.attributes.description,
          date: Number(poll.attributes.pollCreatedAt)*1000,
          value: userVote,
          result: result,
          qty: poll.attributes.qty,
          addr: poll.attributes.destAddr,
          status: 'Pending'
    }})))
  },[pollsData, votesData]);
  return children
}

const decodeVote = (vote: string) => {
  switch(vote) {
    case "0": return "Blank"
    case "1": return "Yes"
    case "2": return "No"
  }
}

export default MyApp
