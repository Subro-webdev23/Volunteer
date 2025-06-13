import {
    createBrowserRouter,
} from "react-router";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage";
import LogIn from "../Pages/LogIn";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import AddPost from "../Pages/Recruiter/AddPost";
import PrivateRoute from "./PrivateRoute";
import PostDetails from "../Pages/PostDetails";
import AllPost from "../Pages/AllPost";
import ManagePost from "../Pages/ManagePost";
import Update from "../Pages/Update";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                path: '/',
                element: <Home></Home>

            },
            {
                path: '/logIn',
                element: <LogIn></LogIn>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/addPost',
                element: <PrivateRoute>
                    <AddPost></AddPost>
                </PrivateRoute>
            },
            {
                path: '/postDetails/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/allPost/${params.id}`),
                element: <PrivateRoute>
                    <PostDetails></PostDetails>
                </PrivateRoute>
            },
            {
                path: '/allPost',
                element: <PrivateRoute>
                    <AllPost></AllPost>
                </PrivateRoute>
            },
            {
                path: '/managePost',
                element: <PrivateRoute>
                    <ManagePost></ManagePost>
                </PrivateRoute>
            },
            {
                path: '/update/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/allPost/${params.id}`),
                element: <PrivateRoute>
                    <Update></Update>
                </PrivateRoute>
            }
        ]

    },
]);