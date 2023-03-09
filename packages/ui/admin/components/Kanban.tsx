import React, { useCallback, useState } from 'react'

type Status = 'ideas' | 'backlog' | 'in-progress' | 'done'

const boardTypes: Status[] = ['ideas', 'backlog', 'in-progress', 'done']
const cards = [
  {
    id: '1',
    title: 'create a Kanban app with Tailwindcss',
    description: 'This will be a Tailwindcss based Kanban app',
    status: 'ideas',
  },
  {
    id: '2',
    title: 'master React-Admin',
    description: 'Embrace MUI and learn how to use it',
    status: 'backlog',
  },

  {
    id: '3',
    title: 'build a worker in Cloudflare',
    description: 'Build a service in Cloudflare',
    status: 'backlog',
  },

  {
    id: '4',
    title: 'building admin dashboard',
    description: 'React-Admin Tailwindcss Graphdl',
    status: 'in progress',
  },

  {
    id: '5',
    title: 'ate breakfast',
    description: '6 eggs yolks and all',
    status: 'done',
  },
]

type KanbanCard = {
  [x: string]: string
  id: string
  title: string
  description: string
}

interface KanbanColumnProps {
  status: string
  items: KanbanCard[]
  handleDragging: (dragging: boolean) => void
  isDragging: boolean
  handleUpdateList: (id: string, status: Status) => void
}

interface KanbanCardProps {
  data: {
    id: any
    title: string
    description: string
  }
  handleDragging: (dragging: boolean) => void
}

export default function Kanban() {
  const [listItems, setListItems] = useState(cards)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragging = useCallback((dragging: boolean) => setIsDragging(dragging), [])

  const handleUpdateList = useCallback(
    (id: any, status: Status) => {
      let card = listItems.filter((item: { id: any }) => item.id === id)[0]

      if (card && card.status !== status) {
        card.status = status

        setListItems((prev: any[]) => [card!, ...prev.filter((item: { id: any }) => item.id !== id)])
      }
    },
    [listItems, setListItems],
  )

  return (
    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 2xl:grid-cols-4 w-full">
      {boardTypes.map((status, index) => (
        <KanbanColumn
          key={index}
          status={status}
          handleDragging={handleDragging}
          isDragging={isDragging}
          handleUpdateList={handleUpdateList}
          items={listItems}
        />
      ))}
    </div>
  )
}

function KanbanColumn({ status, items, handleDragging, isDragging, handleUpdateList }: KanbanColumnProps) {
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const id = e.dataTransfer.getData('text')
      handleUpdateList(id, status as Status)
      handleDragging(false)
    },
    [status, handleDragging, handleUpdateList],
  )

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`${
        isDragging ? 'border border-dashed' : ''
      } flex flex-col min-w-80 h-full mx-1 bg-black border border-gray-700 rounded-[4px] col-span-1`}
    >
      <div className="flex items-center justify-between p-3.5 font-semibold text-[16px] text-white bg-black rounded-[4px]">
        <h1 className="flex items-center gap-x-4 whitespace-nowrap capitalize">
          {status}{' '}
          <span className="text-xs bg-[#161b22]  text-[#8b949e] flex items-center justify-center rounded-full h-5 mb-px w-full p-2">
            {items.length}
          </span>
        </h1>
      </div>
      <div className="flex flex-col flex-1 p-2 space-y-2 rounded-b-md">
        {items &&
          items?.map(
            (item) =>
              status === item.status && <KanbanCard key={item.id} data={item} handleDragging={handleDragging} />,
          )}
      </div>
    </div>
  )
}

function KanbanCard({ data, handleDragging }: KanbanCardProps) {
  const handleDragEnd = useCallback(() => handleDragging(false), [handleDragging])
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData('text', `${data.id}`)
      handleDragging(true)
    },
    [data.id, handleDragging],
  )

  return (
    <div
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      draggable
      id={data.id}
      className="flex flex-col w-full h-full p-2 bg-[#161b22] rounded-md shadow-md"
    >
      <div className="flex flex-col flex-1 mb-4 m-1.5">
        <div className="text-[12px] font-medium text-[#8b949e] mb-2.5 flex items-center leading-[110%]">
          <GithubCircleIcon variant="mr-1 text-green-500" />
          {data.title}
        </div>
        <div className="text-[15px] leading-[110%] text-white">{data.description}</div>
      </div>
    </div>
  )
}

const GithubCircleIcon = ({ variant }: { variant: string }) => {
  return (
    <svg
      aria-hidden="false"
      focusable="false"
      aria-label="Open issue"
      role="img"
      className={variant}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
      style={{ display: 'inline-block', userSelect: 'none', verticalAlign: 'text-bottom', overflow: 'visible' }}
    >
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
    </svg>
  )
}
