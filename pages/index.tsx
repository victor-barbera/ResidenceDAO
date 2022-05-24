import type { NextPage } from 'next'
import Head from 'next/head'
import { useAtomValue } from 'jotai'
import { gBalanceAtom } from '../store/atoms'

const Home: NextPage = () => {
  const gBalance = useAtomValue(gBalanceAtom)
  return (
    <>
      <Head>
        <title>ResidenceDAO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className='mt-10 text-2xl font-semibold text-white antialiased'>System Info</h2>
      <div className="bg-slate-900 border border-slate-600 rounded-lg my-8 py-5 px-5 lg:w-[40rem]">
        <div className='flex flex-row justify-between'><p className='font-mono text-slate-500'>DAO Address</p><p className='font-mono text-slate-500'>{process.env.NEXT_PUBLIC_DAO_ADDRESS}</p></div>
        <div className='flex flex-row justify-between'><p className='font-mono text-slate-500'>M Token Address</p><p className='font-mono text-slate-500'>{process.env.NEXT_PUBLIC_MTOKEN_ADDRESS}</p></div>
        <div className='flex flex-row justify-between'><p className='font-mono text-slate-500'>R Token Address</p><p className='font-mono text-slate-500'>{process.env.NEXT_PUBLIC_RTOKEN_ADDRESS}</p></div>
        <div className='flex flex-row justify-between'><p className='font-mono text-slate-500'>G Token Address</p><p className='font-mono text-slate-500'>{process.env.NEXT_PUBLIC_GTOKEN_ADDRESS}</p></div>
        <div className='flex flex-row justify-between'><p className='font-mono text-slate-500'>G Token Balance</p><p className='font-mono text-slate-500'>{gBalance} RGT</p></div>
      </div>
    </>
  )
}

export default Home
