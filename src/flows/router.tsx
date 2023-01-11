import { createBrowserRouter } from "react-router-dom";
import ErrorScreen from "./error/ErrorScreen";
import { StackNavigation } from "../core/navigation/StackNavigation";
import HomeScreen from "./home/HomeScreen";
import { BottomTabNavigation } from "../core/navigation/BottomTabNavigation";
import PickingIdleScreen from "./picking/screens/PickingIdleScreen";
import PickingScanItemsScreen from "./picking/screens/PickingScanItemsScreen";
import { Heading } from "@chakra-ui/react";
import PickingScanContainersScreen from "./picking/screens/PickingScanContainers";
import { XStatePickingProvider } from "./picking/machines/XstatePickingMachineProvider";
import { routes } from "./routes";

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
          <XStatePickingProvider>
            <StackNavigation
              rootPath={routes.picking.idle}
              headerTitle="Picking Stack"
            />
          </XStatePickingProvider>
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