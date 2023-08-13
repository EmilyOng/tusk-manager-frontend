import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BoardAPI } from 'api/board'
import { BoardMinimalView } from 'generated/views'

type BoardsState = {
  boards: BoardMinimalView[]
  loading: boolean
  currentBoardId: string | null
}

const initialState: BoardsState = {
  boards: [],
  loading: false,
  currentBoardId: null
}

export const getBoards = createAsyncThunk(
  'Boards/getBoards',
  async (_, thunkAPI) => {
    const api = new BoardAPI()
    return api.getBoards()
      .then((res) => res)
      .catch((e) => {
        return thunkAPI.rejectWithValue(e.message)
      })
  }
)

export const BoardsSlice = createSlice({
  name: 'Boards',
  initialState,
  reducers: {
    setBoards(state, action: { payload: BoardMinimalView[] }) {
      state.boards = action.payload
    },
    updateBoards(state, action: { payload: BoardMinimalView[] }) {
      state.boards = action.payload
    },
    setCurrentBoardId(state, action: { payload: string | null }) {
      state.currentBoardId = action.payload
    },
    resetBoards(state) {
      state.boards = []
      state.currentBoardId = null
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.loading = true
      })
      .addCase(getBoards.fulfilled, (state, { payload }) => {
        state.boards = payload.data
        state.loading = false
      })
      .addCase(getBoards.rejected, (state) => {
        state.loading = false
      })
  }
})

export const selectBoards = ({ board }: { board: BoardsState }) => board
export const { setBoards, updateBoards, setCurrentBoardId, resetBoards } =
  BoardsSlice.actions
export const BoardsReducer = BoardsSlice.reducer
