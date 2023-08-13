import { faRedo, faTimes } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { Role } from 'generated/types'
import { AuthUserView, MemberFullView } from 'generated/views'
import { Roles } from 'utils/role'
import Button from 'components/atoms/Button'
import Avatar from 'components/molecules/Avatar'
import DropdownSelect from 'components/molecules/DropdownSelect'
import './FormMembersUpdate.scoped.css'

export interface EditableMemberProfile extends MemberFullView {
  deleted: boolean
  editable: boolean // Whether the member profile can be edited by the current user
}

type Props = {
  members: MemberFullView[]
  me: AuthUserView | null
  events: {
    onSubmit: (members: EditableMemberProfile[], cb: () => void) => any
  }
}

const FormMembersUpdate: React.FC<Props> = ({
  members: members_,
  me,
  events
}) => {
  const [submitting, setSubmitting] = useState(false)
  const meMember = useMemo(
    () => members_.find((m) => m.user.id === me?.id),
    [members_]
  )
  const [members, setMembers] = useState<EditableMemberProfile[]>([])
  const [canUpdateSharings, setCanUpdateSharings] = useState(false)

  useEffect(() => {
    const canUpdateSharings = meMember?.role === Role.Owner
    setCanUpdateSharings(canUpdateSharings)
    setMembers(
      members_.map((member) => {
        return {
          ...member,
          // Only owners can edit others' role, and owner cannot edit themselves.
          editable: canUpdateSharings && member.role !== Role.Owner,
          deleted: false
        }
      })
    )
  }, [members_])
  useEffect(() => {
    return () => {
      // Clean-up
      setSubmitting(false)
      setMembers([])
      setCanUpdateSharings(false)
    }
  }, [])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    events.onSubmit(members, () => setSubmitting(false))
  }

  function onToggleDeleteMemberProfile(memberId: string) {
    setMembers(
      members.map((member) =>
        member.id === memberId
          ? { ...member, deleted: !member.deleted }
          : member
      )
    )
  }

  function onChangeMemberRole(memberId: string, role: Role) {
    setMembers(
      members.map((member) =>
        member.id === memberId ? { ...member, role } : member
      )
    )
  }

  function orderedRoleItems(currRole?: Role) {
    // Do not need to consider Owner role
    const roleItems = Roles.filter((role) => role !== Role.Owner).map(
      (role) => {
        return <div key={role}>{role}</div>
      }
    )

    if (!currRole) {
      return roleItems
    }

    roleItems.sort((a, b) => {
      const aKey = a.key as Role
      const bKey = b.key as Role
      if (aKey === currRole) {
        return -1
      }
      if (bKey === currRole) {
        return 1
      }
      return 0
    })
    return roleItems
  }

  return (
    <form className="control" onSubmit={onSubmit}>
      <p className="has-text-weight-bold">
        {canUpdateSharings ? 'Update board members' : 'Board members'}
      </p>
      <div className="members-container">
        {members.map((member) => (
          <div
            key={member.id}
            className={clsx({
              'form-fields': true,
              'deleted-field': member.deleted
            })}
          >
            <div className="member-info">
              <Avatar name={member.user.name} />
              <span>
                {member.user.name} ({member.user.email})
              </span>
            </div>
            {member.editable ? (
              <DropdownSelect
                items={orderedRoleItems(member.role)}
                events={{
                  onSelect: (key) => onChangeMemberRole(member.id, key as Role)
                }}
              />
            ) : (
              <span>{member.role}</span>
            )}
            {member.editable && (
              <Button
                className="is-danger is-inverted"
                icon={member.deleted ? faRedo : faTimes}
                events={{
                  onClick: () => onToggleDeleteMemberProfile(member.id)
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="control form-control">
        <Button
          type="submit"
          className={clsx({
            'is-link': true,
            'is-loading': submitting
          })}
          attr={{ disabled: submitting || !canUpdateSharings }}
          label="Save Changes"
        />
      </div>
    </form>
  )
}

export default FormMembersUpdate
