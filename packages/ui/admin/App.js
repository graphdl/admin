import * as React from 'react'
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, Create, SimpleForm, TextInput, DateInput, NumberInput, useGetList, useGetOne } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import Layout from './Layout'

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com')

const App = ({graph}) => {
  // Layout.resources = resources
  // const { data: user, isLoading, error } = useGetOne('users', { id: userId })
  // const { data, total, isLoading, error } = useGetList(
  //   'Noun',
  //   { 
  //       pagination: { page: 1, perPage: 20 },
  //       // sort: { field: 'published_at', order: 'DESC' }
  //   }
  // )
  return (
    <Admin dataProvider={dataProvider} layout={Layout}>
      <Resource name='posts' recordRepresentation='title' list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="comments" recordRepresentation='name' list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="todos" recordRepresentation='title' list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="albums" recordRepresentation='title' list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="photos" recordRepresentation='title' list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="users" recordRepresentation='name' list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    </Admin>
  )
}

export default App