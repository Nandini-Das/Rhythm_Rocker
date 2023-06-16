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


import Dashboard from "../Layout/Dashboard";
import MySelectedClass from "../Pages/Dashboard/MyCat/MySelectedClass";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AdminRoute from "./AdminRoute";
import AddClasses from "../Pages/Dashboard/AddClasses";
import InstructorRoute from "./InstructorRoute";
import MyAddedClasses from "../Pages/Dashboard/MyAddedClasses";
import UpdateClass from "../Pages/Dashboard/UpdateClass";
import Payment from "../Pages/Dashboard/Payment";
import MyEnrooledClasses from "../Pages/Dashboard/MyEnrooledClasses";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import StudentRoute from "./StudentRoute";
import ManageClasses from "../Pages/Dashboard/ManageClassses";
import Courses from "../Pages/Home/Courses";
import DashBoardHome from "../Pages/DashBoardHome";




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
        element:<Courses></Courses>,
       },
       {
        path: "/instructors",
        element:<Instructor></Instructor>
       },
       
      ]
    },
    {
      path: "/dashboard",
      element:<Dashboard></Dashboard>,

      children:[
        
        {
          path: "home",
          element:<DashBoardHome></DashBoardHome>,
    
        },

        {
          path: "myCart",
          element:<MySelectedClass></MySelectedClass>,
    
        },
        {
          path: "allUsers",
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
    
        },
        {
          path: "manageClasses",
          element:<ManageClasses></ManageClasses>
    
        },
        {
          path: "payment/:id",
          element:<Payment></Payment>,
          loader: ({params}) => fetch(`/http://localhost:5173/classes/${params.id}`),
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
          element: <UpdateClass></UpdateClass>,
         
        },
        {
          path: 'myEnrolledClasses',
          element:<MyEnrooledClasses></MyEnrooledClasses>,
          
        },   
        {
          path: 'myPayment',
          element:<PaymentHistory></PaymentHistory>,
          
        },
      
      
      ]

    }
  ]);