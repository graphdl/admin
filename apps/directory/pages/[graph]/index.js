import CTA from '../../components/CTA'
import FAQ from '../../components/FAQ'
import Features from '../../components/Features'
import FeatureScreenshot from '../../components/FeatureScreenshot'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Hero from '../../components/Hero'
import Pricing from '../../components/Pricing'
import Stats from '../../components/Stats'
import getGraphs from '../../lib/getGraph'


export default function AppIndex() {
  return (
    <main className="scroll-smooth">
      <Header />
      <Hero />
      <Features />
      <FeatureScreenshot />
      <Stats />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}

export async function getStaticPaths() {
  
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const graph = await getGraphs(params?.graph)
  console.log('AppIndex', graph)
  return { props: { graph } }
}
