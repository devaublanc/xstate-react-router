import { Flex } from "@chakra-ui/react";
import {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";
import { Header } from "../../components/Header";

export type StackContext = {
  setHeaderElement?: (header: ReactElement) => void;
  setHeaderTitle?: (title: string) => void;
};

export type StackProviderProps = {
  headerTitle?: string;
  headerElement?: ReactElement;
  children: ReactElement;
};

export const StackContext = createContext<StackContext>({});

export function StackProvider({
  children,
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

  console.log(headerElementState);
  return (
    <StackContext.Provider value={values}>
      <Flex flexDir={"column"} flex={1} bg="red">
        Stack
        {headerElementState}
        {children}
      </Flex>
    </StackContext.Provider>
  );
}

export function useStackContext() {
  return useContext(StackContext);
}
