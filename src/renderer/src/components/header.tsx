import { ArrowLeft } from 'react-feather'
import { useNavigate } from 'react-router-dom'

export function AppHeader() {
  const navigate = useNavigate()
  const goBack = () => {
    return navigate(-1)
  }

  return (
    <div className="navbar bg-base-100 ">
      <div className="navbar-start">
        <button onClick={goBack} type="button" tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
          <ArrowLeft />
        </button>
      </div>
      <div className="navbar-center">
        <span className="normal-case text-xl">Behandlung App</span>
      </div>
      <div className="navbar-end">
        {/*<button className="btn btn-ghost btn-circle">*/}
        {/*  <LogOut />*/}
        {/*</button>*/}
      </div>
    </div>
  )
}
