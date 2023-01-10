import { Box } from "@chakra-ui/react";
import { Form, Link, Outlet } from "react-router-dom";
import { Page } from "../../../ui/Page";

export default function PickingIdleScreen() {
  return (
    <Page>
      <h1>Picking Idle Screen</h1>
      <Link to="scan-items">Go to scan items</Link>
    </Page>
  );
}
