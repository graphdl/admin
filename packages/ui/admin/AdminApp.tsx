import { Admin, Resource } from 'react-admin'
import dataProvider from './providers/dataProvider'
import '../styles.css'
import { Noun } from '../typings'
import Layout from './components/Layout'
// import Dashboard from './pages/Dashboard'
import ResourceCreate from './resourceData/ResourceCreate'
import { ResourceEdit } from './resourceData/ResourceEdit'
import ResourceList from './resourceData/ResourceList'
import ResourceShow from './resourceData/ResourceShow'

const AdminApp = ({ graph }: { graph: any }) => {
  const { _id, _seed, _detail, _defaultId, _constraints, _list, ...nouns } = graph
  const graphName = graph._id !== 'db.mw' ? graph._id.split('.')[0] : graph._id
  console.log('graph', graph)
  return (
    <Admin title={graphName} dataProvider={dataProvider} layout={Layout}>
      {graph &&
        Object.entries<Noun<string, any>>(nouns).map(([name, noun]) => {
          // console.log('name', name, 'noun', noun)
          return (
            <Resource
              key={graph + noun}
              name={name}
              list={ResourceList({ graph, noun })}
              show={ResourceShow({ graph, noun, name })}
              create={ResourceCreate({ graph, noun, name })}
              edit={ResourceEdit}
              recordRepresentation={noun?._name}
            />
          )
        })}
    </Admin>
  )
}

export default AdminApp
