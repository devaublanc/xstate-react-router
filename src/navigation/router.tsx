import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import { StackNavigation } from "./core/StackNavigation";
import HomeScreen from "./HomeScreen";
import MainTab from "./MainTab";
import PickingIdleScreen from "./screens/picking/PickingIdleScreen";
import PickingScanItemsScreen from "./screens/picking/PickingScanItemsScreen";

export const routes = {
  root: "/",
  picking: {
    root: "picking",
    scanItems: "scan-items",
  },
};

export const router = createBrowserRouter([
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
