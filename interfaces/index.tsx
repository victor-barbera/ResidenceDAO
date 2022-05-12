// ? Falta afegir la duració
export interface Poll {
  id: number
  title: string
  description: string
  date: number
  value: string | undefined
  result: Result
  qty: number
  addr: string
  // duration: number
  // status: 'Pending' | 'Approved' | 'Rejected'
}

export interface Result {
  yes: number
  no: number
  blank: number
}
export interface Category {
  category: Array<Poll>,
}

export interface Transaction {
  id: number
  state: string
  txHash: string
  from: string
  to: string
  value: number
  date: string

}
