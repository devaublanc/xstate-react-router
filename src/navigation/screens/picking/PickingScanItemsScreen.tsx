import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Page } from "../../../ui/Page";

export default function PickingScanItemsScreen() {
  return (
    <Page>
      <h1>PickingScanItems Screen</h1>
      <Outlet />
    </Page>
  );
}
