import { createBrowserRouter } from "react-router";
import WebsiteRoutes from "./WebsiteRoutes";
import AuthRoutes from "./AuthRoutes";



const router = createBrowserRouter(
    [...WebsiteRoutes, ...AuthRoutes]
)


export default router;