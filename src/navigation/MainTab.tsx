import { Box, Flex } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

export default function MainTab() {
  return (
    <Flex bg="#9d109d" flexDir={"column"} flex={1} h="100%">
      <Box color="white" p="10">
        GOBAL HEADER
      </Box>
      <Flex flexDir={"column"} flex={1}>
        <Outlet />
      </Flex>
      <Flex justify={"space-around"} p="10">
        <Link to={`picking`}>Picking</Link>
        <Link to={`inbound`}>Inbound</Link>
      </Flex>
    </Flex>
  );
}
