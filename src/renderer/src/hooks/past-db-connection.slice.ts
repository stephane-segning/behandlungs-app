import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DatabaseFormValues } from '../models/db-form'

export interface PastConnectionState {
  connections: Record<string, DatabaseFormValues>
}

const initialState: PastConnectionState = {
  connections: {}
}

export const getPastConnections = createAsyncThunk('connections/getPastConnections', async () => {
  const arr: [string, DatabaseFormValues][] =
    await window.electron.ipcRenderer.invoke('get-connections')
  return arr.reduce(
    (acc, [key, values]) => {
      acc[key] = values
      return acc
    },
    {} as Record<string, DatabaseFormValues>
  )
})

export const addPastConnection = createAsyncThunk(
  'connections/addPastConnection',
  async (values: DatabaseFormValues) => {
    const key: string = await window.electron.ipcRenderer.invoke('add-connection', values)
    return { key, values }
  }
)

export const removePastConnection = createAsyncThunk(
  'connections/removePastConnection',
  async (key: string) => {
    await window.electron.ipcRenderer.invoke('delete-connection', key)
    return key
  }
)

// Then, handle actions in your reducers:
const dbConnectionSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPastConnections.fulfilled, (state, action) => {
        state.connections = action.payload
      })
      .addCase(addPastConnection.fulfilled, (state, action) => {
        state.connections[action.payload.key] = action.payload.values
      })
      .addCase(removePastConnection.fulfilled, (state, action) => {
        delete state.connections[action.payload]
      })
  }
})

export const selectDbConnections = (state: { connections: PastConnectionState }) =>
  state.connections.connections

export default dbConnectionSlice.reducer
