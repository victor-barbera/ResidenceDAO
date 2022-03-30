// ? Falta afegir la duració
export interface Poll {
  id: number
  title: string
  description: string
  date: string
  value: string | undefined
  result: Result
  qty: number
  addr: string
  // state: string // pending, approved & declined
}

export interface Result {
  yes: number
  no: number
  abs: number
}
export interface Category {
  category: Array<Poll>,
}