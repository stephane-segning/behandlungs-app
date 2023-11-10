import { Outlet } from 'react-router-dom'
import { AppHeader } from './header'

export function LayoutWrapper() {
  return (
    <>
      <AppHeader />
      <div>
        <Outlet />
      </div>
    </>
  )
}
