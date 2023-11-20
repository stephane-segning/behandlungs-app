import { DatabaseFormValues } from '../models/db-form'
import React, { useMemo } from 'react'
import { Trash } from 'react-feather'

function getConnectionName({ host, port, database, type }: DatabaseFormValues) {
  return `(${type}) ${host}:${port}/${database}`
}

export function DatabaseConnectionListItem({
  onClick,
  onDelete,
  ...values
}: DatabaseFormValues & {
  onClick: (values: DatabaseFormValues) => void
  onDelete: () => void
}) {
  const name = useMemo(() => getConnectionName(values), [values])
  const onDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <li onClick={() => onClick(values)} className="link" key={name}>
      {name}

      <button onClick={onDeleteClick} className="btn btn-sm btn-ghost btn-circle">
        <Trash size={16} />
      </button>
    </li>
  )
}
