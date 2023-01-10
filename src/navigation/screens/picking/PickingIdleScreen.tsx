import { Box } from "@chakra-ui/react";
import { Form, Link, Outlet } from "react-router-dom";
import { Page } from "../../../ui/Page";
import { routes } from "../../router";

export default function PickingIdleScreen() {
  return (
    <Page>
      <h1>Picking Idle Screen</h1>
      <Link to={routes.picking.scanItems}>Go to scan items</Link>
    </Page>
  );
}
