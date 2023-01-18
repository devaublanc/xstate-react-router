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
import InboundIdleScreen from "./inbound/screens/InboundIdleScreen";
import InboundPreDroppingScreen from "./inbound/screens/InboundPreDroppingScreen";
import InboundDroppingScreen from "./inbound/screens/InboundDroppingScreen";
import InventoryIndexScreen from "./Inventory/screens/InventoryIndexScreen";
import InventoryStockChecksIdleScreen from "./Inventory/screens/stockChecks/InventoryStockChecksIdleScreen";
import InventoryStockCorrectionsIdleScreen from "./Inventory/screens/stockCorrections/InventoryStockCorrectionsIdleScreen";
import InventoryStockCorrectionsSearchResultScreen from "./Inventory/screens/stockCorrections/InventoryStockCorrectionsSearchResultScreen";
import { RecusiveNavigationObject } from "../core/navigation/types";
import { navigationToBrowserRouter } from "../core/navigation/navigationToBrowserRouter";
import InventoryStockChecksDetailScreen from "./Inventory/screens/stockChecks/InventoryStockChecksDetailScreen";

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
        title: "Home",
        path: "/",
        icon: <SearchIcon />,
        content: {
          Screen: {
            path: "/",
            title: "Home Screen",
            component: <HomeScreen />,
          },
        },
      },
      {
        title: "Inbound",
        path: "/inbound",
        icon: <TimeIcon />,
        content: {
          StackNavigation: {
            path: routes.inbound.root,
            defaultTitle: "Inbound Stack",
            screens: [
              {
                Screen: {
                  path: routes.inbound.root,
                  // title: "Inbound Idle Screen",
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
        icon: <SunIcon />,
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
                  path: routes.picking.root,

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
        icon: <TimeIcon />,
        content: {
          StackNavigation: {
            defaultHeaderElement: null,
            path: routes.inventory.root,
            screens: [
              {
                Screen: {
                  path: routes.inventory.root,
                  component: <InventoryIndexScreen />,
                },
              },
              {
                BottomTabNavigation: {
                  path: routes.inventory.stockChecks.root,
                  tabs: [
                    {
                      title: "Inventory StockChecks idle",
                      icon: <SearchIcon />,
                      path: routes.inventory.stockChecks.idle,
                      content: {
                        Screen: {
                          title: "Stock check idle Screen",
                          path: routes.inventory.stockChecks.idle,
                          component: <InventoryStockChecksIdleScreen />,
                        },
                      },
                    },
                    {
                      title: "Inventory StockChecks Detail",
                      icon: <SearchIcon />,
                      path: routes.inventory.stockChecks.detail,
                      content: {
                        Screen: {
                          title: "Stock check Detail Screen",
                          path: routes.inventory.stockChecks.detail,
                          component: <InventoryStockChecksDetailScreen />,
                        },
                      },
                    },
                  ],
                },
              },
              {
                StackNavigation: {
                  defaultTitle: "Stack navigation Stock checks",
                  path: routes.inventory.stockChecks.root,
                  screens: [
                    {
                      Screen: {
                        title: "Stock check idle Screen",
                        path: routes.inventory.stockChecks.root,
                        component: <InventoryStockChecksIdleScreen />,
                      },
                    },
                    {
                      Screen: {
                        title: "Stock check Detail Screen",
                        path: routes.inventory.stockChecks.detail,
                        component: <InventoryStockChecksDetailScreen />,
                      },
                    },
                  ],
                },
              },
              {
                StackNavigation: {
                  defaultTitle: "Stack navigation Stock corrections",
                  path: routes.inventory.stockCorrections.root,
                  screens: [
                    {
                      Screen: {
                        title: "Stock corrections idle Screen",
                        path: routes.inventory.stockCorrections.root,
                        component: <InventoryStockCorrectionsIdleScreen />,
                      },
                    },
                    {
                      Screen: {
                        title: "Stock corrections Search result Screen",
                        path: routes.inventory.stockCorrections.searchResult,
                        component: (
                          <InventoryStockCorrectionsSearchResultScreen />
                        ),
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    ],
  },
};

const generatedRoute = navigationToBrowserRouter(myRouter);

export const router = createBrowserRouter([generatedRoute]);
