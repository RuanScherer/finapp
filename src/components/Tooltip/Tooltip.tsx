import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { TooltipProps } from "./Tooltip.types";

export function Tooltip({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    (children as any).props?.onClick?.(event);
    setIsOpen(true);
  }

  function handleMouseEnter(event: React.MouseEvent<HTMLDivElement>) {
    (children as any).props?.onMouseEnter?.(event);
    setIsOpen(true);
  }

  function handleMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
    (children as any).props?.onMouseLeave?.(event);
    onMouseLeave?.(event);
    setIsOpen(false);
  }

  return (
    <ChakraTooltip isOpen={isOpen} {...rest}>
      {React.cloneElement(children as any, {
        onClick: handleClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
    </ChakraTooltip>
  );
}
