import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStackContext } from "../../../core/navigation/StackNavigation";
import { Page } from "../../../core/ui/Page";
import { routes } from "../../routes";

export default function PickingScanItemsScreen() {
  const { setHeaderTitle } = useStackContext();

  useEffect(() => {
    console.log("asdasds");
    setHeaderTitle("Scan Items");
  }, []);
  return (
    <Page>
      <h1>PickingScanItems Screen</h1>
      <Link to={routes.picking.scanContainers}>Go to scan container</Link>
    </Page>
  );
}
