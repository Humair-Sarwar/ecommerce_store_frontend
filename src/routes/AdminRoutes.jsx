import AdminLayout from "../layouts/Website/AdminLayout";
import Brands from "../pages/vendor/Brands";
import Categories from "../pages/vendor/Categories";
import Dashboard from "../pages/vendor/Dashboard";
import Pages from "../pages/vendor/Pages";
import ReturnPolicy from "../pages/vendor/Policies/ReturnPolicy";
import WarrantyPolicy from "../pages/vendor/Policies/WarrantyPolicy";
import Products from "../pages/vendor/Products";
import Step1 from "../pages/vendor/ProductSteps/Step1";
import SaleOrderDetails from "../pages/vendor/SaleOrderDetails";
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
      { path: "orders/buy", element: <PrivateRoute><SaleOrders /></PrivateRoute> },
      { path: "orders/buy/:id", element: <PrivateRoute><SaleOrderDetails /></PrivateRoute> },
      { path: "categories", element: <PrivateRoute><Categories /></PrivateRoute> },
      { path: "settings/site-settings", element: <PrivateRoute><SiteSettings /></PrivateRoute> },
       { path: "brands", element: <PrivateRoute><Brands /></PrivateRoute> },
       { path: "products/create", element: <PrivateRoute><Step1/></PrivateRoute> },
       { path: "warranty-policy", element: <PrivateRoute><WarrantyPolicy/></PrivateRoute> },
       { path: "return-policy", element: <PrivateRoute><ReturnPolicy/></PrivateRoute> },
       { path: "pages", element: <PrivateRoute><Pages/></PrivateRoute> },
    ],
  },
];

export default AdminRoutes;
