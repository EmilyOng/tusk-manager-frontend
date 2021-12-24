import { BoardPrimitive } from 'types/board'
import { Color } from 'types/common'
import { RequestAPI, Response } from './request'

type Boards = BoardPrimitive[]
interface BoardsResponse extends Response, Boards {}
interface BoardResponse extends Response, BoardPrimitive {}

export interface CreatingBoard {
  name: string
  color: Color
}

export class BoardAPI {
  private req: RequestAPI

  constructor() {
    this.req = new RequestAPI()
  }

  async getBoards(): Promise<BoardsResponse> {
    return this.req.get('/boards/')
  }

  async getBoard(boardId: number): Promise<BoardResponse> {
    return this.req.get(`/boards/${boardId}`)
  }

  async createBoard(board: CreatingBoard): Promise<BoardResponse> {
    return this.req.post('/boards/', board)
  }
}
