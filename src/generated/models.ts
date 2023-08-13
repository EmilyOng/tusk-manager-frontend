/* Do not change, this code is generated from Golang structs */

import { Color } from './types'
import { Role } from './types'
import { ErrorCode } from './types'

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    boardMembers: Member[];
    tasks: Task[];
}
export interface Member {
    id: string;
    role: Role;
    userId?: string;
    user?: User;
    boardId?: string;
}
export interface State {
    id: string;
    name: string;
    currentPosition: number;
    tasks: Task[];
    boardId?: string;
}
export interface Tag {
    id: string;
    name: string;
    color: Color;
    tasks: Task[];
    boardId?: string;
}
export interface Task {
    id: string;
    name: string;
    description: string;
    dueAt?: Date;
    tags: Tag[];
    userId?: string;
    boardId?: string;
    stateId?: string;
}
export interface Board {
    id: string;
    name: string;
    color: Color;
    tasks: Task[];
    tags: Tag[];
    states: State[];
    boardMembers: Member[];
}
export interface BoardPrimitive {
    id: string;
    name: string;
    color: Color;
}
export interface GetBoardPayload {
    id: string;
}
export interface GetBoardResponse {
    error: ErrorCode;
    data: BoardPrimitive;
}
export interface CreateBoardPayload {
    name: string;
    color: Color;
    userId: string;
}
export interface CreateBoardResponse {
    error: ErrorCode;
    data: BoardPrimitive;
}
export interface UpdateBoardPayload {
    id: string;
    name: string;
    color: Color;
    userId: string;
}
export interface UpdateBoardResponse {
    error: ErrorCode;
    data: BoardPrimitive;
}
export interface GetBoardTasksPayload {
    boardId: string;
}
export interface GetBoardTasksResponse {
    error: ErrorCode;
    data: Task[];
}
export interface GetBoardTagsPayload {
    boardId: string;
}
export interface TagPrimitive {
    id: string;
    name: string;
    color: Color;
    boardId?: string;
}
export interface GetBoardTagsResponse {
    error: ErrorCode;
    data: TagPrimitive[];
}
export interface GetBoardMemberProfilesPayload {
    boardId: string;
}
export interface Profile {
    id: string;
    name: string;
    email: string;
}
export interface MemberProfile {
    id: string;
    role: Role;
    profile: Profile;
}
export interface GetBoardMemberProfilesResponse {
    error: ErrorCode;
    data: MemberProfile[];
}
export interface GetBoardStatesPayload {
    boardId: string;
}
export interface StatePrimitive {
    id: string;
    name: string;
    currentPosition: number;
    boardId?: string;
}
export interface GetBoardStatesResponse {
    error: ErrorCode;
    data: StatePrimitive[];
}
export interface DeleteBoardPayload {
    id: string;
}
export interface DeleteBoardResponse {
    error: ErrorCode;
}
export interface Response {
    error: ErrorCode;
}

export interface MemberPrimitive {
    id: string;
    role: Role;
    userId?: string;
    boardId?: string;
}

export interface CreateMemberPayload {
    role: Role;
    email: string;
    boardId: string;
}
export interface CreateMemberResponse {
    error: ErrorCode;
    data: MemberProfile;
}
export interface UpdateMemberPayload {
    id: string;
    role: Role;
}
export interface UpdateMemberResponse {
    error: ErrorCode;
    data: MemberProfile;
}
export interface DeleteMemberPayload {
    id: string;
}
export interface DeleteMemberResponse {
    error: ErrorCode;
}


export interface CreateStatePayload {
    name: string;
    boardId: string;
    currentPosition: number;
}
export interface CreateStateResponse {
    error: ErrorCode;
    data: State;
}
export interface UpdateStatePayload {
    id: string;
    name: string;
    boardId: string;
    currentPosition: number;
}
export interface UpdateStateResponse {
    error: ErrorCode;
    data: StatePrimitive;
}
export interface DeleteStatePayload {
    id: string;
}
export interface DeleteStateResponse {
    error: ErrorCode;
}


export interface CreateTagPayload {
    name: string;
    color: Color;
    boardId: string;
}
export interface CreateTagResponse {
    error: ErrorCode;
    data: TagPrimitive;
}
export interface UpdateTagPayload {
    id: string;
    name: string;
    boardId: string;
    color: Color;
}
export interface UpdateTagResponse {
    error: ErrorCode;
    data: TagPrimitive;
}
export interface DeleteTagPayload {
    id: string;
}
export interface DeleteTagResponse {
    error: ErrorCode;
}

export interface TaskPrimitive {
    id: string;
    name: string;
    description: string;
    dueAt?: Date;
    userId?: string;
    boardId?: string;
    stateId?: string;
}
export interface CreateTaskPayload {
    name: string;
    description: string;
    dueAt?: Date;
    stateId?: string;
    tags: TagPrimitive[];
    boardId?: string;
    userId?: string;
}
export interface CreateTaskResponse {
    error: ErrorCode;
    data: Task;
}
export interface UpdateTaskPayload {
    id: string;
    name: string;
    description: string;
    dueAt?: Date;
    stateId: string;
    tags: TagPrimitive[];
    boardId: string;
    userId: string;
}
export interface UpdateTaskResponse {
    error: ErrorCode;
    data: Task;
}
export interface DeleteTaskPayload {
    id: string;
}
export interface DeleteTaskResponse {
    error: ErrorCode;
}


export interface AuthUser {
    id: string;
    name: string;
    email: string;
    token: string;
}
export interface AuthUserResponse {
    error: ErrorCode;
    data: AuthUser;
}
export interface LoginPayload {
    email: string;
    password: string;
}
export interface LoginResponse {
    error: ErrorCode;
    data: AuthUser;
}
export interface SignUpPayload {
    name: string;
    email: string;
    password: string;
}
export interface SignUpResponse {
    error: ErrorCode;
    data: AuthUser;
}
export interface GetUserBoardsResponse {
    error: ErrorCode;
    data: BoardPrimitive[];
}