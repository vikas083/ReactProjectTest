import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import AppLayout from './ui/AppLayout'
import HomePage from './pages/HomePage'
import PartnersPage from './pages/PartnersPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'partners', element: <PartnersPage /> },
    ],
  },
])

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
