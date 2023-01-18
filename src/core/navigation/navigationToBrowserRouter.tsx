import { RouteObject } from "react-router-dom";
import { RecusiveNavigationObject } from "./types";
import { StackNavigation } from "./StackNavigation";
import { BottomTabNavigation } from "./BottomTabNavigation";
import { StackNavigationScreen } from "./StackNavigationScreen";

export const navigationToBrowserRouter = (
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
            icon: tab.icon,
            path: tab.path,
            title: tab.title,
          }))}
        />
      ),
      children: myRoutes.BottomTabNavigation.tabs.map(({ content }) =>
        navigationToBrowserRouter(content)
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
        navigationToBrowserRouter(screen)
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
