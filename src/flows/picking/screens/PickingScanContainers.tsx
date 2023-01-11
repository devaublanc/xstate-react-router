import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Page } from "../../../core/ui/Page";
import { useStackContext } from "../../../core/navigation/StackNavigation";

export default function PickingScanContainersScreen() {
  const { setHeaderElement } = useStackContext();

  useEffect(() => {
    setHeaderElement(<Box>Hey I'm the custom header of the stack</Box>);
  }, []);

  return (
    <Page>
      <h1>PickingScanContainers Screen with custom header</h1>
    </Page>
  );
}
