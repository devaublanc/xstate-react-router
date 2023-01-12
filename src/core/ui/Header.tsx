import { Text, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export type HeaderProps = {
  title?: string;
  onGoBack?: () => void;
};
export function Header({ title, onGoBack }: HeaderProps) {
  return (
    <Flex bg="#ebebeb" p={1} alignItems={"center"}>
      {onGoBack ? <ArrowBackIcon onClick={onGoBack} boxSize="5" /> : null}
      <Text fontWeight="bold">{title}</Text>
    </Flex>
  );
}
