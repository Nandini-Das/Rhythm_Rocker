import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/MAin";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Home/Home/Login";
import Register from "../Pages/Home/Register";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Secret";

import Instructor from "../Pages/Home/Instructor";

import ClassLoader from "../Pages/Home/ClassLoader";
import Dashboard from "../Layout/Dashboard";
import MySelectedClass from "../Pages/Dashboard/MyCat/MySelectedClass";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AdminRoute from "./AdminRoute";
import AddClasses from "../Pages/Dashboard/AddClasses";
import InstructorRoute from "./InstructorRoute";
import MyAddedClasses from "../Pages/Dashboard/MyAddedClasses";
import UpdateClass from "../Pages/Dashboard/UpdateClass";
import Payment from "../Pages/Dashboard/Payment";




export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            path: "/",
            element:<Home></Home>, 
        },
        {
          path: "/login",
          element:<Login></Login>, 
       },
       {
        path: "/register",
        element:<Register></Register>,
       },
       {
        path: "/classes",
        element:<ClassLoader></ClassLoader>,
       },
       {
        path: "/instructors",
        element:<Instructor></Instructor>
       },
       {
        path: "/secret",
        element:<PrivateRoute><Secret></Secret></PrivateRoute>,
       },
      ]
    },
    {
      path: "/dashboard",
      element:<Dashboard></Dashboard>,

      children:[

        {
          path: "myCart",
          element:<MySelectedClass></MySelectedClass>,
    
        },
        {
          path: "allUsers",
          element:<AllUsers></AllUsers>,
    
        },
        {
          path: "payment",
          element:<Payment></Payment>
    
        },
        {
          path: 'addClasses',
          element: <InstructorRoute><AddClasses></AddClasses></InstructorRoute>,
        }, 
        {
          path: 'myAddedClasses',
          element: <InstructorRoute><MyAddedClasses></MyAddedClasses></InstructorRoute>,
        },
        {
          path: 'updateClass/:id',
          element: <InstructorRoute><UpdateClass></UpdateClass></InstructorRoute>,
          loader: ({params}) => fetch(`/http://localhost:5173/dashboard/classes/${params.id}`),
        }
      
      
      ]

    }
  ]);