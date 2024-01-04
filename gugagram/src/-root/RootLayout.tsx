import { useAppDispatch, useAppSelector } from '@/store/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const RootLayout = () => {
  const isAuthed = useAppSelector((state) => state.Pagereducer.isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    isAuthed ? navigate('' ) : navigate('/sign-up')
  },[])
  return (
    <div>RootLayout</div>
  )
}

export default RootLayout