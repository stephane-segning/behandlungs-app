import { configureStore } from '@reduxjs/toolkit'
import dbSlice from './db.slice'
import dbConnectionSlice from './past-db-connection.slice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createLogger } from 'redux-logger';

const middlewares: any[] = []

if (import.meta.env.DEV) {
  const logger = createLogger({
    level: 'error'
  })

  middlewares.push(logger)
}

export const store = configureStore({
  reducer: {
    db: dbSlice,
    connections: dbConnectionSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// configure listeners using the provided defaults
setupListeners(store.dispatch)
