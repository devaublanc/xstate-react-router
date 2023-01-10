import { Box, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";

export type HeaderProps = {
  title?: string;
};
export function Header({ title }: HeaderProps) {
  return <Flex bg="green">{title}</Flex>;
}
