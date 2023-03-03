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

  const toggleSidebar = useCallback(() => setSidebarOpen(!sidebarOpen), [sidebarOpen])

  return (
    <>
      <div>
        <AnimatePresence>
          {sidebarOpen && <MobileSidebar sidebarOpen={sidebarOpen} onClose={toggleSidebar} />}
        </AnimatePresence>

        <Sidebar />
        <div className="flex flex-col lg:pl-[250px] min-h-screen bg-[#f6f9fc]">
          <Navbar toggleSidebar={toggleSidebar} />

          <main className="flex-1">
            <div className="pt-6">
              <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">{activeResource}</h1>
              </div>
              <div className="w-full px-4 sm:px-6 lg:px-8 mt-[-3em]">
                {props.children}
                <ReactQueryDevtools />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
