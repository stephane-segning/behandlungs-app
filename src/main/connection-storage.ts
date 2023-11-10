import Store from 'electron-store'
import { ipcMain, safeStorage } from 'electron'
import * as yaml from 'js-yaml'
import { randomUUID } from 'crypto'
import log from 'electron-log/main'
import * as _ from 'lodash'

function getAll(store: Store<Record<string, any>>) {
  log.info('getAll')
  const all: [string, any][] = []
  for (const [key, enc] of store) {
    const dec = safeStorage.decryptString(enc)
    all.push([key, JSON.parse(dec)])
  }
  log.info('getAll job done')
  return all
}

export function initConnectionStore(): void {
  const store = new Store({
    fileExtension: 'yaml',
    serialize: yaml.dump,
    deserialize: yaml.load,
    name: 'connections'
  })

  ipcMain.handle('get-connections', () => {
    return getAll(store)
  })

  ipcMain.handle('add-connection', (_event, connection) => {
    log.info('add-connection')
    const values = getAll(store)
    for (const [key, conn] of values) {
      if (_.isEqual(conn, connection)) {
        return key
      }
    }

    const key = randomUUID()
    const value = safeStorage.encryptString(JSON.stringify(connection))
    store.set(key, value)
    log.info('add-connection job done')
    return key
  })

  ipcMain.handle('delete-connection', (_, key) => {
    log.info('delete-connection')
    store.delete(key)
    log.info('delete-connection job done')
  })
}
