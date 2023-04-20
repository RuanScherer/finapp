import { Text, theme } from "@chakra-ui/react";
import { cloneElement } from "react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { LinkProps } from "./Link.types";

export function Link({ to, icon, label }: LinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const conditionalStyles = isActive
    ? {
        color: theme.colors.white,
        bgColor: "whiteAlpha.300",
        _hover: {
          color: theme.colors.whiteAlpha[800],
        },
      }
    : {
        color: theme.colors.whiteAlpha[800],
        _hover: {
          color: theme.colors.white,
        },
      };

  return (
    <ReactRouterLink to={to}>
      <Text
        display="flex"
        alignItems="center"
        gap={[1, 2]}
        px={[3, 4]}
        py={[1.5, 2]}
        fontSize={["sm", "md"]}
        fontWeight="medium"
        borderRadius="full"
        cursor="pointer"
        transition="ease-in-out 0.3s"
        transitionProperty="color, background-color"
        {...conditionalStyles}
      >
        {cloneElement(icon, {
          color: conditionalStyles.color,
          stroke: conditionalStyles.color,
          size: 18,
        })}
        {label}
      </Text>
    </ReactRouterLink>
  );
}
