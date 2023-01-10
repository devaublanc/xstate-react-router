import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Page } from "../../../ui/Page";
import { useStackContext } from "../../core/StackNavigation";

export default function PickingScanItemsScreen() {
  return (
    <Page>
      <h1>PickingScanItems Screen</h1>
    </Page>
  );
}
