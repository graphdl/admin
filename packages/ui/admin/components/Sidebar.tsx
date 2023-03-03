/* eslint-disable @next/next/no-img-element */
import { Link } from 'react-admin'

import NavMenu from './NavMenu'

export default function Sidebar(props: any) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col border-r border-gray-900">
      <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
        <Link to="/">
          <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4 space-x-4">
            <img
              className="h-10 w-auto rounded-full"
              src="https://res.cloudinary.com/dtram9qiy/image/upload/v1677788279/my-upload/svs7o4htlroeazs2yio4.png"
              alt="GraphDL"
            />
            <span className="text-base text-white font-medium tracking-wide leading-[110%]">
              {props.title}
            </span>
          </div>
        </Link>
        <NavMenu />
      </div>
    </div>
  )
}
