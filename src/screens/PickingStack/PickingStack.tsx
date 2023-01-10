import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { StackProvider } from "../contexts/StackContext";

export default function PickingStack() {
  return (
    <StackProvider headerTitle="Picking">
      <Flex flexDir={"column"} bg="red" flex={1}>
        <Outlet />
      </Flex>
    </StackProvider>
  );
}
