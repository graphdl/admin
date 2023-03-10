import { useEffect, useState, useSyncExternalStore } from 'react'

export interface Atom<AtomType> {
  get: () => AtomType
  set: (newValue: AtomType) => void
  subscribe: (callback: (newValue: AtomType) => void) => () => void
}

type AtomGetter<AtomType> = (get: <Target>(a: Atom<Target>) => Target) => AtomType

export function atom<AtomType>(initialValue: AtomType | AtomGetter<AtomType>): Atom<AtomType> {
  let value = typeof initialValue === 'function' ? (null as AtomType) : initialValue

  const subscribers = new Set<(newValue: AtomType) => void>()

  function get<Target>(atom: Atom<Target>) {
    let currentValue = atom.get()
    atom.subscribe((newValue) => {
      if (currentValue === newValue) return
      currentValue = newValue
      computeValue()
      subscribers.forEach((callback) => callback(value))
    })
    return currentValue
  }

  function computeValue() {
    const newValue =
      typeof initialValue === 'function' ? (initialValue as AtomGetter<AtomType>)(get) : value

    if (newValue && typeof (newValue as any).then === 'function') {
      value = null as AtomType
      ;(newValue as any as Promise<AtomType>).then((resolvedValue) => {
        value = resolvedValue
        subscribers.forEach((callback) => callback(value))
      })
    } else {
      value = newValue
    }
  }

  computeValue()

  return {
    get: () => value,
    set: (newValue) => {
      value = newValue
      subscribers.forEach((callback) => callback(value))
    },
    subscribe: (callback) => {
      subscribers.add(callback)
      return () => {
        subscribers.delete(callback)
      }
    },
  }
}

export function useAtom<AtomType>(atom: Atom<AtomType>) {
  const [value, setValue] = useState(atom.get())

  useEffect(() => {
    const unsubscribe = atom.subscribe(setValue)
    return () => 
      unsubscribe()
  }, [atom])

  return [
    value,
    atom.set
  ]
}

export function useSetAtom<AtomType>(atom: Atom<AtomType>) {
  return [atom.set] as const
}

export function useAtomValue<AtomType>(atom: Atom<AtomType>) {
  return [useSyncExternalStore(atom.subscribe, atom.get, atom.get)] as const
}

export type BoardType = {
  id: string;
  title: string;
  description: string;
  status: string;
}

export const boardAtom = atom<any>([
  {
    id: '1',
    title: 'create a Kanban app with Tailwindcss',
    description: 'This will be a Tailwindcss based Kanban app',
    status: 'ideas',
  },
  {
    id: '2',
    title: 'master React-Admin',
    description: 'Embrace MUI and learn how to use it',
    status: 'backlog'
  },

  {
    id: '3',
    title: 'build a worker in Cloudflare',
    description: 'Build a service in Cloudflare',
    status: 'backlog',
  },

  {
    id: '4',
    title: 'building admin dashboard',
    description: 'React-Admin Tailwindcss Graphdl',
    status: 'in progress',
  },

  {
    id: '5',
    title: 'ate breakfast',
    description: '6 eggs yolks and all',
    status: 'done',
  },
])
