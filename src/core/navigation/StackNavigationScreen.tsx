import { Flex } from "@chakra-ui/react";
import { ReactElement, useEffect } from "react";

import { useStackContext } from "./StackNavigation";

export type StackContext = {
  setHeaderElement: (header: ReactElement) => void;
  setHeaderTitle: (title: string) => void;
};

export type StackNavigationScreenProps = {
  headerTitle?: string;
  children: ReactElement | ReactElement[];
};

export function StackNavigationScreen({
  headerTitle,

  children,
}: StackNavigationScreenProps) {
  const { setHeaderTitle, defaultHeaderTitle } = useStackContext();
  useEffect(() => {
    // console.log(location.pathname === rootPath);
    if (headerTitle) {
      setHeaderTitle(headerTitle);
    } else if (defaultHeaderTitle) {
      setHeaderTitle(defaultHeaderTitle);
    } else {
      setHeaderTitle("");
    }
  }, [headerTitle, defaultHeaderTitle]);

  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      align="center"
      bg="#c2c2c2"
      flex={1}
    >
      {children}
    </Flex>
  );
}
