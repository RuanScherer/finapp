import { Tooltip as ChakraTooltip, useDisclosure } from "@chakra-ui/react";
import { TooltipProps } from "./Tooltip.types";

export function Tooltip({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: TooltipProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    onClick?.(event);
    onClose();
  }

  function handleMouseEnter(event: React.MouseEvent<HTMLDivElement>) {
    onMouseEnter?.(event);
    onOpen();
  }

  function handleMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
    onMouseLeave?.(event);
    onClose();
  }

  return (
    <ChakraTooltip
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isOpen={isOpen}
      {...rest}
    >
      {children}
    </ChakraTooltip>
  );
}
