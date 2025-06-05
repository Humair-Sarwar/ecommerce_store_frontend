import React from 'react'
import WebsiteLayout from '../layouts/Website';
import { Home } from '../pages/website/Home';
import Login from '../pages/website/Login';
import ProductListingPage from '../pages/website/ProductListingPage';

const WebsiteRoutes = [
    {
        path: '/',
        element: <WebsiteLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: '/login', element: <Login/>},
            {path: 'product-listing-page', element: <ProductListingPage/>}
        ]
    }
]


export default WebsiteRoutes;