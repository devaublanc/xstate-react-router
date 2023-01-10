import { createBrowserRouter } from "react-router-dom";
import ErrorScreen from "./ErrorScreen";
import { StackNavigation } from "./core/StackNavigation";
import HomeScreen from "./HomeScreen";
import { BottomTabNavigation } from "./core/BottomTabNavigation";
import PickingIdleScreen from "./screens/picking/PickingIdleScreen";
import PickingScanItemsScreen from "./screens/picking/PickingScanItemsScreen";

export const routes = {
  root: "/",
  picking: {
    root: "picking",
    scanItems: "scan-items",
  },
  inbound: {
    root: "inbound",
    preDropping: "pre-dropping",
    dropping: "dropping",
  },
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BottomTabNavigation
        items={[
          {
            id: "picking",
            path: routes.picking.root,
            title: "Picking",
          },
          {
            id: "inbound",
            path: routes.inbound.root,
            title: "Inbound",
          },
        ]}
      />
    ),
    errorElement: <ErrorScreen />,
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
