import type { NextPage } from 'next'
import Head from 'next/head'
//import Image from 'next/image'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ResidenceDAO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='mt-10 text-2xl font-semibold text-white antialiased'>Welcome to Residence DAO</h1>
      <h2 className='mt-10 text-2xl font-semibold text-white antialiased'>System Info</h2>
    </>
  )
}

export default Home
