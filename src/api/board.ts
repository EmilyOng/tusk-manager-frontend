import {
  CreateBoardPayload,
  CreateBoardResponse,
  DeleteBoardPayload,
  DeleteBoardResponse,
  GetBoardMemberProfilesPayload,
  GetBoardMemberProfilesResponse,
  GetBoardPayload,
  GetBoardResponse,
  GetBoardStatesPayload,
  GetBoardStatesResponse,
  GetBoardTagsPayload,
  GetBoardTagsResponse,
  GetBoardTasksPayload,
  GetBoardTasksResponse,
  GetUserBoardsResponse,
  UpdateBoardPayload,
  UpdateBoardResponse
} from 'generated/views'
import { RequestAPI } from './request'

// All endpoints under the '/boards' prefix
export class BoardAPI {
  private req: RequestAPI

  constructor() {
    this.req = new RequestAPI('/boards')
  }

  async getBoards(): Promise<GetUserBoardsResponse> {
    return this.req.get('/')
  }

  async getStates(
    payload: GetBoardStatesPayload
  ): Promise<GetBoardStatesResponse> {
    return this.req.get(`/${payload.boardId}/states`)
  }

  async getTags(payload: GetBoardTagsPayload): Promise<GetBoardTagsResponse> {
    return this.req
      .get(`/${payload.boardId}/tags`)
      .then((res: GetBoardTagsResponse) => {
        return {
          ...res,
          data: res.data ?? []
        }
      })
  }

  async getTasks(
    payload: GetBoardTasksPayload
  ): Promise<GetBoardTasksResponse> {
    return this.req
      .get(`/${payload.boardId}/tasks`)
      .then((res: GetBoardTasksResponse) => {
        return {
          ...res,
          data: res.data.map((task) => {
            return {
              ...task,
              dueAt: task.dueAt ? new Date(task.dueAt) : undefined,
              tags: task.tags ?? []
            }
          })
        }
      })
  }

  async getMemberProfiles(
    payload: GetBoardMemberProfilesPayload
  ): Promise<GetBoardMemberProfilesResponse> {
    return this.req.get(`/${payload.boardId}/members`)
  }

  async getBoard(payload: GetBoardPayload): Promise<GetBoardResponse> {
    return this.req.get(`/${payload.id}`)
  }

  async createBoard(payload: CreateBoardPayload): Promise<CreateBoardResponse> {
    return this.req.post('/', payload)
  }

  async editBoard(payload: UpdateBoardPayload): Promise<UpdateBoardResponse> {
    return this.req.put('/', payload)
  }

  async deleteBoard(payload: DeleteBoardPayload): Promise<DeleteBoardResponse> {
    return this.req.delete(`/${payload.id}`)
  }
}
