import { TagAPI } from 'api/tag'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TagMinimalView } from 'generated/views'
import { selectBoards } from 'store/boards'
import { selectMeMember } from 'store/members'
import { canEdit } from 'utils/role'
import { useBoardTags } from 'composables/board'
import { NotificationType, useNotification } from 'composables/notification'
import LoadingBar from 'components/molecules/LoadingBar'
import FormTagCreate, {
  Form as TagCreateForm
} from 'components/organisms/FormTagCreate'
import FormTagEdit, { DeletableTag } from 'components/organisms/FormTagEdit'
import './BoardTagsDashboard.scoped.css'

function BoardTagsDashboard() {
  const navigate = useNavigate()
  const { currentBoardId: boardId } = useSelector(selectBoards)
  const { loading, tags, updateTags, refetch } = useBoardTags(boardId)
  const tagsAPI = new TagAPI()

  const [meCanEdit, setMeCanEdit] = useState(false)
  const meMember = useSelector(selectMeMember)

  useEffect(() => {
    setMeCanEdit(canEdit(meMember?.role))
  }, [meMember])

  function onUpdateTags(tags: DeletableTag[], cb: () => void) {
    Promise.all(
      tags.map((tag) =>
        tag.deleted
          ? tagsAPI.deleteTag({ id: tag.id })
          : tagsAPI.editTag({ ...tag, boardId: boardId! })
      )
    )
      .then(() => {
        updateTags(
          tags.reduce((acc, tag) => {
            if (tag.deleted) {
              return acc
            }
            acc.push({
              id: tag.id,
              name: tag.name,
              color: tag.color,
              boardId: tag.boardId
            })
            return acc
          }, [] as TagMinimalView[])
        )
        useNotification({
          type: NotificationType.Success,
          message: 'Successfully updated the tags!'
        })
      })
      .catch((e) => {
        refetch()
        useNotification({
          type: NotificationType.Error,
          message: e.message
        })
      })
      .finally(() => {
        cb()
      })
  }

  function onCreateTag(form: TagCreateForm, cb: () => void) {
    tagsAPI
      .createTag({ ...form, boardId: boardId! })
      .then((res) => {
        updateTags([...tags, res.data])
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

  return loading ? (
    <LoadingBar />
  ) : (
    <div className="board-tags-dashboard box">
      <div className="board-tags-header">
        <h2 className="subtitle">Manage Tags</h2>
      </div>
      {meCanEdit && <FormTagCreate events={{ onSubmit: onCreateTag }} />}
      <hr />
      <FormTagEdit
        tags={tags}
        canEdit={meCanEdit}
        events={{ onCancel: () => navigate(`/${boardId}`), onUpdateTags }}
      />
    </div>
  )
}

export default BoardTagsDashboard
