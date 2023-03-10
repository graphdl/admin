import { useCallback, useState } from 'react'
import { boardAtom, useAtom } from '../../store/jotai'

export type Status = 'ideas' | 'backlog' | 'in-progress' | 'done'

interface DragAndDropProps {
  isDragging: boolean
  listItems: any
  handleDragging: (dragging: boolean) => void
  handleUpdateList: (id: string, status: Status) => void
}

export default function useDragAndDrop(): DragAndDropProps {
  const [isDragging, setIsDragging] = useState(false)
  const [listItems, setListItems] = useAtom(boardAtom)

  const handleUpdateList = useCallback(
    (id: any, status: Status) => {
      const card = listItems.find((item: any) => item.id === id)
      if (card && card.status !== status) {
        card.status = status

        setListItems((prev: any) => [card, ...prev.filter((item: any) => item.id !== id)])
      }
    },
    [listItems, setListItems],
  )

  const handleDragging = useCallback((dragging: boolean) => setIsDragging(dragging), [])

  return {
    isDragging,
    listItems,
    handleDragging,
    handleUpdateList,
  }
}

interface DragAndDropOverProps {
  handleDragging: (dragging: boolean) => void
  handleUpdateList: (id: string, status: Status) => void
  status: Status
}

export function useDropAndDragOver({ handleDragging, handleUpdateList, status }: DragAndDropOverProps) {
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      const id = e.dataTransfer.getData('text')

      handleUpdateList(id, status)
      handleDragging(false)
    },
    [handleDragging, handleUpdateList, status],
  )

  return {
    handleDragOver,
    handleDrop,
  }
}

interface DragStartEndProps {
  handleDragging: (dragging: boolean) => void
  id: string
}

export function useDragStartAndEnd({ handleDragging, id }: DragStartEndProps) {
  const handleDragEnd = useCallback(() => handleDragging(false), [handleDragging])

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLLIElement>) => {
      e.dataTransfer.setData('text', `${id}`)
      handleDragging(true)
    },
    [id, handleDragging],
  )

  return {
    handleDragEnd,
    handleDragStart,
  }
}
