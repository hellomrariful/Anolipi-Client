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
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/news",
        element: (
          <PrivateRoute>
            <News></News>
          </PrivateRoute>
        ),
      },
      {
        path: "/newsDetails",
        element: (
          <PrivateRoute>
            <NewsDetails></NewsDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/myNews",
        element: (
          <PrivateRoute>
            <MyNews></MyNews>
          </PrivateRoute>
        ),
      },
      {
        path: "updateNews/:id",
        element: (
          <PrivateRoute>
            <UpdateNews></UpdateNews>
          </PrivateRoute>
        ),
      },
      {
        path: "/addNews",
        element: (
          <PrivateRoute>
            <AddNews></AddNews>
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription",
        element: (
          <PrivateRoute>
            <Subscription></Subscription>
          </PrivateRoute>
        ),
      },
      {
        path: "/premium",
        element: (
          <PrivateRoute>
            <Premium></Premium>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <Dashboard></Dashboard>
      </AdminRoute>
    ),
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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminRoute from "./Routes/AdminRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import Premium from "./Pages/Premium/Premium";
import UpdateNews from "./Pages/MyNews/UpdateNews";
import News from "./Pages/News/News";
import NewsDetails from "./Pages/News/NewsDetails";

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
