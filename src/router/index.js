import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/index";
import Login from "../pages/Login/index"

const router = createBrowserRouter([
        {
            path:'/',
            element:<Login/>  
        },
        {
            path:'/layout',
            element:<Layout/>  
        },
        {
            path:'/login',
            element:<Login/>  
        },
    ]
) 

export default router;