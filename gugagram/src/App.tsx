import { useState } from 'react'
import { Route, Routes } from 'react-router'
import AuthLayout from './_auth/AuthLayout'
import SigninForm from './_auth/forms/SignInForm'
import SignUpForm from './_auth/forms/SignUpForm'
import RootLayout from './-root/RootLayout'
import { Home } from './-root/pages'

function App() {

  return (
    <>
    <main>
      <Routes>
        {/* Public Routes */}
          <Route element={<AuthLayout/>}>
            <Route path='/sign-in' element={<SigninForm/>}/>
            <Route path='/sign-up' element={<SignUpForm/>} />
          </Route>
        {/* Private Routes */}
          <Route element={<RootLayout/>}>
            <Route index element={<Home/>}/>
          </Route>
      </Routes>
    </main>

    </>
  )
}

export default App
