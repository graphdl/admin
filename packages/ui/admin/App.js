import * as React from 'react'
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, Create, SimpleForm, TextInput, DateInput, NumberInput, useGetList, useGetOne } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import Layout from './Layout'
// import { getDataProvider } from '../providers/JsonDataProvider'
import dataProvider from './dataProvider'
import { SimpleList } from './Lists'

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com')

const App = ({graph}) => {

  const { _id, _name, _seed, _defaultId, _constraints, _list, ...nouns } = graph

  

  return (
    <Admin dataProvider={dataProvider} layout={Layout}>
      {Object.entries(nouns).map(([name, noun]) => {
        const List = SimpleList({graph, noun})
        return <Resource name={name} recordRepresentation={noun._name} list={List} edit={EditGuesser} show={ShowGuesser} />
      })}
    </Admin>
  )
}

export default App