/* Do not change, this code is generated from Golang structs */
import { Color } from './types'
import { Role } from './types'
import { ErrorCode } from './types'

export interface Member {
  id: number
  role: Role
  userId?: number
  boardId?: number
}
export interface State {
  id: number
  name: string
  currentPosition: number
  tasks: Task[]
  boardId?: number
}
export interface Tag {
  id: number
  name: string
  color: Color
  tasks: Task[]
  boardId?: number
}
export interface Task {
  id: number
  name: string
  description: string
  dueAt?: Date
  tags: Tag[]
  userId?: number
  boardId?: number
  stateId?: number
}
export interface Board {
  id: number
  name: string
  color: Color
  tasks: Task[]
  tags: Tag[]
  states: State[]
  boardMembers: Member[]
}
export interface BoardPrimitive {
  id: number
  name: string
  color: Color
}
export interface GetBoardPayload {
  id: number
}
export interface GetBoardResponse {
  error: ErrorCode
  data: BoardPrimitive
}
export interface CreateBoardPayload {
  name: string
  color: Color
  userId: number
}
export interface CreateBoardResponse {
  error: ErrorCode
  data: BoardPrimitive
}
export interface UpdateBoardPayload {
  id: number
  name: string
  color: Color
  userId: number
}
export interface UpdateBoardResponse {
  error: ErrorCode
  data: BoardPrimitive
}
export interface GetBoardTasksPayload {
  boardId: number
}
export interface GetBoardTasksResponse {
  error: ErrorCode
  data: Task[]
}
export interface GetBoardTagsPayload {
  boardId: number
}
export interface TagPrimitive {
  id: number
  name: string
  color: Color
  boardId?: number
}
export interface GetBoardTagsResponse {
  error: ErrorCode
  data: TagPrimitive[]
}
export interface GetBoardMemberProfilesPayload {
  boardId: number
}
export interface Profile {
  id: number
  name: string
  email: string
}
export interface MemberProfile {
  id: number
  role: Role
  profile: Profile
}
export interface GetBoardMemberProfilesResponse {
  error: ErrorCode
  data: MemberProfile[]
}
export interface GetBoardStatesPayload {
  boardId: number
}
export interface StatePrimitive {
  id: number
  name: string
  currentPosition: number
  boardId?: number
}
export interface GetBoardStatesResponse {
  error: ErrorCode
  data: StatePrimitive[]
}
export interface DeleteBoardPayload {
  id: number
}
export interface DeleteBoardResponse {
  error: ErrorCode
}
export interface Response {
  error: ErrorCode
}

export interface MemberPrimitive {
  id: number
  role: Role
  userId?: number
  boardId?: number
}

export interface CreateMemberPayload {
  role: Role
  email: string
  boardId: number
}
export interface CreateMemberResponse {
  error: ErrorCode
  data: MemberProfile
}
export interface UpdateMemberPayload {
  id: number
  role: Role
}
export interface UpdateMemberResponse {
  error: ErrorCode
  data: MemberProfile
}
export interface DeleteMemberPayload {
  id: number
}
export interface DeleteMemberResponse {
  error: ErrorCode
}

export interface CreateStatePayload {
  name: string
  boardId: number
  currentPosition: number
}
export interface CreateStateResponse {
  error: ErrorCode
  data: State
}
export interface UpdateStatePayload {
  id: number
  name: string
  boardId: number
  currentPosition: number
}
export interface UpdateStateResponse {
  error: ErrorCode
  data: StatePrimitive
}
export interface DeleteStatePayload {
  id: number
}
export interface DeleteStateResponse {
  error: ErrorCode
}

export interface CreateTagPayload {
  name: string
  color: Color
  boardId: number
}
export interface CreateTagResponse {
  error: ErrorCode
  data: TagPrimitive
}
export interface UpdateTagPayload {
  id: number
  name: string
  boardId: number
  color: Color
}
export interface UpdateTagResponse {
  error: ErrorCode
  data: TagPrimitive
}
export interface DeleteTagPayload {
  id: number
}
export interface DeleteTagResponse {
  error: ErrorCode
}

export interface TaskPrimitive {
  id: number
  name: string
  description: string
  dueAt?: Date
  userId?: number
  boardId?: number
  stateId?: number
}
export interface CreateTaskPayload {
  name: string
  description: string
  dueAt?: Date
  stateId: number
  tags: TagPrimitive[]
  boardId: number
  userId: number
}
export interface CreateTaskResponse {
  error: ErrorCode
  data: Task
}
export interface UpdateTaskPayload {
  id: number
  name: string
  description: string
  dueAt?: Date
  stateId: number
  tags: TagPrimitive[]
  boardId: number
  userId: number
}
export interface UpdateTaskResponse {
  error: ErrorCode
  data: Task
}
export interface DeleteTaskPayload {
  id: number
}
export interface DeleteTaskResponse {
  error: ErrorCode
}
export interface User {
  id: number
  name: string
  email: string
  password: string
  boardMembers: Member[]
  tasks: Task[]
}
export interface UserPrimitive {
  id: number
  name: string
  email: string
  password: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
  token: string
}
export interface AuthUserResponse {
  error: ErrorCode
  data: AuthUser
}
export interface LoginPayload {
  email: string
  password: string
}
export interface LoginResponse {
  error: ErrorCode
  data: AuthUser
}
export interface SignUpPayload {
  name: string
  email: string
  password: string
}
export interface SignUpResponse {
  error: ErrorCode
  data: AuthUser
}
export interface GetUserBoardsResponse {
  error: ErrorCode
  data: BoardPrimitive[]
}
