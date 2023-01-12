import { createBrowserRouter, Link } from "react-router-dom";
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
import { SearchIcon, SunIcon, TimeIcon } from "@chakra-ui/icons";
import { StackNavigationScreen } from "../core/navigation/StackNavigationScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BottomTabNavigation
        headerElement={
          <Heading p="2">
            <Link to="/">Hub One</Link>
          </Heading>
        }
        items={[
          {
            id: "home",
            path: routes.root,
            title: "Home",
            icon: <SearchIcon />,
          },
          {
            id: "picking",
            path: routes.picking.idle,
            title: "PickingStack driven by XState",
            icon: <SunIcon />,
          },
          {
            id: "inbound",
            path: routes.inbound.idle,
            title: "Inbound",
            icon: <TimeIcon />,
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
              defaultHeaderTitle="Picking Stack"
            />
          </XStatePickingProvider>
        ),
        children: [
          {
            index: true,
            element: (
              <StackNavigationScreen headerTitle="Idle">
                <PickingIdleScreen />
              </StackNavigationScreen>
            ),
          },
          {
            path: routes.picking.scanItems,
            element: (
              <StackNavigationScreen headerTitle="Scan items">
                <PickingScanItemsScreen />
              </StackNavigationScreen>
            ),
          },
          {
            path: routes.picking.scanContainers,
            element: (
              <StackNavigationScreen headerTitle="Scan containers">
                <PickingScanContainersScreen />
              </StackNavigationScreen>
            ),
          },
        ],
      },
    ],
  },
]);
