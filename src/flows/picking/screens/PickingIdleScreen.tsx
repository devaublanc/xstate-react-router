import { Button, Tag, Text } from "@chakra-ui/react";
import { Page } from "../../../core/ui/Page";
import { Info } from "../components/Info";

import { usePickingService } from "../machines/XstatePickingMachineProvider";

export default function PickingIdleScreen() {
  const pickingService = usePickingService();

  return (
    <>
      <Text fontSize={"xl"} fontWeight="bold">
        Picking Idle Screen
      </Text>
      <Info />
      <Button
        mt="10"
        onClick={() => pickingService.send({ type: "GO_TO_SCAN_ITEMS" })}
      >
        Scan items
      </Button>
    </>
  );
}
