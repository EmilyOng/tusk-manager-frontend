import { faEdit } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { StateMinimalView, TagMinimalView, Task } from 'generated/views'
import Button from 'components/atoms/Button'
import DatePicker from 'components/molecules/DatePicker'
import DropdownSelect from 'components/molecules/DropdownSelect'
import InputField from 'components/molecules/InputField'
import TagsSelect, { CreateTagForm } from 'components/molecules/TagsSelect'
import TextArea from 'components/molecules/TextArea'
import './FormTaskEdit.scoped.css'

export type Form = {
  id: string
  name: string
  description: string
  dueAt?: Date
  stateId: string
  tags: TagMinimalView[]
}

type Props = {
  task: Task
  tags: TagMinimalView[]
  states: StateMinimalView[]
  events: {
    onSubmit: (form: Form, cb: () => void) => any
    onCancel: () => any
    onCreateTag: (form: CreateTagForm, cb: (tag: TagMinimalView) => void) => any
  }
}

const FormTaskEdit: React.FC<Props> = ({ task, states, tags, events }) => {
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<Form>({ ...task, stateId: task.stateId! })

  const stateItems = states.map((state) => (
    <div key={state.id}>{state.name}</div>
  ))

  useEffect(() => {
    return () => {
      // Clean-up
      setSubmitting(false)
      setForm({ ...task, stateId: task.stateId! })
    }
  }, [])

  function onSubmit_(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    events.onSubmit(form, () => setSubmitting(false))
  }

  function onInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function updateTags(tag: TagMinimalView) {
    const existing = form.tags.find((t) => t.id === tag.id)
    if (existing) {
      setForm({
        ...form,
        // Remove the tag
        tags: form.tags.filter((t) => t.id !== tag.id)
      })
    } else {
      // Add the tag
      setForm({
        ...form,
        tags: [...form.tags, tag]
      })
    }
  }

  function createTag(form: CreateTagForm, cb: (tag: TagMinimalView) => void) {
    setSubmitting(true)
    events.onCreateTag(form, (tag: TagMinimalView) => {
      setSubmitting(false)
      cb(tag)
    })
  }

  return (
    <form className="control" onSubmit={onSubmit_}>
      <InputField
        name="name"
        label="Name"
        type="text"
        icon={faEdit}
        value={form.name}
        events={{ onChange: onInputChange }}
      />
      <TextArea
        name="description"
        label="Description"
        required={false}
        value={form.description}
        events={{ onChange: onInputChange }}
      />
      <div className="field">
        <label className="label">Due Date</label>
        <DatePicker
          date={form.dueAt}
          events={{
            onChange: (dueAt: Date) => setForm({ ...form, dueAt })
          }}
        />
      </div>
      <div className="field">
        <label className="label">Tags</label>
        <TagsSelect
          tags={tags.map((t) => {
            return { ...t, selected: form.tags.map((t) => t.id).includes(t.id) }
          })}
          events={{
            onSelect: (tag: TagMinimalView) => updateTags(tag),
            onCreateTag: createTag
          }}
        />
      </div>
      <div className="field">
        <label className="label">State</label>
        <DropdownSelect
          initial={form.stateId.toString()}
          items={stateItems}
          events={{
            onSelect: (key) => setForm({ ...form, stateId: key as string })
          }}
        />
      </div>
      <div className="control form-control">
        <Button
          type="button"
          className="is-light"
          label="Cancel"
          events={{ onClick: events.onCancel }}
        />
        <Button
          type="submit"
          className={clsx({
            'is-link': true,
            'is-loading': submitting
          })}
          attr={{ disabled: submitting }}
          label="Save Changes"
        />
      </div>
    </form>
  )
}

export default FormTaskEdit
