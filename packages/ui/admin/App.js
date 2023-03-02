import * as React from 'react'
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, Create, SimpleForm, TextInput, DateInput, NumberInput, useGetList, useGetOne } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import Layout from './Layout'
// import { getDataProvider } from '../providers/JsonDataProvider'
import dataProvider from './dataProvider'

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com')

const App = ({graph}) => {

  const { _id, _name, _seed, _defaultId, _constraints, ...nouns } = graph

  return (
    <Admin dataProvider={dataProvider} layout={Layout}>
      {Object.keys(nouns).map(noun => <Resource name={noun} recordRepresentation='title' list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />)}
      <Resource name='Posts' recordRepresentation='title' list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    </Admin>
  )
}

export default App