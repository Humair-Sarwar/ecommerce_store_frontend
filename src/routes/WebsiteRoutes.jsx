import React from 'react'
import WebsiteLayout from '../layouts/Website';
import { Home } from '../pages/website/Home';
import ProductListingPage from '../pages/website/ProductListingPage';
import ProductDetailPage from '../pages/website/ProductDetailPage';
import CartPage from '../pages/website/CartPage';

const WebsiteRoutes = [
    {
        path: '/',
        element: <WebsiteLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: '/buy/products/:slug/1', element: <ProductListingPage/>},
            {path: '/product-detail-page', element: <ProductDetailPage/>},
            {path: '/cart', element: <CartPage/>}
        ]
    }
]


export default WebsiteRoutes;