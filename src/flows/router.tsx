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
import InboundIdleScreen from "./inbound/screens/InboundIdleScreen";
import InboundPreDroppingScreen from "./inbound/screens/InboundPreDroppingScreen";
import InboundDroppingScreen from "./inbound/screens/InboundDroppingScreen";
import InventoryIndexScreen from "./Inventory/screens/InventoryIndexScreen";
import InventoryStockChecksIdleScreen from "./Inventory/screens/stockChecks/InventoryStockChecksIdleScreen";
import InventoryStockCorrectionsIdleScreen from "./Inventory/screens/stockCorrections/InventoryStockCorrectionsIdleScreen";
import InventoryStockCorrectionsSearchResultScreen from "./Inventory/screens/stockCorrections/InventoryStockCorrectionsSearchResultScreen";

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
            path: routes.inbound.root,
            title: "InboundStack driven by React Router",
            icon: <TimeIcon />,
          },
          {
            id: "inventory",
            path: routes.inventory.root,
            title: "InventoryStack driven by React Router then Xstate",
            icon: <TimeIcon />,
          },
        ]}
      />
    ),

    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      // INBOUND
      {
        path: routes.inbound.root,
        element: (
          <StackNavigation
            rootPath={routes.inbound.root}
            defaultHeaderTitle="Inbound Stack"
          />
        ),
        children: [
          {
            index: true,
            element: (
              <StackNavigationScreen headerTitle="Idle">
                <InboundIdleScreen />
              </StackNavigationScreen>
            ),
          },
          {
            path: routes.inbound.preDropping,
            element: (
              <StackNavigationScreen headerTitle="Pre dropping">
                <InboundPreDroppingScreen />
              </StackNavigationScreen>
            ),
          },
          {
            path: routes.inbound.dropping,
            element: (
              <StackNavigationScreen headerTitle="Dropping">
                <InboundDroppingScreen />
              </StackNavigationScreen>
            ),
          },
        ],
      },
      // PICKING
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
      // INVENTORY
      {
        path: routes.inventory.root,
        element: (
          <StackNavigation
            rootPath={routes.inventory.root}
            defaultHeaderTitle="Inventory Stack"
          />
        ),
        children: [
          {
            index: true,
            element: (
              <StackNavigationScreen headerTitle="Inventory">
                <InventoryIndexScreen />
              </StackNavigationScreen>
            ),
          },
          {
            path: routes.inventory.stockChecks.root,
            element: (
              <StackNavigationScreen headerTitle="Stock checks idle">
                <InventoryStockChecksIdleScreen />
              </StackNavigationScreen>
            ),
          },
          {
            path: routes.inventory.stockCorrections.root,
            element: (
              <StackNavigation
                rootPath={routes.inventory.stockCorrections.root}
                defaultHeaderTitle="Inventory Stack"
              />
            ),
            children: [
              {
                index: true,
                element: (
                  <StackNavigationScreen headerTitle="Stock corrections idle">
                    <InventoryStockCorrectionsIdleScreen />
                  </StackNavigationScreen>
                ),
              },
              {
                path: routes.inventory.stockCorrections.searchResult,
                element: (
                  <StackNavigationScreen headerTitle="Stock corrections search result">
                    <InventoryStockCorrectionsSearchResultScreen />
                  </StackNavigationScreen>
                ),
              },
            ],
          },
        ],
      },
    ],
    errorElement: <ErrorScreen />,
  },
]);
