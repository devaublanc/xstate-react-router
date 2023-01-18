import { Box, Flex, Text } from "@chakra-ui/react";
import { createContext, ReactElement, useContext, useMemo } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

export type BottomTabContext = {};

export type BottomTabProps = {
  headerElement?: ReactElement;
  items: {
    title: string;
    path: string;
    icon: ReactElement;
  }[];
};

export const BottomTabContext = createContext<BottomTabContext>({});

export function BottomTabNavigation({ items, headerElement }: BottomTabProps) {
  const values = useMemo(() => ({}), []);
  const location = useLocation();

  const isVisible =
    items.some(item => item.path === location.pathname) ||
    location.pathname === "/";

  return (
    <BottomTabContext.Provider value={values}>
      <Flex bg="white" flexDir={"column"} flex={1} h="100%">
        {headerElement}
        <Flex flexDir={"column"} flex={1}>
          <Outlet />
        </Flex>
        {isVisible && (
          <Flex
            justify={"space-around"}
            p="2"
            borderTopColor={"gray"}
            borderTopWidth={1}
          >
            {items.map(item => (
              <NavLink to={item.path} key={item.path + item.title}>
                <Flex align={"center"} gap={1} fontSize="12px">
                  {item.icon} <Text>{item.title}</Text>
                </Flex>
              </NavLink>
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
