import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { routes } from "../../routes";

export default function InventoryIndexScreen() {
  return (
    <>
      <Text fontSize={"xl"} fontWeight="bold">
        Inventory index Screen
      </Text>
      <Link to={routes.inventory.stockChecks.root}>Pending checks</Link>
      <Link to={routes.inventory.stockCorrections.root}>Stock corrections</Link>
    </>
  );
}
