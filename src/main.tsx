import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";

import "./index.css";
import HomeScreen from "./screens/HomeScreen";
import PickingIdleScreen from "./screens/PickingStack/screens/PickingIdleScreen";
import MainTab from "./screens/MainTab";
import PickingStack from "./screens/PickingStack/PickingStack";
import PickingScanItemsScreen from "./screens/PickingStack/screens/PickingScanItemsScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainTab />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "picking",
        element: <PickingStack />,
        children: [
          {
            index: true,
            element: <PickingIdleScreen />,
          },
          {
            path: "scan-items",
            element: <PickingScanItemsScreen />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
