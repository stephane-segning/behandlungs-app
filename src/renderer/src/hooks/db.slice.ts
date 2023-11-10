import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DatabaseFormValues } from '../models/db-form'
import log from 'electron-log/renderer';

export interface SearchOption {
  caseId?: string
}

// First, create the thunk
export const connectToDb = createAsyncThunk(
  'db/connectToDb',
  async (values: DatabaseFormValues) => {
    log.log('connectToDb');
    const status: boolean = await window.electron.ipcRenderer.invoke('db-connect', values)
    log.log('connectToDb status', status);
    return status
  }
)

export const disconnectFromDb = createAsyncThunk('db/disconnectFromDb', async () => {
  log.log('disconnectFromDb');
  const status: boolean = await window.electron.ipcRenderer.invoke('db-disconnect')
  log.log('disconnectFromDb status', status);
  return status
})

export const dbGetFlowCaseStepViews = createAsyncThunk(
  'db/getFlowCaseStepViews',
  async (options: SearchOption) => {
    const status: any[] = await window.electron.ipcRenderer.invoke(
      'db-get-flow-case-step-views',
      options
    )
    return status
  }
)

export const dbGetCases = createAsyncThunk('db/dbGetCases', async (options: SearchOption) => {
  const status: any[] = await window.electron.ipcRenderer.invoke('db-get-cases', options)
  return status
})

export const dbGetEdges = createAsyncThunk('db/dbGetEdges', async () => {
  const status: any[] = await window.electron.ipcRenderer.invoke('db-get-edges')
  return status
})

export type DbConnectStatus = 'connected' | 'disconnected' | 'error' | 'unknown'

export interface DbState {
  status: DbConnectStatus
  loading: boolean
  steps: any[]
  cases: any[]
  edges: any[]
}

const initialState: DbState = {
  status: 'unknown',
  loading: false,
  steps: [],
  cases: [],
  edges: []
}

// Then, handle actions in your reducers:
const dbSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for connectToDb action types here, and handle loading state as needed
    builder
      .addCase(connectToDb.pending, (state, action) => {
        // Add user to the state array
        state.loading = true
        state.status = action.payload ? 'connected' : 'error'
      })
      .addCase(disconnectFromDb.pending, (state, action) => {
        // Add user to the state array
        state.loading = true
        state.status = action.payload ? 'disconnected' : 'error'
      })
      .addCase(connectToDb.fulfilled, (state, action) => {
        // Add user to the state array
        state.loading = false
        state.status = action.payload ? 'connected' : 'error'
      })
      .addCase(disconnectFromDb.fulfilled, (state, action) => {
        // Add user to the state array
        state.loading = false
        state.status = action.payload ? 'disconnected' : 'error'
      })

      //
      .addCase(dbGetFlowCaseStepViews.fulfilled, (state, action) => {
        // Add user to the state array
        state.steps = action.payload
      })
      .addCase(dbGetCases.fulfilled, (state, action) => {
        // Add user to the state array
        state.cases = action.payload
      })
      .addCase(dbGetEdges.fulfilled, (state, action) => {
        // Add user to the state array
        state.edges = action.payload
      })
  }
})

export const {} = dbSlice.actions

export const selectDbStatus = (state: { db: DbState }) => state.db.status
export const selectDbSteps = (state: { db: DbState }) => state.db.steps
export const selectDbCases = (state: { db: DbState }) => state.db.cases
export const selectDbEdges = (state: { db: DbState }) => state.db.edges

export default dbSlice.reducer
