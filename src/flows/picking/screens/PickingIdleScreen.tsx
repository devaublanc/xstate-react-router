import { Button, Text } from "@chakra-ui/react";

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
