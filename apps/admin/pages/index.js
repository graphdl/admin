import dynamic from 'next/dynamic'
import dataProvider from '../data/dataProvider'
import graph from '../data/graphdl.json'

const App = dynamic(() => import('@graphdl/ui/admin/App'), { ssr: false })

// const Home = () => App({graph})

const Home = () => {
  return <App graph={graph} />
}

export default Home