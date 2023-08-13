import {
  faArrowLeft,
  faArrowRight,
  faPlus,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { compareAsc } from 'date-fns'
import React, { createRef, useEffect, useState } from 'react'
import {
  MemberFullView,
  StateMinimalView,
  TagMinimalView,
  Task
} from 'generated/views'
import { canEdit } from 'utils/role'
import Button from 'components/atoms/Button'
import CardTask from 'components/molecules/CardTask'
import FilterReverse from 'components/molecules/FilterReverse'
import FilterSort, { TaskSortBy } from 'components/molecules/FilterSort'
import ListViewHeader from 'components/molecules/ListViewHeader'
import LoadingBar from 'components/molecules/LoadingBar'
import ModalCard from 'components/molecules/ModalCard'
import { CreateTagForm } from 'components/molecules/TagsSelect'
import FormTaskCreate, { Form as CreateTaskForm } from '../FormTaskCreate'
import FormTaskEdit, { Form as EditTaskForm } from '../FormTaskEdit'
import StaticViewTask from '../StaticViewTask'
import './ListView.scoped.css'

type Props = {
  tasks: Task[]
  tags: TagMinimalView[]
  states: StateMinimalView[]
  state: StateMinimalView
  loading: boolean
  position: {
    current: number
    limit: number
  }
  meMember: MemberFullView | null
  events: {
    onEditTask: (form: EditTaskForm, cb: () => void) => void
    onCreateTask: (form: CreateTaskForm, cb: () => void) => void
    onDeleteTask: (taskId: string, cb: () => void) => void
    onDragTask: (task: Task) => void
    onCreateTag: (form: CreateTagForm, cb: (tag: TagMinimalView) => void) => any
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
    onDropTask: (
      e: React.DragEvent<HTMLDivElement>,
      state: StateMinimalView
    ) => void
    onEditState: (newState: StateMinimalView, cb: () => void) => void
    onDeleteState: (stateId: string, cb: () => void) => void
    onMoveStateLeft: (state: StateMinimalView, cb: () => void) => void
    onMoveStateRight: (state: StateMinimalView, cb: () => void) => void
  }
}

enum TaskSortDirection {
  Ascending = 'Ascending',
  Descending = 'Descending'
}

type TaskSort = {
  sortBy: TaskSortBy
  reversed: TaskSortDirection
}

function useTaskCreateModal() {
  const [visible, setVisible] = useState(false)
  function openCard() {
    setVisible(true)
  }
  function closeCard() {
    setVisible(false)
  }
  return {
    visible,
    openCard,
    closeCard
  }
}

function useTaskEditModal() {
  const [visible, setVisible] = useState(false)
  const [task, setTask] = useState<Task>()
  function openCard(task: Task) {
    setTask(task)
    setVisible(true)
  }
  function closeCard() {
    setTask(undefined)
    setVisible(false)
  }
  return {
    task,
    visible,
    openCard,
    closeCard
  }
}

function useStateDeleteModal() {
  const [state, setState] = useState<StateMinimalView>()
  const [visible, setVisible] = useState(false)
  function openCard(state: StateMinimalView) {
    setState(state)
    setVisible(true)
  }
  function closeCard() {
    setState(undefined)
    setVisible(false)
  }
  return {
    state,
    visible,
    openCard,
    closeCard
  }
}

const ListView: React.FC<Props> = ({
  tasks: tasks_,
  tags,
  states,
  state,
  position,
  meMember,
  loading,
  events
}) => {
  const listViewWrapper = createRef<HTMLDivElement>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentSort, setCurrentSort] = useState<TaskSort>({
    sortBy: TaskSortBy.Name,
    reversed: TaskSortDirection.Ascending
  })
  const [meCanEdit, setMeCanEdit] = useState(false)

  useEffect(() => {
    setMeCanEdit(canEdit(meMember?.role))
    return () => {
      setMeCanEdit(false)
    }
  }, [meMember])

  useEffect(() => {
    // Sorts in ascending order
    setTasks([...sortTasks(tasks_, currentSort.sortBy)])
    if (currentSort.reversed === TaskSortDirection.Descending) {
      setTasks([...reverseTasks(tasks_)])
    }
    return () => {
      setTasks([])
    }
  }, [tasks_])
  // Handles task creation
  const {
    visible: isTaskCreating,
    openCard: openTaskCreateCard,
    closeCard: closeTaskCreateCard
  } = useTaskCreateModal()

  function createTask(form: CreateTaskForm, cb: () => void) {
    events.onCreateTask(form, () => {
      cb()
      closeTaskCreateCard()
    })
  }

  // Handles task edit
  const {
    task: openedTaskEdit,
    visible: isTaskEditing,
    openCard: openTaskEditCard,
    closeCard: closeTaskEditCard
  } = useTaskEditModal()

  function editTask(form: EditTaskForm, cb: () => void) {
    events.onEditTask(form, () => {
      cb()
      closeTaskEditCard()
    })
  }

  const [showDropzone, setShowDropzone] = useState(false)

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    events.onDragOver(e)
    e.stopPropagation()
    setShowDropzone(true)
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>, state: StateMinimalView) {
    events.onDropTask(e, state)
    e.stopPropagation()
    setShowDropzone(false)
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    const rect = listViewWrapper.current?.getBoundingClientRect()
    if (!rect) {
      return
    }
    if (
      e.clientY < rect.top ||
      e.clientY > rect.bottom ||
      e.clientX < rect.left ||
      e.clientX > rect.right
    ) {
      setShowDropzone(false)
    }
  }

  function sortTasks(tasks: Task[], sortBy: TaskSortBy) {
    return tasks.sort((a, b) => {
      switch (sortBy) {
        case TaskSortBy.DueDate:
          return !a.dueAt ? 1 : !b.dueAt ? -1 : compareAsc(a.dueAt, b.dueAt)
        case TaskSortBy.Name:
          const a_ = a.name.toLowerCase()
          const b_ = b.name.toLowerCase()
          return a_ < b_ ? -1 : a_ > b_ ? 1 : 0
      }
    })
  }

  function reverseTasks(tasks: Task[]) {
    return tasks.reverse()
  }

  function onFilterSort(sortBy: TaskSortBy) {
    setCurrentSort({ ...currentSort, sortBy })
    const sortedTasks = sortTasks(tasks, sortBy)
    setTasks(
      currentSort.reversed === TaskSortDirection.Ascending
        ? [...sortedTasks]
        : [...reverseTasks(sortedTasks)]
    )
  }

  function onFilterReverse() {
    setCurrentSort({
      ...currentSort,
      reversed:
        currentSort.reversed === TaskSortDirection.Ascending
          ? TaskSortDirection.Descending
          : TaskSortDirection.Ascending
    })
    setTasks([...reverseTasks(tasks)])
  }

  // Handles state edit/delete
  const {
    state: openedStateDelete,
    visible: isStateDeleting,
    openCard: openStateDeleteCard,
    closeCard: closeStateDeleteCard
  } = useStateDeleteModal()
  const [deletingState, setDeletingState] = useState(false)
  // 1: move right, -1: move left
  const [movingState, setMovingState] = useState<1 | -1 | null>(null)

  function onDeleteState(stateId: string) {
    setDeletingState(true)
    events.onDeleteState(stateId, () => {
      closeStateDeleteCard()
      setDeletingState(false)
    })
  }

  return (
    <div
      className="list-view"
      ref={listViewWrapper}
      onDragOver={onDragOver}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => onDrop(e, state)}
      onDragLeave={onDragLeave}
    >
      {openedStateDelete && (
        <ModalCard
          visible={isStateDeleting}
          title="Delete state"
          events={{ onClose: closeStateDeleteCard }}
        >
          <div>
            Are you sure you want to delete &quot;{openedStateDelete.name}
            &quot;?
          </div>
          <div>This action is irreversible.</div>
          <div className="form-control">
            <Button
              type="button"
              className="is-light"
              label="Cancel"
              events={{ onClick: () => closeStateDeleteCard() }}
            />
            <Button
              type="submit"
              className={clsx({
                'is-danger': true,
                'is-loading': deletingState
              })}
              attr={{ disabled: deletingState }}
              label="Delete"
              events={{ onClick: () => onDeleteState(openedStateDelete.id) }}
            />
          </div>
        </ModalCard>
      )}
      <ModalCard
        visible={isTaskCreating}
        title="Create a new task"
        events={{ onClose: closeTaskCreateCard }}
      >
        <FormTaskCreate
          state={state}
          tags={tags}
          states={states}
          events={{
            onSubmit: createTask,
            onCancel: closeTaskCreateCard,
            onCreateTag: events.onCreateTag
          }}
        />
      </ModalCard>
      {openedTaskEdit && (
        <ModalCard
          visible={isTaskEditing}
          title={openedTaskEdit.name}
          events={{ onClose: closeTaskEditCard }}
        >
          {meCanEdit ? (
            <FormTaskEdit
              task={openedTaskEdit}
              states={states}
              tags={tags}
              events={{
                onSubmit: editTask,
                onCancel: closeTaskEditCard,
                onCreateTag: events.onCreateTag
              }}
            />
          ) : (
            <StaticViewTask task={openedTaskEdit} states={states} />
          )}
        </ModalCard>
      )}
      <div className="list-view-header">
        <ListViewHeader
          canEdit={meCanEdit}
          state={state}
          events={{ onEditState: events.onEditState }}
        />
        {meCanEdit && (
          <div className="list-view-actions">
            {position.current > 0 && (
              <Button
                icon={faArrowLeft}
                className={clsx({
                  'is-loading': movingState === -1
                })}
                events={{
                  onClick: () => {
                    setMovingState(-1)
                    events.onMoveStateLeft(state, () => setMovingState(null))
                  }
                }}
              />
            )}
            {position.current < position.limit && (
              <Button
                icon={faArrowRight}
                className={clsx({
                  'is-loading': movingState === 1
                })}
                events={{
                  onClick: () => {
                    setMovingState(1)
                    events.onMoveStateRight(state, () => setMovingState(null))
                  }
                }}
              />
            )}
            <Button
              className="is-link is-light"
              icon={faPlus}
              events={{ onClick: openTaskCreateCard }}
            />
            <Button
              className="is-danger is-light"
              icon={faTrash}
              events={{ onClick: () => openStateDeleteCard(state) }}
            />
          </div>
        )}
      </div>
      <div className="list-view-filter">
        <FilterSort events={{ onFilterSort }} />
        <FilterReverse events={{ onFilterReverse }} />
      </div>
      {loading ? (
        <LoadingBar />
      ) : (
        <div className="tasks">
          {tasks.map((task) => (
            <div
              key={task.id}
              draggable={meCanEdit}
              onDragStart={() => events.onDragTask(task)}
            >
              <CardTask
                task={task}
                canEdit={meCanEdit}
                events={{
                  onTaskEditing: openTaskEditCard,
                  onDeleteTask: events.onDeleteTask
                }}
              />
            </div>
          ))}
        </div>
      )}
      {showDropzone && (
        <div className="dropzone-overlay">
          <div className="dropzone-info">Drop tasks here!</div>
        </div>
      )}
    </div>
  )
}

export default ListView
