const RoundButton = ({children, onClick}) => {
  return (
    <button className="py-1 px-4 bg-purple-500 focus:ring-purple-600 ring-2 hover:bg-purple-700 rounded-full" onClick={onClick}>{children}</button>
  )
}

export default RoundButton