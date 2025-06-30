import { createBrowserRouter } from "react-router";
import WebsiteRoutes from "./WebsiteRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";



const router = createBrowserRouter(
    [...WebsiteRoutes, ...AuthRoutes, ...AdminRoutes]
)


export default router;