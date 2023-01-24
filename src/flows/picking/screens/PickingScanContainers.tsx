import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Page } from "../../../core/ui/Page";
import { useStackContext } from "../../../core/navigation/StackNavigation";
import {
  usePickingService,
  usePickingServiceContext,
} from "../machines/XstatePickingMachineProvider";
import { Info } from "../components/Info";

export default function PickingScanContainersScreen() {
  const pickingService = usePickingService();
  const { setWithGoBackConfirmation } = usePickingServiceContext();

  useEffect(() => {
    setWithGoBackConfirmation(false);
  }, []);

  return (
    <>
      <Text fontSize={"xl"} fontWeight="bold">
        Scan containers page
      </Text>
      <Info />
      <Button mt="10" onClick={() => pickingService.send({ type: "FINISH" })}>
        Finish
      </Button>
    </>
  );
}
