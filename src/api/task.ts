import {
  CreateTaskPayload,
  CreateTaskResponse,
  DeleteTaskPayload,
  DeleteTaskResponse,
  UpdateTaskPayload,
  UpdateTaskResponse
} from 'generated/models'
import { RequestAPI } from './request'

// All endpoints under the '/tasks' prefix
export class TaskAPI {
  private req: RequestAPI

  constructor() {
    this.req = new RequestAPI('/tasks')
  }

  async createTask(payload: CreateTaskPayload): Promise<CreateTaskResponse> {
    return this.req.post('/', payload).then((res: CreateTaskResponse) => {
      return {
        ...res,
        data: {
          ...res.data,
          dueAt: res.data.dueAt ? new Date(res.data.dueAt) : undefined,
          tags: res.data.tags ?? []
        }
      }
    })
  }

  async editTask(payload: UpdateTaskPayload): Promise<UpdateTaskResponse> {
    return this.req.put('/', payload).then((res: UpdateTaskResponse) => {
      return {
        ...res,
        data: {
          ...res.data,
          dueAt: res.data.dueAt ? new Date(res.data.dueAt) : undefined,
          tags: res.data.tags ?? []
        }
      }
    })
  }

  async deleteTask(payload: DeleteTaskPayload): Promise<DeleteTaskResponse> {
    return this.req.delete(`/${payload.id}`)
  }
}
