import dynamic from 'next/dynamic'
import yaml from 'yaml'
import fs from 'fs'

const App = dynamic(() => import('@graphdl/ui/admin/App'), { ssr: false })

const Home = props => {
  return <App {...props} />
}

export async function getStaticProps() {
  const graph = yaml.parse(fs.readFileSync('graphdl.yaml', 'utf8'))
  return { props: { graph } }
}

export default Home