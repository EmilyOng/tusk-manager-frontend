/* Do not change, this code is generated from Golang structs */

import { Color } from './types'
import { Role } from './types'

export interface AuthUserView {
    id: string;
    name: string;
    email: string;
    token: string;
}
export interface AuthUserResponse {
    message: string;
    code: number;
    data: AuthUserView;
}
export interface LoginPayload {
    email: string;
    password: string;
}
export interface LoginResponse {
    message: string;
    code: number;
    data: AuthUserView;
}
export interface SignUpPayload {
    name: string;
    email: string;
    password: string;
}
export interface SignUpResponse {
    message: string;
    code: number;
    data: AuthUserView;
}
export interface BoardMinimalView {
    id: string;
    name: string;
    color: Color;
}
export interface GetBoardPayload {
    id: string;
}
export interface GetBoardResponse {
    message: string;
    code: number;
    data: BoardMinimalView;
}
export interface CreateBoardPayload {
    name: string;
    color: Color;
    userId: string;
}
export interface CreateBoardResponse {
    message: string;
    code: number;
    data: BoardMinimalView;
}
export interface UpdateBoardPayload {
    id: string;
    name: string;
    color: Color;
    userId: string;
}
export interface UpdateBoardResponse {
    message: string;
    code: number;
    data: BoardMinimalView;
}
export interface GetBoardTasksPayload {
    boardId: string;
}
export interface Tag {
    id: string;
    name: string;
    color: Color;
    tasks: Task[];
    boardId: string;
}
export interface Task {
    id: string;
    name: string;
    description: string;
    dueAt?: Date;
    tags: Tag[];
    userId: string;
    boardId: string;
    stateId: string;
}
export interface GetBoardTasksResponse {
    message: string;
    code: number;
    data: Task[];
}
export interface GetBoardTagsPayload {
    boardId: string;
}
export interface TagMinimalView {
    id: string;
    name: string;
    color: Color;
    boardId: string;
}
export interface GetBoardTagsResponse {
    message: string;
    code: number;
    data: TagMinimalView[];
}
export interface GetBoardMemberProfilesPayload {
    boardId: string;
}
export interface UserMinimalView {
    id: string;
    name: string;
    email: string;
}
export interface MemberFullView {
    id: string;
    role: Role;
    user: UserMinimalView;
}
export interface GetBoardMemberProfilesResponse {
    message: string;
    code: number;
    data: MemberFullView[];
}
export interface GetBoardStatesPayload {
    boardId: string;
}
export interface StateMinimalView {
    id: string;
    name: string;
    currentPosition: number;
    boardId: string;
}
export interface GetBoardStatesResponse {
    message: string;
    code: number;
    data: StateMinimalView[];
}
export interface DeleteBoardPayload {
    id: string;
}
export interface DeleteBoardResponse {
    message: string;
    code: number;
}
export interface MemberMinimalView {
    id: string;
    role: Role;
    userId: string;
    boardId: string;
}

export interface CreateMemberPayload {
    role: Role;
    email: string;
    boardId: string;
}
export interface CreateMemberResponse {
    message: string;
    code: number;
    data: MemberFullView;
}
export interface UpdateMemberPayload {
    id: string;
    role: Role;
}
export interface UpdateMemberResponse {
    message: string;
    code: number;
    data: MemberFullView;
}
export interface DeleteMemberPayload {
    id: string;
}
export interface DeleteMemberResponse {
    message: string;
    code: number;
}
export interface Response {
    message: string;
    code: number;
}

export interface CreateStatePayload {
    name: string;
    boardId: string;
    currentPosition: number;
}
export interface State {
    id: string;
    name: string;
    currentPosition: number;
    tasks: Task[];
    boardId: string;
}
export interface CreateStateResponse {
    message: string;
    code: number;
    data: State;
}
export interface UpdateStatePayload {
    id: string;
    name: string;
    boardId: string;
    currentPosition: number;
}
export interface UpdateStateResponse {
    message: string;
    code: number;
    data: StateMinimalView;
}
export interface DeleteStatePayload {
    id: string;
}
export interface DeleteStateResponse {
    message: string;
    code: number;
}

export interface CreateTagPayload {
    name: string;
    color: Color;
    boardId: string;
}
export interface CreateTagResponse {
    message: string;
    code: number;
    data: TagMinimalView;
}
export interface UpdateTagPayload {
    id: string;
    name: string;
    boardId: string;
    color: Color;
}
export interface UpdateTagResponse {
    message: string;
    code: number;
    data: TagMinimalView;
}
export interface DeleteTagPayload {
    id: string;
}
export interface DeleteTagResponse {
    message: string;
    code: number;
}
export interface TaskMinimalView {
    id: string;
    name: string;
    description: string;
    dueAt?: Date;
}
export interface CreateTaskPayload {
    name: string;
    description: string;
    dueAt?: Date;
    stateId: string;
    tags: TagMinimalView[];
    boardId: string;
    userId: string;
}
export interface CreateTaskResponse {
    message: string;
    code: number;
    data: Task;
}
export interface UpdateTaskPayload {
    id: string;
    name: string;
    description: string;
    dueAt?: Date;
    stateId: string;
    tags: TagMinimalView[];
    boardId: string;
    userId: string;
}
export interface UpdateTaskResponse {
    message: string;
    code: number;
    data: Task;
}
export interface DeleteTaskPayload {
    id: string;
}
export interface DeleteTaskResponse {
    message: string;
    code: number;
}
export interface GetUserBoardsPayload {
    userId: string;
}
export interface GetUserBoardsResponse {
    message: string;
    code: number;
    data: BoardMinimalView[];
}
