import React from 'react'
import WebsiteLayout from '../layouts/Website';
import { Home } from '../pages/website/Home';
import Login from '../pages/website/Login';

const WebsiteRoutes = [
    {
        path: '/',
        element: <WebsiteLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: '/login', element: <Login/>}
        ]
    }
]


export default WebsiteRoutes;