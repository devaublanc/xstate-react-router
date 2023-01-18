import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStackContext } from "../../../core/navigation/StackNavigation";

import { routes } from "../../routes";

export default function InboundDroppingScreen() {
  const { setHeaderTitle } = useStackContext();
  useEffect(() => {
    setHeaderTitle("Inbound Dropping Screen override");
  }, []);
  return (
    <>
      <Text fontSize={"xl"} fontWeight="bold">
        Inbound Dropping Screen
      </Text>
      <Link to={routes.inbound.root}>Finish</Link>
    </>
  );
}
