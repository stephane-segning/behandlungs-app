import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LayoutWrapper } from '../components/wrapper'
import { LoginPage } from './login'
import { DatabaseProtectedRoute } from '../components/database-protected'
import { CasePage } from './case'
import { StepDiagram } from './step-diagram'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <DatabaseProtectedRoute>
        <LayoutWrapper />
      </DatabaseProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <CasePage />
      },
      {
        path: '/:caseId',
        element: <StepDiagram />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])
