import dynamic from 'next/dynamic'

const App = dynamic(() => import('@graphdl/ui/admin/App'), { ssr: false })

const Home = () => {
  return <App/>
}

export default Home