import {
  createBrowserRouter,
  Link,
  BrowserRouter,
  RouteObject,
  Route,
} from "react-router-dom";
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
import { ReactElement } from "react";

type RecusiveNavigationObject =
  | {
      BottomTabNavigation: {
        id: string;
        path: string;
        headerElement: ReactElement;
        tabs: {
          id: string;
          path: string;
          title: string;
          content: RecusiveNavigationObject;
        }[];
      };
    }
  | {
      StackNavigation: {
        id: string;
        path: string;
        defaultTitle: string;
        screens: RecusiveNavigationObject[];
      };
    }
  | {
      Screen: {
        id: string;
        title: string;
        path: string;
        component: ReactElement;
      };
    };

const myRouter: RecusiveNavigationObject = {
  BottomTabNavigation: {
    id: "main",
    path: "/",
    headerElement: (
      <Heading p="2">
        <Link to="/">Hub One</Link>
      </Heading>
    ),
    tabs: [
      {
        title: "Inbound",
        id: "InboundTab",
        path: "/inbound",
        content: {
          StackNavigation: {
            id: "InboundStack",
            path: routes.inbound.root,
            defaultTitle: "Inbound Stack",
            screens: [
              {
                Screen: {
                  path: routes.inbound.idle,
                  id: "pickingIdleScreen",
                  title: "Picking Idle Screen",
                  component: <InboundIdleScreen />,
                },
              },
              {
                Screen: {
                  path: routes.inbound.preDropping,
                  id: "inboundPreDroppingScreen",
                  title: "Inbound pre dropping screen",
                  component: <InboundPreDroppingScreen />,
                },
              },
              {
                Screen: {
                  path: routes.inbound.dropping,
                  id: "inboundDroppingScreen",
                  title: "Inbound dropping screen",
                  component: <InboundDroppingScreen />,
                },
              },
            ],
          },
        },
      },
      {
        title: "Home",
        id: "HomeTab",
        path: "/home",
        content: {
          Screen: {
            path: "/home",
            id: "homeScreen",
            title: "Home Screen",
            component: <HomeScreen />,
          },
        },
      },
    ],
  },
};

const recursiveToBrowserRouter = (
  myRoutes: RecusiveNavigationObject
): RouteObject => {
  let result: RouteObject = {};

  if ("BottomTabNavigation" in myRoutes) {
    result = {
      path: myRoutes.BottomTabNavigation.path,
      element: (
        <BottomTabNavigation
          headerElement={myRoutes.BottomTabNavigation.headerElement}
          items={myRoutes.BottomTabNavigation.tabs.map(tab => ({
            id: tab.id,
            icon: <SearchIcon />,
            path: tab.path,
            title: tab.title,
          }))}
        />
      ),
      children: myRoutes.BottomTabNavigation.tabs.map(({ content }) =>
        recursiveToBrowserRouter(content)
      ),
    };
  }

  if ("StackNavigation" in myRoutes) {
    result = {
      path: myRoutes.StackNavigation.path,
      element: (
        <StackNavigation
          rootPath={myRoutes.StackNavigation.path}
          defaultHeaderTitle={myRoutes.StackNavigation.defaultTitle}
        />
      ),
      children: myRoutes.StackNavigation.screens.map(screen =>
        recursiveToBrowserRouter(screen)
      ),
    };
  }

  if ("Screen" in myRoutes) {
    result = {
      path: myRoutes.Screen.path,
      element: (
        <StackNavigationScreen headerTitle={myRoutes.Screen.title}>
          {myRoutes.Screen.component}
        </StackNavigationScreen>
      ),
    };
  }

  return result;
};

const generatedRoute = recursiveToBrowserRouter(myRouter);

// export const router = createBrowserRouter([generatedRoute]);
const expected = {
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
};

console.log({ generatedRoute, expected });

export const router = createBrowserRouter([generatedRoute]);
