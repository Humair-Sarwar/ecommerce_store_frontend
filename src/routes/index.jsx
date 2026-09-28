import { createBrowserRouter } from "react-router";
import WebsiteRoutes from "./WebsiteRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import CustomerRoutes from "./CustomerRoutes";
import POSRoutes from "./POSRoutes";


const router = createBrowserRouter(
    [...WebsiteRoutes, ...AuthRoutes, ...AdminRoutes, ...CustomerRoutes, ...POSRoutes]
)


export default router;