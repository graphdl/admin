import dynamic from 'next/dynamic'
import yaml from 'yaml'
import fs from 'fs'
import sass from '../saas.json'

// @ts-ignore
const App = dynamic(() => import('@graphdl/ui/admin/App'), { ssr: false })

const Home = ({ graph }: { graph: any }) => {
  return <App graph={graph} />
}

export async function getStaticProps() {
  const graph = yaml.parse(fs.readFileSync('graphdl.yaml', 'utf8'))

  console.log('Im running on the server')
  return { props: { graph } }
}

export default Home
