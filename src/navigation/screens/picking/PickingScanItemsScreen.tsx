import { Link } from "react-router-dom";
import { Page } from "../../../ui/Page";

import { routes } from "../../router";

export default function PickingScanItemsScreen() {
  return (
    <Page>
      <h1>PickingScanItems Screen</h1>
      <Link to={routes.picking.scanContainers}>Go to scan container</Link>
    </Page>
  );
}
