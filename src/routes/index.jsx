import { createBrowserRouter } from "react-router";
import WebsiteRoutes from "./WebsiteRoutes";



const router = createBrowserRouter(
    [...WebsiteRoutes]
)


export default router;