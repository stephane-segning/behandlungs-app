import { DataSource, DataSourceOptions } from 'typeorm'
import { ipcMain } from 'electron'

import { defaultOptions } from './ormconfig'
import { FlowCaseStepView } from './entities/flow-case-step-view.entity'
import { CaseEntity } from './entities/case.entity'
import { FlowEdgeEntity } from './entities/flow-edge-element.entity'
import log from 'electron-log/main'

export function initDb() {
  log.info('Initializing database')
  let dataSource: DataSource | null = null

  ipcMain.handle('db-connect', async (_, values: DataSourceOptions) => {
    log.info('Connecting to database')
    if (dataSource) {
      log.info('Database already connected, disconnecting')
      await dataSource.destroy()
      dataSource = null
      log.info('Database disconnected')
    }

    try {
      log.info('Creating new database connection')
      const d = new DataSource({ ...defaultOptions(), ...values })
      await d.initialize()
      dataSource = d
      log.info('Database connected')
      return true
    } catch (error) {
      log.info('Failed to connect to database')
      console.error(error)
      return false
    }
  })

  ipcMain.handle('db-disconnect', async () => {
    log.info('Disconnecting from database')
    if (dataSource) {
      log.info('Database connected, disconnecting')
      await dataSource.destroy()
      dataSource = null
    }
    log.info('Database disconnected')
    return true
  })

  interface SearchOption {
    caseId?: string
  }

  ipcMain.handle('db-get-flow-case-step-views', async (_, searchOption: SearchOption) => {
    const ds = dataSource
    if (!ds) {
      log.info('Database is not connected')
      throw new Error('Database is not connected')
    }

    log.info('Getting flow case step views')
    const { caseId } = searchOption
    const repo = ds.getRepository(FlowCaseStepView)
    return caseId ? await repo.find({ where: { caseId } }) : await repo.find()
  })

  ipcMain.handle('db-get-cases', async (_, searchOption: SearchOption) => {
    const ds = dataSource
    if (!ds) {
      log.info('Database is not connected')
      throw new Error('Database is not connected')
    }

    log.info('Getting cases')
    const { caseId } = searchOption
    const repo = ds.getRepository(CaseEntity)
    return caseId ? await repo.find({ where: { id: caseId } }) : await repo.find()
  })

  ipcMain.handle('db-get-edges', async () => {
    const ds = dataSource
    if (!ds) {
      log.info('Database is not connected')
      throw new Error('Database is not connected')
    }

    log.info('Getting edges')
    const repo = ds.getRepository(FlowEdgeEntity)
    return await repo.find()
  })
}
