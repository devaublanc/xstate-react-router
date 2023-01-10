import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Page } from "../../../ui/Page";
import { useStackContext } from "../../core/StackNavigation";

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
