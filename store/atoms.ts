import {atom} from 'jotai'
import { Poll } from '../interfaces'

export const gBalanceAtom = atom<Number>(0)

export const isAdminAtom = atom<Boolean>(false)

export const pollsAtom = atom<Poll[]>([])

export const activePollsAtom = atom<Poll[]>(get => get(pollsAtom).filter(poll => Date.now() <= poll.date + Number(process.env.NEXT_PUBLIC_POLL_DURATION)*1000))

export const historyPollsAtom = atom<Poll[]>(get=> get(pollsAtom).filter(poll => Date.now() > poll.date + Number(process.env.NEXT_PUBLIC_POLL_DURATION)*1000))
