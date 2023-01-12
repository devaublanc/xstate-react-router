import { Flex } from "@chakra-ui/react";
import { ReactElement, useEffect } from "react";

import { StackNavigationProps, useStackContext } from "./StackNavigation";

export type StackContext = {
  setHeaderElement: (header: ReactElement) => void;
  setHeaderTitle: (title: string) => void;
};

export type StackNavigationScreenProps = {
  headerTitle: string;
  children: ReactElement | ReactElement[];
};

export function StackNavigationScreen({
  headerTitle,
  children,
}: StackNavigationScreenProps) {
  const { setHeaderTitle } = useStackContext();

  useEffect(() => {
    setHeaderTitle(headerTitle);
  }, [headerTitle]);

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
