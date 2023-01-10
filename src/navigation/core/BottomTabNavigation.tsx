import { Box, Flex } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export type BottomTabContext = {
  setBottomTabVisible: (isVisible: boolean) => void;
};

export type BottomTabProps = {
  items: {
    id: string;
    title: string;
    path: string;
  }[];
};

export const BottomTabContext = createContext<BottomTabContext>({
  setBottomTabVisible: () => {},
});

export function BottomTabNavigation({ items }: BottomTabProps) {
  const location = useLocation();

  const [bottomTabVisibleState, setBottomTabVisibleState] = useState(
    items.some(item => `/${item.path}` === location.pathname) ||
      location.key === "default"
  );

  useEffect(() => {
    // Do not display the bottomTab if the pathname does not match
    // with one of the pathname provided on the items prop
    setBottomTabVisibleState(
      items.some(item => `/${item.path}` === location.pathname) ||
        location.pathname === "/"
    );
  }, [location.pathname, items]);

  const values = useMemo(
    () => ({
      setBottomTabVisible: setBottomTabVisibleState,
    }),
    [setBottomTabVisibleState, bottomTabVisibleState]
  );
  return (
    <BottomTabContext.Provider value={values}>
      <Flex bg="#9d109d" flexDir={"column"} flex={1} h="100%">
        <Box color="white" p="10">
          GOBAL HEADER
        </Box>
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
