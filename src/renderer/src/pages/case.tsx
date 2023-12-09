import { useSelector } from 'react-redux'
import { selectDbCases } from '../hooks/db.slice'
import { useEffect, useState } from 'react'
import { useDb } from '../hooks/db'
import { debounce } from 'lodash'
import { ArrowRight } from 'react-feather'
import { Link } from 'react-router-dom'

export function CasePage() {
  const { getCases } = useDb()
  const cases = useSelector(selectDbCases)
  const [caseId] = useState('')

  useEffect(() => {
    if (cases.length > 0 && /^\d+$/.test(caseId)) {
      getCases({ caseId: Number(caseId) })
    } else {
      getCases({})
    }
  }, [caseId])

  const onChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const caseId = e.target.value
    if (caseId === '') {
      getCases({})
      return
    }
    const isNumber = /^\d+$/.test(caseId)
    if (isNumber) {
      getCases({ caseId: Number(caseId) })
    }
  }, 1_000)

  return (
    <div className="flex flex-col">
      <div className="px-6">
        <input
          onChange={onChange}
          type="text"
          placeholder="Type here"
          className="input input-sm input-bordered w-full"
        />
      </div>
      <div className="overflow-x-auto px-6">
        <table className="table table-sm">
          {/* head */}
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Patient ID</th>
              <th>Arrived by</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cases.map((cazz) => (
              <tr key={cazz.id} className="hover">
                <th>{cazz.id}</th>
                <td>{cazz.patient?.id}</td>
                <td>{cazz.arrivedBy}</td>
                <td>
                  <Link to={`/${cazz.id}`} className="btn btn-sm btn-circle">
                    <ArrowRight />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
