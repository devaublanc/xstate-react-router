import { createBrowserRouter } from "react-router-dom";
import ErrorScreen from "./ErrorScreen";
import { StackNavigation } from "./core/StackNavigation";
import HomeScreen from "./HomeScreen";
import { BottomTabNavigation } from "./core/BottomTabNavigation";
import PickingIdleScreen from "./screens/picking/PickingIdleScreen";
import PickingScanItemsScreen from "./screens/picking/PickingScanItemsScreen";
import { Box, Heading } from "@chakra-ui/react";
import PickingScanContainersScreen from "./screens/picking/PickingScanContainers";

export const routes = {
  root: "/",
  picking: {
    root: "picking",
    scanItems: "/picking/scan-items",
    scanContainers: "/picking/scan-containers",
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
        headerElement={<Heading>Global Header</Heading>}
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
          {
            path: routes.picking.scanContainers,
            element: <PickingScanContainersScreen />,
          },
        ],
      },
    ],
  },
]);
