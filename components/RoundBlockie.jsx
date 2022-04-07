import Blockie from 'react-blockies'

const RoundBlockie = ({ addr }) => {
  return (
    <div className='flex items-center h-fit w-fit rounded-full overflow-hidden'>
      <Blockie seed={addr} />
    </div>
  )
}

export default RoundBlockie
