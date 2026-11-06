import React from "react";
import { Navigate } from "react-router-dom";
import POSLayout from "../layouts/POS/POSLayout";
import POSTerminal from "../pages/pos/POSTerminal";
import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "../components/ScrollToTop";

const POSRoutes = [
  {
    path: "/vendor/point-of-sale",
    element: (
      <>
        <ScrollToTop />
        <PrivateRoute>
          <POSLayout />
        </PrivateRoute>
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <POSTerminal />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/pos",
    element: (
      <PrivateRoute>
        <Navigate
          to="/vendor/point-of-sale/?active=buy&hot_list=true"
          replace
        />
      </PrivateRoute>
    ),
  },
  {
    path: "/vendor/pos",
    element: (
      <PrivateRoute>
        <Navigate
          to="/vendor/point-of-sale/?active=buy&hot_list=true"
          replace
        />
      </PrivateRoute>
    ),
  },
];

export default POSRoutes;
