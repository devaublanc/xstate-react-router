import { ReactElement } from "react";

export type CustomWrapper = ({
  children,
}: {
  children: ReactElement;
}) => JSX.Element;

export type RecusiveNavigationObject =
  | {
      BottomTabNavigation: {
        path: string;
        headerElement: ReactElement;
        tabs: {
          path: string;
          title: string;
          icon: ReactElement;
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
