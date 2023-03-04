import { Admin, Resource } from 'react-admin'
import { Noun } from '../typings'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ResourceList from './resourceData/ResourceList'
import dataProvider from './utils/dataProvider'
import { humanCase } from './utils'
import ResourceShow from './resourceData/ResourceShow'
import '../styles.css'

const App = ({ graph }: { graph: any }) => {
  const { _id, _name, _seed, _detail, _defaultId, _constraints, _list, ...nouns } = graph

  return (
    <Admin title={_name} dashboard={Dashboard} dataProvider={dataProvider} layout={Layout}>
      {Object.entries<Noun<string, any>>(nouns).map(([name, noun]) => {
        console.log('name', name)
        return (
          <Resource
            key={graph + noun}
            name={name}
            list={ResourceList({ graph, noun })}
            show={ResourceShow({graph, noun})}
            recordRepresentation={noun?._name}
          />
        )
      })}
    </Admin>
  )
}

export default App

// import { Admin, EditGuesser, Resource } from 'react-admin'
// import Layout from './components/Layout'
// import { Noun } from '../typings'
// import { SimpleDetail } from './Detail'
// import { SimpleList } from './Lists'
// import Dashboard from './pages/Dashboard'
// import dataProvider from './utils/dataProvider'

// const App = ({ graph }: { graph: any }) => {
//   const { _id, _name, _seed, _detail, _defaultId, _constraints, _list, ...nouns } = graph
//   console.log('Appgraph', graph)

//   return (
//     <Admin title={_name} dashboard={Dashboard} dataProvider={dataProvider} layout={Layout}>
//       {Object.entries<Noun<string, any>>(nouns).map(([name, noun]) => {
//         const List = SimpleList({ graph, noun })
//         const Detail = SimpleDetail({ graph, noun })

//         console.log('noun', noun)
//         return (
//           <Resource
//             key={graph + noun}
//             name={name}
//             recordRepresentation={noun?._name}
//             list={List}
//             edit={EditGuesser}
//             show={Detail}
//           />
//         )
//       })}
//     </Admin>
//   )
// }

// export default App