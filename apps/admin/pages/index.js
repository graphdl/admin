import dynamic from 'next/dynamic'
import yaml from 'yaml'
import fs from 'fs'
import sass from '../saas.json'

// @ts-ignore
const AdminApp = dynamic(() => import('@graphdl/ui/admin/AdminApp'), { ssr: false })

const Home = ({ graph }) => {
  return <AdminApp graph={graph} />
}

export async function getStaticProps() {
  const graph = yaml.parse(fs.readFileSync('graphdl.yaml', 'utf8'))

  console.log('Im running on the server')
  return { props: { graph: sass } }
}

export default Home
