import React from 'react'
import { BoardMinimalView } from 'generated/views'
import FormBoard, { Form as Form_ } from 'components/molecules/FormBoard'

export type Form = Form_

type Props = {
  board: BoardMinimalView
  events: {
    onSubmit: (form: Form, cb: () => void) => any
    onCancel: () => any
  }
}

const FormBoardEdit: React.FC<Props> = ({ board, events }) => {
  return (
    <FormBoard
      initial={{ id: board.id, name: board.name, color: board.color }}
      events={events}
      actionLabels={{ ok: 'Edit' }}
    />
  )
}

export default FormBoardEdit
