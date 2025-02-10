"use client"
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../../config/store/store'
import CheckAuth from '../view/checkauth'
import { Skeleton } from '../ui/skeleton'
import { Toaster } from '../ui/toaster'
import { useDispatch, useSelector } from 'react-redux'
import { checkuser } from '../../config/store/auth-slice'

// Create a separate component for authentication logic
const AuthWrapper = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkuser())
  }, [dispatch])

  if (isLoading)
    return <Skeleton className="w-[800] bg-black h-[100vh]" />

  return (
    <CheckAuth user={user} isAuthenticated={isAuthenticated}>
      {children}
      <Toaster />
    </CheckAuth>
  )
}

const Reduxprovider = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthWrapper>{children}</AuthWrapper>
    </Provider>
  )
}

export default Reduxprovider
