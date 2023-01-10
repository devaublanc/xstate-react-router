import { Box, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";

export type PageProps = {
  children: ReactElement;
};
export function Page({ children }: PageProps) {
  return (
    <Flex flexDir={"column"} bg="grey" flex={1}>
      {children}
    </Flex>
  );
}
