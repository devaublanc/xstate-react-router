import { Box, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";

export type HeaderProps = {
  title?: string;
  onGoBack?: () => void;
};
export function Header({ title, onGoBack }: HeaderProps) {
  return (
    <Flex bg="green">
      {onGoBack ? <ArrowBackIcon onClick={onGoBack} /> : null}
      {title}
    </Flex>
  );
}
