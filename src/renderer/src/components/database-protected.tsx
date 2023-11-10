import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectDbStatus } from '../hooks/db.slice'

interface DatabaseProtectedRouteProps {
  children: React.ReactNode
}

export const DatabaseProtectedRoute = ({ children }: DatabaseProtectedRouteProps) => {
  const isConnected = useSelector(selectDbStatus) === 'connected'

  if (!isConnected) {
    return <Navigate to="/login" />
  }

  return children
}
