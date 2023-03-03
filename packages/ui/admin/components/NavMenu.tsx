import { useResourceDefinitions } from 'react-admin'
import { useLocation } from 'react-router-dom'
import { classNames } from '../utils/classNames'
import { humanCase } from '../utils/humanCase'

export default function NavMenu() {
  const resources = useResourceDefinitions()
  const { pathname } = useLocation()

  return (
    <div className="flex flex-1 flex-col overflow-y-auto mt-4">
      <nav className="flex-1 space-y-1 px-2 py-4">
        {Object.values(resources).map((resource) => (
          <a
            key={resource.name}
            href={'#/' + resource.name}
            className={classNames(
              pathname?.split('/')[1] == resource.name
                ? 'bg-gray-900 text-white font-semibold'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white font-medium',
              'group flex items-center px-2 py-2 text-sm tracking-wide  rounded-[4px] cursor-pointer',
            )}
          >
            <div
              className={classNames(
                resource ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                'mr-4 flex-shrink-0 h-6 w-6 ',
              )}
              aria-hidden="true"
            />
            {humanCase(resource.name)}
          </a>
        ))}
      </nav>
    </div>
  )
}
