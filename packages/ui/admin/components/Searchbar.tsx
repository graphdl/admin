import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Northwind from '../../examples/northwind.json'

export default function Searchbar() {
  const [search, setSearch] = React.useState<string>('')


  const { pathname } = useLocation()
  const activeResource = pathname?.split('/')[1]

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  useEffect(() => {
    if (search) {
      handleSearch(search)
    } else {
      // clearSearch()
    }
  })

  type Resource<K extends keyof any, T> = {
    [P in K]: T[]
  }

  const northwind: Resource<string, any> = Northwind
  const source = northwind[activeResource]

  function handleSearch(input: string) {
    const filtered = source.filter((item: any) => {
      return Object.entries(item).some((entry: any) => {
        return entry[1]?.toString().toLowerCase().includes(input.toLowerCase())
      })
    })
    if (filtered.length) {
      console.log('filtered list', filtered)
    }
  }

  return (
    <div className="flex flex-1 pl-4 ">
      <form className="flex w-full lg:ml-0" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
            placeholder="Search"
            type="search"
            name="search"
            value={search}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  )
}
