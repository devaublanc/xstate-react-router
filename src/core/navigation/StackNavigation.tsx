import { Flex } from "@chakra-ui/react";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../ui/Header";

export type StackContext = {
  setHeaderElement: (header: ReactElement) => void;
  setHeaderTitle: (title: string) => void;
};

export type StackNavigationProps = {
  defaultHeaderTitle?: string;
  rootPath: string;
  defaultHeaderElement?: ReactElement;
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
    }),
    [setHeaderElement, setHeaderTitle]
  );

  // useEffect(() => {
  //   setHeaderTitle(defaultHeaderTitle);
  // }, [location.pathname]);

  return (
    <StackContext.Provider value={values}>
      <Flex flexDir={"column"} flex={1} bg="red">
        {headerElement ? (
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
