import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthAPI } from 'api/auth'
import { AuthUserView } from 'generated/views'
import { removeAuthToken, setAuthToken } from 'utils/authToken'

export type MeState = {
  user: AuthUserView | null
  loading: boolean
}

const initialState: MeState = {
  user: null,
  loading: false
}

export const getMe = createAsyncThunk('Me/getMe', async (_, thunkAPI) => {
  const api = new AuthAPI()
  return api
    .getAuthUser()
    .then((res) => res)
    .catch((e) => {
      return thunkAPI.rejectWithValue(e.message)
    })
})

export const MeSlice = createSlice({
  name: 'Me',
  initialState,
  reducers: {
    setMe(state, action: { payload: AuthUserView }) {
      state.user = action.payload
      setAuthToken(action.payload.token)
    },
    resetMe(state) {
      state.user = null
      removeAuthToken()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = true
      })
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.user = payload.data
        state.loading = false
        setAuthToken(payload.data.token)
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false
      })
  }
})

export const selectMe = ({ me }: { me: MeState }) => me
export const { setMe, resetMe } = MeSlice.actions
export const MeReducer = MeSlice.reducer
