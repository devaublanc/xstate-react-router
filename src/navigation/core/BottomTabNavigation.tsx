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

export type BottomTabContext = {};

export type BottomTabProps = {
  headerElement?: ReactElement;
  items: {
    id: string;
    title: string;
    path: string;
  }[];
};

export const BottomTabContext = createContext<BottomTabContext>({});

export function BottomTabNavigation({ items, headerElement }: BottomTabProps) {
  const values = useMemo(() => ({}), []);
  return (
    <BottomTabContext.Provider value={values}>
      <Flex bg="#9d109d" flexDir={"column"} flex={1} h="100%">
        {headerElement}
        <Flex flexDir={"column"} flex={1}>
          <Outlet />
        </Flex>

        <Flex justify={"space-around"} p="10">
          {items.map(item => (
            <Link to={item.path} key={item.id}>
              {item.title}
            </Link>
          ))}
        </Flex>
      </Flex>
    </BottomTabContext.Provider>
  );
}

export function useBottomTabContext() {
  return useContext(BottomTabContext);
}
