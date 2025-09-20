import { createBrowserRouter } from "react-router";
import WebsiteRoutes from "./WebsiteRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import CustomerRoutes from "./CustomerRoutes";


const router = createBrowserRouter(
    [...WebsiteRoutes, ...AuthRoutes, ...AdminRoutes, ...CustomerRoutes]
)


export default router;