import React from 'react'
import Login from '../pages/website/Login'
import Signup from '../pages/website/Signup'

const AuthRoutes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
]

export default AuthRoutes