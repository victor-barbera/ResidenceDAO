export interface Poll {
  id: number
  title: string
  description: string
  date: string
  value: string | undefined
  result: Result
  qty: number
  addr: string
}

export interface Result {
  yes: number
  no: number
  abs: number
}
