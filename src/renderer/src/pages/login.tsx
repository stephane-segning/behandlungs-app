import { DatabaseLoginForm } from '../components/database-form'
import { useDb } from '../hooks/db'
import { DatabaseFormValues } from '../models/db-form'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { DatabaseConnectionListItem } from '../components/database-connection-list-item'

export const LoginPage = () => {
  const { connect, disconnect, connections, getConnections } = useDb()
  const navigate = useNavigate()

  useEffect(() => {
    disconnect()
    getConnections()
  }, [])

  const login = async (values: DatabaseFormValues) => {
    await connect(values)
    navigate('/')
  }

  return (
    <div className="w-screen h-screen flex items-center">
      <div className="max-w-md px-4 mx-auto py-16 w-full sm:w-1/2 md:w-1/3">
        <h1 className="text-4xl pb-4 font-bold text-center">DB Daten</h1>
        <DatabaseLoginForm onSubmit={login} />

        <div className="divider" />
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold">Verbindungen</h2>
          <ul className="list-none list-inside">
            {connections.map((connection, index) => (
              <DatabaseConnectionListItem key={index + '-conn'} {...connection} onClick={login} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
