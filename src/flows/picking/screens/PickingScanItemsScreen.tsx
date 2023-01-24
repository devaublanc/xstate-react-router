import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStackContext } from "../../../core/navigation/StackNavigation";
import { Page } from "../../../core/ui/Page";
import { routes } from "../../routes";
import { Info } from "../components/Info";
import {
  usePickingService,
  usePickingServiceContext,
} from "../machines/XstatePickingMachineProvider";

export default function PickingScanItemsScreen() {
  const pickingService = usePickingService();
  const { confirm, isConfirmOpen, cancel, setWithGoBackConfirmation } =
    usePickingServiceContext();

  useEffect(() => {
    setWithGoBackConfirmation(true);
  }, []);

  return (
    <>
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

      <Modal isOpen={isConfirmOpen} onClose={cancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Sure ?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={cancel}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={confirm}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
