/* eslint-disable @next/next/no-img-element */
import { AnimatePresence } from 'framer-motion'
import { useCallback, useState } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useParams } from 'react-router-dom'
import { LayoutProps } from '../../typings'
import { MobileSidebar } from './MobileSidebar'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout(props: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const params = useParams()
  const activeResource = params['*']

  console.log('props', props)

  const toggleSidebar = useCallback(() => setSidebarOpen(!sidebarOpen), [sidebarOpen])

  return (
    <>
      <div>
        <AnimatePresence>
          {sidebarOpen && <MobileSidebar sidebarOpen={sidebarOpen} onClose={toggleSidebar} title={props?.title} />}
        </AnimatePresence>

        <Sidebar  title={props?.title} />
        <div className="flex flex-col lg:pl-64 min-h-screen bg-[#f6f9fc]">
          <Navbar toggleSidebar={toggleSidebar} />

          <main className="flex-1">
            <div className="pt-6 px-4 sm:px-6 lg:px-8">
              <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">{activeResource}</h1>
              </div>
              <div className="w-full mt-[1em] overflow-x-auto rounded-[4px]">{props.children}</div>
            </div>
          </main>
        </div>
      </div>
      <ReactQueryDevtools />
    </>
  )
}
