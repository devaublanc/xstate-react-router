import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";

import "./index.css";
import HomeScreen from "./navigation/HomeScreen";
import PickingIdleScreen from "./navigation/screens/picking/PickingIdleScreen";
import MainTab from "./navigation/MainTab";
import PickingScanItemsScreen from "./navigation/screens/picking/PickingScanItemsScreen";
import { StackNavigation } from "./navigation/core/StackNavigation";

export const routes = {
  root: "/",
  picking: {
    root: "picking",
    scanItems: "scan-items",
  },
};

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
        path: routes.picking.root,
        element: (
          <StackNavigation
            rootPath={`/${routes.picking.root}`}
            headerTitle="Picking Stack"
          />
        ),
        children: [
          {
            index: true,
            element: <PickingIdleScreen />,
          },
          {
            path: routes.picking.scanItems,
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
