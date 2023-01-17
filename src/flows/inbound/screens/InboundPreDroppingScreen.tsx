import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { routes } from "../../routes";

export default function InboundPreDroppingScreen() {
  return (
    <>
      <Text fontSize={"xl"} fontWeight="bold">
        Inbound Pre Dropping Screen
      </Text>
      <Link to={routes.inbound.dropping}>go to Dropping</Link>
    </>
  );
}
