import { Button, Tag } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import { Page } from "../../../core/ui/Page";

import { usePickingService } from "../machines/XstatePickingMachineProvider";

export default function PickingIdleScreen() {
  const pickingService = usePickingService();
  const stateValue = useSelector(pickingService, state => state.value);

  return (
    <Page>
      <h1>Picking Idle Screen</h1>
      <h2>state: {stateValue.toString()}</h2>
      <Button onClick={() => pickingService.send({ type: "GO_TO_SCAN_ITEMS" })}>
        Go to Scan Items
      </Button>
    </Page>
  );
}
