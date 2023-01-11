import { createBrowserRouter } from "react-router-dom";
import ErrorScreen from "./ErrorScreen";
import { StackNavigation } from "../core/navigation/StackNavigation";
import HomeScreen from "./HomeScreen";
import { BottomTabNavigation } from "../core/navigation/BottomTabNavigation";
import PickingIdleScreen from "./screens/picking/screens/PickingIdleScreen";
import PickingScanItemsScreen from "./screens/picking/screens/PickingScanItemsScreen";
import { Heading } from "@chakra-ui/react";
import PickingScanContainersScreen from "./screens/picking/screens/PickingScanContainers";

export const routes = {
  root: "/",
  picking: {
    idle: "picking",
    scanItems: "/picking/scan-items",
    scanContainers: "/picking/scan-containers",
  },
  inbound: {
    idle: "inbound",
    preDropping: "pre-dropping",
    dropping: "dropping",
  },
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BottomTabNavigation
        headerElement={<Heading>Global Header</Heading>}
        items={[
          {
            id: "picking",
            path: routes.picking.idle,
            title: "Picking",
          },
          {
            id: "inbound",
            path: routes.inbound.idle,
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
        path: routes.picking.idle,
        element: (
          <StackNavigation
            rootPath={`/${routes.picking.idle}`}
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
          {
            path: routes.picking.scanContainers,
            element: <PickingScanContainersScreen />,
          },
        ],
      },
    ],
  },
]);
