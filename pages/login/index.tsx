import WithoutAuth from 'components/layouts/WithoutAuth'
import Login from 'components/partials/Login/Login'
import React from 'react'
import PublicMiddleware from 'Utils/Middleware/PublicMiddleWare'

const LoginPage = () => {
  return (
    <Login />
  )
}

LoginPage.PageLayouts = WithoutAuth

export default LoginPage

export const getServerSideProps = async (context: any) => PublicMiddleware(context)