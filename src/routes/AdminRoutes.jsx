import AdminLayout from "../layouts/Website/AdminLayout";
import Brands from "../pages/vendor/Brands";
import Categories from "../pages/vendor/Categories";
import Dashboard from "../pages/vendor/Dashboard";
import Products from "../pages/vendor/Products";
import SaleOrders from "../pages/vendor/SaleOrders";
import SiteSettings from "../pages/vendor/SiteSettings";
import PrivateRoute from "./PrivateRoute"; // ✅

const AdminRoutes = [
  {
    path: "/vendor",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "dashboard", element:  <PrivateRoute><Dashboard /></PrivateRoute> },
      { path: "products", element: <PrivateRoute><Products /></PrivateRoute> },
      { path: "orders/sales", element: <PrivateRoute><SaleOrders /></PrivateRoute> },
      { path: "categories", element: <PrivateRoute><Categories /></PrivateRoute> },
      { path: "settings/site-settings", element: <PrivateRoute><SiteSettings /></PrivateRoute> },
       { path: "brands", element: <PrivateRoute><Brands /></PrivateRoute> },
    ],
  },
];

export default AdminRoutes;
