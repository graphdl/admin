/* eslint-disable @next/next/no-img-element */
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import NavMenu from './NavMenu'

export function MobileSidebar({ sidebarOpen, onClose }: { sidebarOpen: boolean; onClose: () => void }) {
  return (
    <Dialog
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-40 lg:hidden"
      open={sidebarOpen}
      onClose={onClose}
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />

      <div className="fixed inset-0 z-40 flex">
        <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={onClose}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-shrink-0 items-center px-4 space-x-4">
            <img
              className="h-12 w-auto rounded-full"
              src="https://res.cloudinary.com/dtram9qiy/image/upload/v1677788279/my-upload/svs7o4htlroeazs2yio4.png"
              alt="GraphDL"
            />
            <span className="text-base text-white font-medium font-mono tracking-wide leading-[110%]">
              GraphDL Admin
            </span>
          </div>
          <NavMenu mobile onClose={onClose} />
        </Dialog.Panel>

        <div className="w-14 flex-shrink-0" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </Dialog>
  )
}
