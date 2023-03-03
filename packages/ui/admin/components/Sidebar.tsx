/* eslint-disable @next/next/no-img-element */
import { Link } from 'react-admin'

import NavMenu from './NavMenu'

export default function Sidebar({title}: {title?: string}) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col border-r border-gray-900">
      <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
        <Link to="/">
          <div className="flex h-16 flex-shrink-0 pl-8 items-center bg-gray-900 px-4 space-x-1">
            <span className='h-[15px] w-[15px] bg-white rounded-[3px]' /><span className='h-[15px] w-[15px] bg-white rounded-full' />
            <span className="text-lg text-white font-medium tracking-wide leading-[110%]">{title}</span>
          </div>
        </Link>
        <NavMenu />
      </div>
    </div>
  )
}
