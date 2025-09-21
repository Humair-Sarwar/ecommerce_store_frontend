import React from 'react'
import WebsiteLayout from '../layouts/Website';
import { Home } from '../pages/website/Home';
import ProductListingPage from '../pages/website/ProductListingPage';
import ProductDetailPage from '../pages/website/ProductDetailPage';
import CartPage from '../pages/website/CartPage';
import ScrollToTop from '../components/ScrollToTop';
import Information from "../pages/customer/OrderStepsPages/Information";
import PrivateRoute1 from "./PrivateUserRoute";
import Shipping from "../pages/customer/OrderStepsPages/Shipping";
import Payments from "../pages/customer/OrderStepsPages/Payments";
import ReviewOrder from '../pages/customer/OrderStepsPages/ReviewOrder';

const WebsiteRoutes = [
    {
        path: '/',
        element: 
        <>
       <ScrollToTop/><WebsiteLayout/></>,
        children: [
            {index: true, element: <Home/>},
            {path: '/buy/products/:slug/1', element: <ProductListingPage/>},
            {path: '/product-detail-page', element: <ProductDetailPage/>},
            {path: '/cart', element: <CartPage/>},
            { path: "cart/checkouts/5a0bc791-941d-43dd-b991-d60677ef390d/information", element: <PrivateRoute1><Information /></PrivateRoute1> },
            
            { path: "cart/checkouts/5a0bc791-941d-43dd-b991-d60677ef390d/shipping", element: <PrivateRoute1>< Shipping/></PrivateRoute1> },
            { path: "cart/checkouts/5a0bc791-941d-43dd-b991-d60677ef390d/payment", element: <PrivateRoute1>< Payments/></PrivateRoute1> },
             { path: "cart/checkouts/5a0bc791-941d-43dd-b991-d60677ef390d/review", element: <PrivateRoute1>< ReviewOrder/></PrivateRoute1> },
        ]
    }
]


export default WebsiteRoutes;