import React from "react";
import POSLayout from "../layouts/POS/POSLayout";
import POSTerminal from "../pages/pos/POSTerminal";
import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "../components/ScrollToTop";

const POSRoutes = [
  {
    path: "/pos",
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
        path: "", // This will match /pos exactly
        element: (
          <PrivateRoute>
            <POSTerminal />
          </PrivateRoute>
        ),
      },
    ],
  },
];

export default POSRoutes;