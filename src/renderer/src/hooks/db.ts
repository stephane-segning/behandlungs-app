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
  removePastConnection,
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
  removeConnection: (key: string) => Promise<void>
}

export function useDb(): DbHook {
  const dispatch = useDispatch()
  const status = useSelector(selectDbStatus)
  const connections$ = useSelector(selectDbConnections)
  const connections = useMemo(
    () =>
      Object.keys(connections$).map((k) => ({ ...connections$[k], id: k }) as DatabaseFormValues),
    [connections$]
  )

  const connect = useCallback(
    async (values: DatabaseFormValues) => {
      const result: boolean = await dispatch(connectToDb(values) as any).unwrap()
      if (result) {
        await dispatch(addPastConnection(values) as any)
      }
    },
    [dispatch]
  )
  const getConnections = useCallback(async () => {
    dispatch(getPastConnections() as any)
  }, [dispatch])

  const disconnect = useCallback(async () => {
    await dispatch(disconnectFromDb() as any).unwrap()
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

  const removeConnection = useCallback(
    async (key: string) => {
      await dispatch(removePastConnection(key) as any).unwrap()
    },
    [dispatch]
  )

  return {
    connect,
    disconnect,
    status,
    getCases,
    getFlowCaseStepViews,
    getEdges,
    connections,
    getConnections,
    removeConnection
  }
}
