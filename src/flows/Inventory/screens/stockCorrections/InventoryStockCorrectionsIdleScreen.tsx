import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { routes } from "../../../routes";

export default function InventoryStockCorrectionsIdleScreen() {
  return (
    <>
      <Text fontSize={"xl"} fontWeight="bold">
        Inventory Stock corrections Idle
      </Text>
      <Link to={routes.inventory.stockCorrections.searchResult}>
        go to search result
      </Link>
    </>
  );
}
