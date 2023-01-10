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
import { Header } from "../../ui/Header";

export type StackContext = {
  setHeaderElement: (header: ReactElement) => void;
  setHeaderTitle?: (title: string) => void;
};

export type StackNavigationProps = {
  headerTitle?: string;
  rootPath: string;
  headerElement?: ReactElement;
};

export const StackContext = createContext<StackContext>({
  setHeaderElement: () => {},
});

export function StackNavigation({
  headerTitle,
  headerElement,
  rootPath,
}: StackNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [headerTitleState, setHeaderTitleState] = useState(
    headerTitle || "Stack"
  );

  const defaultHeader = useMemo(() => {
    return (
      <Header
        title={headerTitleState}
        onGoBack={
          // if current pathname === rootPath we are at the root level of the stack
          // we should not display the go back arrow
          rootPath !== location.pathname ? () => navigate(-1) : undefined
        }
      />
    );
  }, [location]);

  const [headerElementState, setHeaderElementState] =
    useState<ReactElement | null>(headerElement || defaultHeader);

  // if location is updatated we should re evaluate if the default Header
  useEffect(() => {
    if (headerElement === undefined) {
      setHeaderElementState(defaultHeader);
    }
  }, [location.pathname, headerElement]);

  const values = useMemo(
    () => ({
      setHeaderElement: setHeaderElementState,
      setHeaderTitle: setHeaderTitleState,
    }),
    [setHeaderElementState, setHeaderTitleState, location.pathname]
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
