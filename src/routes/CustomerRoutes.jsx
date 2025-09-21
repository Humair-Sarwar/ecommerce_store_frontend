import ScrollToTop from "../components/ScrollToTop";
import CustomerLayout from "../layouts/Customer/CustomerLayout";
import Address from "../pages/customer/Address";
import GiftCards from "../pages/customer/GiftCards";
import Orders from "../pages/customer/Orders";
import CustomerOrderDetails from "../pages/customer/OrderStepsPages/CustomerOrderDetails";

import ProfileInfo from "../pages/customer/ProfileInfo";
import Wishlist from "../pages/customer/Wishlist";
import PrivateRoute1 from "./PrivateUserRoute";

const CustomerRoutes = [
  {
    path: "/",
    element: (
        <>
        <ScrollToTop/>
      <PrivateRoute1>
        <CustomerLayout />
      </PrivateRoute1>
      </>
    ),
    children: [
      { path: "buy/orders", element:  <PrivateRoute1><Orders /></PrivateRoute1> },
      { path: "wishlist", element: <PrivateRoute1><Wishlist /></PrivateRoute1> },
      { path: "profile", element: <PrivateRoute1><ProfileInfo /></PrivateRoute1> },
      { path: "gift-cards", element: <PrivateRoute1><GiftCards /></PrivateRoute1> },
      { path: "addresses", element: <PrivateRoute1><Address /></PrivateRoute1> },
      { path: "orders/66672287-e33f-4705-b863-124d7f8408f1", element: <PrivateRoute1><CustomerOrderDetails /></PrivateRoute1> },
    ],
  },
];

export default CustomerRoutes;
