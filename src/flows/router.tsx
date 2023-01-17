import { createBrowserRouter, Link, RouteObject } from "react-router-dom";
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

type CustomWrapper = ({ children }: { children: ReactElement }) => JSX.Element;

type RecusiveNavigationObject =
  | {
      BottomTabNavigation: {
        path: string;
        headerElement: ReactElement;
        tabs: {
          path: string;
          title: string;
          content: RecusiveNavigationObject;
        }[];
      };
    }
  | {
      StackNavigation: {
        path: string;
        defaultTitle: string;
        customWrapper?: CustomWrapper;
        screens: RecusiveNavigationObject[];
      };
    }
  | {
      Screen: {
        title: string;
        path: string;
        component: ReactElement;
      };
    };

const myRouter: RecusiveNavigationObject = {
  BottomTabNavigation: {
    path: "/",
    headerElement: (
      <Heading p="2">
        <Link to="/">Hub One</Link>
      </Heading>
    ),
    tabs: [
      {
        title: "Inbound",
        path: "/inbound",
        content: {
          StackNavigation: {
            path: routes.inbound.root,
            defaultTitle: "Inbound Stack",
            screens: [
              {
                Screen: {
                  path: routes.inbound.idle,
                  title: "Inbound Idle Screen",
                  component: <InboundIdleScreen />,
                },
              },
              {
                Screen: {
                  path: routes.inbound.preDropping,
                  title: "Inbound pre dropping screen",
                  component: <InboundPreDroppingScreen />,
                },
              },
              {
                Screen: {
                  path: routes.inbound.dropping,
                  title: "Inbound dropping screen",
                  component: <InboundDroppingScreen />,
                },
              },
            ],
          },
        },
      },
      {
        title: "Picking",
        path: "/picking",
        content: {
          StackNavigation: {
            path: routes.picking.root,
            defaultTitle: "Picking Stack",
            customWrapper: ({ children }) => (
              <XStatePickingProvider>{children}</XStatePickingProvider>
            ),
            screens: [
              {
                Screen: {
                  path: routes.picking.idle,

                  title: "Picking Idle Screen",
                  component: <PickingIdleScreen />,
                },
              },
              {
                Screen: {
                  path: routes.picking.scanItems,
                  title: "Picking Scan Items Screen",
                  component: <PickingScanItemsScreen />,
                },
              },
              {
                Screen: {
                  path: routes.picking.scanContainers,

                  title: "Picking Scan Containers Screen",
                  component: <PickingScanContainersScreen />,
                },
              },
            ],
          },
        },
      },
      {
        title: "Inventory",
        path: "/inventory",
        content: {
          StackNavigation: {
            defaultTitle: "Inventory",
            path: routes.inventory.root,
            screens: [
              {
                StackNavigation: {
                  defaultTitle: "Stack navigation Stock checks",
                  path: routes.inventory.stockChecks.root,
                  screens: [
                    {
                      Screen: {
                        title: "Stock check idle Screen",
                        path: routes.inventory.stockChecks.idle,
                        component: <InventoryStockCorrectionsIdleScreen />,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
      {
        title: "Home",
        path: "/home",
        content: {
          Screen: {
            path: "/home",
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
    const stack = (
      <StackNavigation
        rootPath={myRoutes.StackNavigation.path}
        defaultHeaderTitle={myRoutes.StackNavigation.defaultTitle}
      />
    );
    result = {
      path: myRoutes.StackNavigation.path,
      element: myRoutes.StackNavigation.customWrapper
        ? myRoutes.StackNavigation.customWrapper({ children: stack })
        : stack,
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

export const router = createBrowserRouter([generatedRoute]);
