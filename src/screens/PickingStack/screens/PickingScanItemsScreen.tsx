import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function PickingScanItemsScreen() {
  return (
    <Box bg="pink">
      <h1>PickingScanItems Screen</h1>
      <Outlet />
    </Box>
  );
}
