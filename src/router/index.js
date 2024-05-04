import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout/index";
import Login from "@/pages/Login/index"
import { AuthRoute } from "@/components/AuthRoute";
// import Home from "@/pages/Home/index";
// import Article from "@/pages/Article/index"
// import Publish from "@/pages/Publish/index"
import { lazy,Suspense } from "react";

//配置路由懒加载
const Home = lazy(() => import('@/pages/Home/index'));
const Article = lazy(() => import('@/pages/Article/index'));
const Publish = lazy(() => import('@/pages/Publish/index'));

const router = createBrowserRouter([
        {
            path:"/",
            element:<AuthRoute><Layout/></AuthRoute>,  
            children:[
                {
                    path:"/home",
                    element:<Suspense fallback={'加载中'}><Home/></Suspense>     
                },
                {
                    path:'article',
                    element:<Suspense fallback={'加载中'}><Article/></Suspense> 
                },
                {
                    path:'publish',
                    element:<Suspense fallback={'加载中'}><Publish/></Suspense>
                },
            ]
        },
        {
            path:'/login',
            element:<Login/>  
        },
    ]
) 

export default router;