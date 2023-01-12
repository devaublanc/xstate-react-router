import { Button, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStackContext } from "../../../core/navigation/StackNavigation";
import { Page } from "../../../core/ui/Page";
import { routes } from "../../routes";
import { Info } from "../components/Info";
import { usePickingService } from "../machines/XstatePickingMachineProvider";

export default function PickingScanItemsScreen() {
  const { setHeaderTitle } = useStackContext();
  const pickingService = usePickingService();

  useEffect(() => {
    setHeaderTitle("Scan Items");
  }, []);
  return (
    <Page>
      <Text fontSize={"xl"} fontWeight="bold">
        Scan items page
      </Text>
      <Info />
      <Button
        mt="10"
        onClick={() => pickingService.send({ type: "GO_TO_SCAN_CONTAINERS" })}
      >
        Scan containers
      </Button>
    </Page>
  );
}
