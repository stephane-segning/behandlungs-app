import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  connectToDb,
  DbConnectStatus,
  dbGetCases,
  dbGetEdges,
  dbGetFlowCaseStepViews,
  disconnectFromDb,
  SearchOption,
  selectDbStatus
} from './db.slice'
import { DatabaseFormValues } from '../models/db-form'
import {
  addPastConnection,
  getPastConnections,
  selectDbConnections
} from './past-db-connection.slice'

interface DbHook {
  connect: (values: DatabaseFormValues) => Promise<void>
  disconnect: () => Promise<void>
  status: DbConnectStatus
  getCases: (options: SearchOption) => void
  getFlowCaseStepViews: (options: SearchOption) => void
  getEdges: () => void
  connections: DatabaseFormValues[]
  getConnections: () => void
}

export function useDb(): DbHook {
  const dispatch = useDispatch()
  const status = useSelector(selectDbStatus)
  const connections$ = useSelector(selectDbConnections)
  const connections = useMemo(() => Object.values(connections$), [connections$])

  const connect = useCallback(
    async (values: DatabaseFormValues) => {
      await dispatch(connectToDb(values) as any)
      await dispatch(addPastConnection(values) as any)
    },
    [dispatch]
  )
  const getConnections = useCallback(async () => {
    dispatch(getPastConnections() as any)
  }, [dispatch])

  const disconnect = useCallback(async () => {
    await dispatch(disconnectFromDb() as any)
  }, [dispatch])

  const getCases = useCallback(
    (options: SearchOption) => {
      dispatch(dbGetCases(options) as any)
    },
    [dispatch]
  )

  const getFlowCaseStepViews = useCallback(
    (options: SearchOption) => {
      dispatch(dbGetFlowCaseStepViews(options) as any)
    },
    [dispatch]
  )

  const getEdges = useCallback(() => {
    dispatch(dbGetEdges() as any)
  }, [dispatch])

  return {
    connect,
    disconnect,
    status,
    getCases,
    getFlowCaseStepViews,
    getEdges,
    connections,
    getConnections
  }
}
