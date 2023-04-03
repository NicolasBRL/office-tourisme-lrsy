import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/AuthContext'

const GuestLayout = () => {
  // Récupère le token d'authentification
  const {authToken} = useStateContext()

  // Vérifie si le token existe
  if(authToken) return <Navigate to="/" replace />

  return (
    <div>
        <Outlet />
    </div>
  )
}

export default GuestLayout