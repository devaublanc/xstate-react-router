import { Flex } from "@chakra-ui/react";
import {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../ui/Header";

export type StackContext = {
  setHeaderElement?: (header: ReactElement) => void;
  setHeaderTitle?: (title: string) => void;
};

export type StackProviderProps = {
  headerTitle?: string;
  headerElement?: ReactElement;
};

export const StackContext = createContext<StackContext>({});

export function StackProvider({
  headerTitle,
  headerElement,
}: StackProviderProps) {
  const [headerTitleState, setHeaderTitleState] = useState(
    headerTitle || "Stack"
  );

  const [headerElementState, setHeaderElementState] =
    useState<ReactElement | null>(
      headerElement || <Header title={headerTitleState} />
    );

  const values = useMemo(
    () => ({
      setHeaderElement: setHeaderElementState,
      setHeaderTitle: setHeaderTitleState,
    }),
    [setHeaderElementState, setHeaderTitleState]
  );

  return (
    <StackContext.Provider value={values}>
      <Flex flexDir={"column"} flex={1} bg="red">
        {headerElementState}
        <Outlet />
      </Flex>
    </StackContext.Provider>
  );
}

export function useStackContext() {
  return useContext(StackContext);
}
