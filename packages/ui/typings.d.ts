export interface GraphDLProps {
  _id: string
  _name: string
  _seed: string
  _defaultId: string
  _list: {
    exclude: string[]
  }
  _detail: {
    columns: number
  }
  _constraints: boolean
  nouns: [Noun<string, any>]
}

export type Noun<K extends keyof any, T> = {
  [P in K]: T
}
