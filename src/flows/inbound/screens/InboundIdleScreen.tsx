import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { routes } from "../../routes";

export default function InboundIdleScreen() {
  return (
    <>
      <Text fontSize={"xl"} fontWeight="bold">
        Inbound Idle Screen
      </Text>
      <Link to={routes.inbound.preDropping}>Go to pre dropping</Link>
    </>
  );
}
