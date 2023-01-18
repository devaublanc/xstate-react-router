import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { routes } from "../../routes";

export default function InboundDroppingScreen() {
  return (
    <>
      <Text fontSize={"xl"} fontWeight="bold">
        Inbound Dropping Screen
      </Text>
      <Link to={routes.inbound.root}>Finish</Link>
    </>
  );
}
