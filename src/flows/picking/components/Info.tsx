import { Tag } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import { usePickingService } from "../machines/XstatePickingMachineProvider";

export function Info() {
  const pickingService = usePickingService();
  const stateValue = useSelector(pickingService, state => state.value);
  return (
    <Tag variant={"solid"} colorScheme="teal">
      State: {stateValue.toString()}
    </Tag>
  );
}
