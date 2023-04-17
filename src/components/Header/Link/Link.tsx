import { Text } from "@chakra-ui/react"
import { Link as ReactRouterLink, useLocation } from "react-router-dom"

interface LinkProps {
  children: React.ReactNode | React.ReactNode[]
  to: string
}

export function Link({ children, to }: LinkProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  const conditionalStyles = isActive ? {
    color: "white",
    fontWeight: "semibold",
    borderBottom: "3px solid white",
  } : {
    color: "whiteAlpha.800",
    fontWeight: "medium",
    borderBottom: "3px solid transparent",
    _hover: {
      color: "white"
    }
  }

  return (
    <ReactRouterLink to={to}>
      <Text
        display="flex"
        alignItems="center"
        gap="2"
        px="4"
        pt="2"
        pb="3"
        cursor="pointer"
        transition="ease-in-out 0.3s"
        transitionProperty="color, border-bottom-color"
        fontSize={['sm', 'md']}
        {...conditionalStyles}
      >
        {children}
      </Text>
    </ReactRouterLink>
  )
}