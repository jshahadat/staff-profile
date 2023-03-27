import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import ErrorPage from "../../pages/Sheared/ErrorPage/ErrorPage";
import Home from '../../pages/Home/Home/Home'
import Register from "../../pages/Authintication/Register/Register";
import Login from "../../pages/Authintication/Login/Login";
import DashboardLayout from "../../layout/DashboardLayout";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import AllStafs from "../../pages/AllStafs/AllStafs";
import UpdateStaf from "../../pages/UpdateStaf/UpdateStaf";
import AddStaf from "../../pages/AddStaff/AddStaf";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allstafs',
                element: <AllStafs></AllStafs>
            },
            {
                path: '/addstaf',
                element: <AddStaf></AddStaf>
            },

            {
                path: '/:id',
                element: <UpdateStaf></UpdateStaf>,
                loader: ({ params }) => fetch(`https://mockup-todos-server.vercel.app/${params.id}`)
            },

            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            }

        ]

    }
])