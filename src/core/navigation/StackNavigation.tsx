import { Flex } from "@chakra-ui/react";
import {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../ui/Header";

export type StackContext = {
  setHeaderElement: (header: ReactElement) => void;
  setHeaderTitle: (title: string) => void;
  defaultHeaderElement?: ReactElement | null;
  defaultHeaderTitle?: string;
};

export type StackNavigationProps = {
  defaultHeaderTitle?: string;
  rootPath: string;
  defaultHeaderElement?: ReactElement | null;
};

export const StackContext = createContext<StackContext>({
  setHeaderElement: () => {},
  setHeaderTitle: () => {},
});

export function StackNavigation({
  defaultHeaderTitle,
  defaultHeaderElement,
  rootPath,
}: StackNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [headerTitle, setHeaderTitle] = useState(defaultHeaderTitle);

  const [headerElement, setHeaderElement] = useState<
    ReactElement | null | undefined
  >(defaultHeaderElement);

  const values = useMemo(
    () => ({
      setHeaderElement,
      setHeaderTitle,
      defaultHeaderTitle,
      defaultHeaderElement,
    }),
    [setHeaderElement, setHeaderTitle, defaultHeaderTitle, defaultHeaderElement]
  );

  console.log({ headerElement });

  return (
    <StackContext.Provider value={values}>
      <Flex flexDir={"column"} flex={1} bg="red">
        {headerElement !== undefined ? (
          headerElement
        ) : (
          <Header
            title={headerTitle}
            onGoBack={
              // if current pathname === rootPath we are at the root level of the stack
              // we should not display the go back arrow
              rootPath !== location.pathname ? () => navigate(-1) : undefined
            }
          />
        )}

        <Outlet />
      </Flex>
    </StackContext.Provider>
  );
}

export function useStackContext() {
  return useContext(StackContext);
}
