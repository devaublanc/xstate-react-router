import { Box, Flex } from "@chakra-ui/react";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export type BottomTabContext = {
  setBottomTabVisible: (isVisible: boolean) => void;
  setIsHeaderElementVisible: (isVisible: boolean) => void;
};

export type BottomTabProps = {
  headerElement?: ReactElement;
  items: {
    id: string;
    title: string;
    path: string;
  }[];
};

export const BottomTabContext = createContext<BottomTabContext>({
  setBottomTabVisible: () => {},
  setIsHeaderElementVisible: () => {},
});

export function BottomTabNavigation({ items, headerElement }: BottomTabProps) {
  const location = useLocation();

  const isLocationAtRootLevel =
    items.some(item => `/${item.path}` === location.pathname) ||
    location.key === "default";

  const [bottomTabVisibleState, setBottomTabVisibleState] = useState(
    isLocationAtRootLevel
  );

  const [isHeaderElementVisibleState, setIsHeaderElementVisibleState] =
    useState(isLocationAtRootLevel);

  useEffect(() => {
    // Do not display the bottomTab if the pathname does not match
    // with one of the pathname provided on the items prop
    setBottomTabVisibleState(isLocationAtRootLevel);
  }, [isLocationAtRootLevel]);

  const values = useMemo(
    () => ({
      setBottomTabVisible: setBottomTabVisibleState,
      setIsHeaderElementVisible: setIsHeaderElementVisibleState,
    }),
    [setBottomTabVisibleState, setIsHeaderElementVisibleState]
  );
  return (
    <BottomTabContext.Provider value={values}>
      <Flex bg="#9d109d" flexDir={"column"} flex={1} h="100%">
        {isHeaderElementVisibleState &&
          headerElement !== undefined &&
          headerElement}
        <Flex flexDir={"column"} flex={1}>
          <Outlet />
        </Flex>
        {bottomTabVisibleState && (
          <Flex justify={"space-around"} p="10">
            {items.map(item => (
              <Link to={item.path} key={item.id}>
                {item.title}
              </Link>
            ))}
          </Flex>
        )}
      </Flex>
    </BottomTabContext.Provider>
  );
}

export function useBottomTabContext() {
  return useContext(BottomTabContext);
}
