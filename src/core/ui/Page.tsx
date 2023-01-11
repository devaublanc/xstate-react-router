import { Box, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";

export type PageProps = {
  children: ReactElement | ReactElement[];
};
export function Page({ children }: PageProps) {
  return (
    <Flex
      flexDir={"column"}
      padding="15px"
      justify={"center"}
      align="center"
      bg="#c2c2c2"
      flex={1}
    >
      {children}
    </Flex>
  );
}
