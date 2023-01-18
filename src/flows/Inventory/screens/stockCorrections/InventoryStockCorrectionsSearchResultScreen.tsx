import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { routes } from "../../../routes";

export default function InventoryStockCorrectionsSearchResultScreen() {
  return (
    <>
      <Text fontSize={"xl"} textAlign="center" fontWeight="bold">
        Inventory Stock corrections Search result
      </Text>
      <Link to={routes.inventory.stockCorrections.root} replace={true}>
        Finish
      </Link>
    </>
  );
}
