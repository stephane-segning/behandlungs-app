import { DatabaseFormValues } from '../models/db-form'
import { useMemo } from 'react'

function getConnectionName({ host, port, database, type }: DatabaseFormValues) {
  return `(${type}) ${host}:${port}/${database}`
}

export function DatabaseConnectionListItem({
  onClick,
  ...values
}: DatabaseFormValues & {
  onClick: (values: DatabaseFormValues) => void
}) {
  const name = useMemo(() => getConnectionName(values), [values])
  return (
    <li onClick={() => onClick(values)} className="link" key={name}>
      {name}
    </li>
  )
}
