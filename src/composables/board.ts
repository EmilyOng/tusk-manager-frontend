import { BoardAPI } from 'api/board'
import { useEffect, useState } from 'react'
import {
  BoardMinimalView,
  StateMinimalView,
  TagMinimalView,
  Task
} from 'generated/views'
import { NotificationType, useNotification } from './notification'

export function useBoard(boardId: string | null) {
  const [loading, setLoading] = useState(false)

  const api = new BoardAPI()
  const [board, setBoard] = useState<BoardMinimalView>()

  function updateBoard(board: BoardMinimalView) {
    setBoard(board)
  }

  useEffect(() => {
    if (!boardId) {
      return
    }
    setLoading(true)
    api
      .getBoard({ id: boardId })
      .then((res) => setBoard(res.data))
      .catch((e) => {
        useNotification({
          type: NotificationType.Error,
          message: e.message
        })
      })
      .finally(() => setLoading(false))
    return () => {
      // Clean-up
      setLoading(false)
      setBoard(undefined)
    }
  }, [boardId])

  return {
    loading,
    board,
    updateBoard
  }
}

export function useBoardStates(boardId: string | null) {
  const [loading, setLoading] = useState(false)

  const api = new BoardAPI()
  const [states, setStates] = useState<StateMinimalView[]>([])

  function updateStates(states: StateMinimalView[]) {
    setStates(states)
  }

  useEffect(() => {
    if (!boardId) {
      return
    }
    setStates([])
    setLoading(true)
    api
      .getStates({ boardId })
      .then((res) => setStates(res.data))
      .catch((e) => {
        useNotification({
          type: NotificationType.Error,
          message: e.message
        })
      })
      .finally(() => setLoading(false))
    return () => {
      // Clean-up
      setLoading(false)
      setStates([])
    }
  }, [boardId])

  return {
    loading,
    states,
    updateStates
  }
}

export function useBoardTags(boardId: string | null) {
  const [loading, setLoading] = useState(false)

  const api = new BoardAPI()
  const [tags, setTags] = useState<TagMinimalView[]>([])

  function updateTags(tags: TagMinimalView[]) {
    setTags(tags)
  }

  function refetch() {
    if (!boardId) {
      return
    }
    setTags([])
    setLoading(true)
    api
      .getTags({ boardId })
      .then((res) => setTags(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refetch()
    return () => {
      // Clean-up
      setLoading(false)
      setTags([])
    }
  }, [boardId])

  return {
    loading,
    tags,
    updateTags,
    refetch
  }
}

export function useBoardTasks(boardId: string | null) {
  const [loading, setLoading] = useState(false)

  const api = new BoardAPI()
  const [tasks, setTasks] = useState<Task[]>([])

  function updateTasks(tasks: Task[]) {
    setTasks(tasks)
  }

  useEffect(() => {
    if (!boardId) {
      return
    }
    setTasks([])
    setLoading(true)
    api
      .getTasks({ boardId })
      .then((res) => setTasks(res.data))
      .catch((e) => {
        useNotification({
          type: NotificationType.Error,
          message: e.message
        })
      })
      .finally(() => setLoading(false))
    return () => {
      // Clean-up
      setLoading(false)
      setTasks([])
    }
  }, [boardId])

  return {
    loading,
    tasks,
    updateTasks
  }
}
