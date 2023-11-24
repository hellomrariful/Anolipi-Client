import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Layout/Root";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import AuthProvider from "./Providers/AuthProvider";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import MyNews from "./Pages/MyNews/MyNews";
import AddNews from "./Pages/AddNews/AddNews";
import Subscription from "./Pages/Subscription/Subscription";
import Dashboard from "./Layout/Dashboard";
import Users from "./Pages/Dashboard/Users";
import Newses from "./Pages/Dashboard/Newses";
import Publisher from "./Pages/Dashboard/Publisher";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/myNews",
        element: <MyNews></MyNews>,
      },
      {
        path: "/addNews",
        element: <AddNews></AddNews>,
      },
      {
        path: "/subscription",
        element: <Subscription></Subscription>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "allUsers",
        element: <Users></Users>,
      },
      {
        path: "newses",
        element: <Newses></Newses>,
      },
      {
        path: "publisher",
        element: <Publisher></Publisher>,
      },
    ],
  },
]);

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
