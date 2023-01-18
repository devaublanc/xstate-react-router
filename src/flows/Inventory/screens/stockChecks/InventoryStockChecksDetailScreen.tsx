import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { routes } from "../../../routes";

export default function InventoryStockChecksDetailScreen() {
  return (
    <>
      <Text fontSize={"xl"} fontWeight="bold">
        Inventory StockCheck Detail Screen
      </Text>
      <Link to={routes.inventory.stockChecks.detail}>
        go to stock checks detail
      </Link>
    </>
  );
}
