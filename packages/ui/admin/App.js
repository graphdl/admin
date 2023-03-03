import {
  Admin, EditGuesser, Resource
} from 'react-admin'
import Layout from './components/Layout'
// import { getDataProvider } from '../providers/JsonDataProvider'
import dataProvider from './dataProvider'
import { SimpleDetail } from './Detail'
import { SimpleList } from './Lists'
import { BrowserRouter, Route } from 'react-router-dom'

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com')

const App = ({ graph }) => {
  const { _id, _name, _seed, _detail, _defaultId, _constraints, _list, ...nouns } = graph

  return (
    <Admin dataProvider={dataProvider} layout={Layout}>
      {Object.entries(nouns).map(([name, noun]) => {
        const List = SimpleList({ graph, noun })
        const Detail = SimpleDetail({ graph, noun })
        return (
          <Resource
            key={graph + noun}
            name={name}
            recordRepresentation={noun._name}
            list={List}
            edit={EditGuesser}
            show={Detail}
          />
        )
      })}
    </Admin>
  )
}

export default App
