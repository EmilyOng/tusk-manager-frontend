import { StateAPI } from 'api/state'
import { TagAPI } from 'api/tag'
import { TaskAPI } from 'api/task'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { StateMinimalView, TagMinimalView, Task } from 'generated/views'
import { selectMe } from 'store/me'
import { selectMeMember } from 'store/members'
import { canEdit } from 'utils/role'
import { useBoardStates, useBoardTags, useBoardTasks } from 'composables/board'
import { NotificationType, useNotification } from 'composables/notification'
import LoadingBar from 'components/molecules/LoadingBar'
import { CreateTagForm } from 'components/molecules/TagsSelect'
import { Form as CreateTaskForm } from 'components/organisms/FormTaskCreate'
import { Form as EditTaskForm } from 'components/organisms/FormTaskEdit'
import ListView from 'components/organisms/ListView'
import ListViewPlaceholder from 'components/organisms/ListViewPlaceholder'
import './TaskDashboard.scoped.css'

function TaskDashboard() {
  const location = useLocation()
  const { user: me } = useSelector(selectMe)
  const [boardId, setBoardId] = useState<string | null>(null)
  const { loading: tasksLoading, tasks, updateTasks } = useBoardTasks(boardId)
  const { loading: tagsLoading, tags, updateTags } = useBoardTags(boardId)
  const {
    loading: statesLoading,
    states,
    updateStates
  } = useBoardStates(boardId)

  const numStates = useMemo(() => states.length, [states])

  useEffect(() => {
    const id = location.pathname.replace('/', '')
    if (!id) {
      return
    }
    setBoardId(id)
  }, [location])

  const meMember = useSelector(selectMeMember)

  const taskAPI = new TaskAPI()
  const tagAPI = new TagAPI()
  const stateAPI = new StateAPI()

  function createTask(form: CreateTaskForm, cb: () => void) {
    taskAPI
      .createTask({
        ...form,
        boardId: boardId!,
        stateId: form.stateId!,
        userId: me!.id
      })
      .then((res) => {
        updateTasks([...tasks, res.data])
        useNotification({
          type: NotificationType.Success,
          message: res.message
        })
      })
      .catch((e) => {
        useNotification({
          type: NotificationType.Error,
          message: e.message
        })
      })
      .finally(() => cb())
  }

  function deleteTask(taskId: string, cb: () => void) {
    taskAPI
      .deleteTask({ id: taskId })
      .then((res) => {
        updateTasks(tasks.filter((task) => task.id !== taskId))
        useNotification({
          type: NotificationType.Success,
          message: res.message
        })
      })
      .catch((e) => {
        useNotification({
          type: NotificationType.Error,
          message: e.message
        })
      })
      .finally(() => cb())
  }

  function editTask(form: EditTaskForm, cb: () => void) {
    taskAPI
      .editTask({ ...form, boardId: boardId!, userId: me!.id })
      .then((res) => {
        updateTasks(tasks.map((t) => (t.id === res.data.id ? res.data : t)))
        useNotification({
          type: NotificationType.Success,
          message: res.message
        })
      })
      .catch((e) => {
        useNotification({
          type: NotificationType.Error,
          message: e.message
        })
      })
      .finally(() => cb())
  }

  function createTag(form: CreateTagForm, cb: (tag: TagMinimalView) => void) {
    tagAPI
      .createTag({
        ...form,
        boardId: boardId!
      })
      .then((res) => {
        updateTags([...tags, res.data])
        useNotification({
          type: NotificationType.Success,
          message: res.message
        })
        cb(res.data)
      })
      .catch((e) => {
        useNotification({
          type: NotificationType.Error,
          message: e.message
        })
      })
  }

  function createState(cb: () => void) {
    stateAPI
      .createState({
        name: 'Untitled',
        boardId: boardId!,
        currentPosition: numStates
      })
      .then((res) => {
        updateStates([...states, res.data])
        useNotification({
          type: NotificationType.Success,
          message: res.message
        })
      })
      .catch((e) => {
        useNotification({
          type: NotificationType.Error,
          message: e.message
        })
      })
      .finally(() => cb())
  }

  function useDragTask() {
    const task = useRef<Task | null>(null)

    function onDragTask(t: Task) {
      task.current = t
    }

    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
      e.preventDefault()
    }

    function onDropTask(
      e: React.DragEvent<HTMLDivElement>,
      state: StateMinimalView
    ) {
      e.preventDefault()
      if (!task.current) {
        return
      }

      const initialTask = { ...task.current }
      // Update the task first so the action is non-blocking
      updateTasks(
        tasks.map((t) =>
          t.id === task.current?.id ? { ...task.current, stateId: state.id } : t
        )
      )

      taskAPI
        .editTask({
          ...task.current,
          stateId: state.id,
          boardId: boardId!,
          userId: me!.id
        })
        .then((res) => {
          useNotification({
            type: NotificationType.Success,
            message: res.message
          })
        })
        .catch((e) => {
          // Rollback
          updateTasks(
            tasks.map((t) => (t.id === task.current?.id ? initialTask : t))
          )
          useNotification({
            type: NotificationType.Error,
            message: e.message
          })
        })
        .finally(() => (task.current = null))
    }

    return {
      onDragTask,
      onDragOver,
      onDropTask
    }
  }

  function editState(newState: StateMinimalView, cb: () => void) {
    stateAPI
      .editState({ ...newState, boardId: boardId! })
      .then((res) => {
        updateStates(
          states.map((state) => (state.id === res.data.id ? res.data : state))
        )
        useNotification({
          type: NotificationType.Success,
          message: res.message
        })
      })
      .catch((e) => {
        useNotification({
          type: NotificationType.Error,
          message: e.message
        })
      })
      .finally(() => cb())
  }

  function deleteState(stateId: string, cb: () => void) {
    stateAPI
      .deleteState({ id: stateId })
      .then((res) => {
        updateStates(states.filter((state) => state.id !== stateId))
        useNotification({
          type: NotificationType.Success,
          message: res.message
        })
      })
      .catch((e) => {
        useNotification({
          type: NotificationType.Error,
          message: e.message
        })
      })
      .finally(() => cb())
  }

  function onMoveStateLeft(state: StateMinimalView, cb: () => void) {
    for (let i = 0; i < states.length; i++) {
      const s = states[i]
      if (s.id === state.id) {
        const prev = {
          ...states[i - 1],
          currentPosition: states[i - 1].currentPosition + 1,
          boardId: boardId!
        }
        const curr = {
          ...state,
          currentPosition: state.currentPosition - 1,
          boardId: boardId!
        }
        Promise.all([stateAPI.editState(prev), stateAPI.editState(curr)])
          .then(() => {
            const copied = states.map((s) =>
              s.id === prev.id ? prev : s.id === curr.id ? curr : s
            )
            copied.sort((a, b) => a.currentPosition - b.currentPosition)
            updateStates(copied)
          })
          .finally(() => cb())
        break
      }
    }
  }

  function onMoveStateRight(state: StateMinimalView, cb: () => void) {
    for (let i = 0; i < states.length; i++) {
      const s = states[i]
      if (s.id === state.id) {
        const prev = {
          ...states[i + 1],
          currentPosition: states[i + 1].currentPosition - 1,
          boardId: boardId!
        }
        const curr = {
          ...state,
          currentPosition: state.currentPosition + 1,
          boardId: boardId!
        }
        Promise.all([stateAPI.editState(prev), stateAPI.editState(curr)])
          .then(() => {
            const copied = states.map((s) =>
              s.id === prev.id ? prev : s.id === curr.id ? curr : s
            )
            copied.sort((a, b) => a.currentPosition - b.currentPosition)
            updateStates(copied)
          })
          .finally(() => cb())
        break
      }
    }
  }

  const { onDragTask, onDragOver, onDropTask } = useDragTask()

  return (
    <div className="task-dashboard">
      <div className="card-boards">
        {statesLoading ? (
          <LoadingBar />
        ) : (
          states.map((state) => {
            return (
              <ListView
                key={state.id}
                tasks={tasks.filter((task) => task.stateId === state.id)}
                states={states}
                loading={tasksLoading || tagsLoading}
                tags={tags}
                state={state}
                meMember={meMember}
                position={{
                  current: state.currentPosition,
                  limit: numStates - 1
                }}
                events={{
                  onEditTask: editTask,
                  onCreateTask: createTask,
                  onCreateTag: createTag,
                  onDeleteTask: deleteTask,
                  onDragTask,
                  onDragOver,
                  onDropTask,
                  onEditState: editState,
                  onDeleteState: deleteState,
                  onMoveStateLeft,
                  onMoveStateRight
                }}
              />
            )
          })
        )}
        {canEdit(meMember?.role) && (
          <ListViewPlaceholder events={{ createState }} />
        )}
      </div>
    </div>
  )
}

export default TaskDashboard
