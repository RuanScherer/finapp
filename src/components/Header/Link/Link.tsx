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
    color: "primary.500",
    fontWeight: "semibold",
    bgColor: "primaryAlpha.400",
    _hover: {
      bgColor: "primaryAlpha.500",
    }
  } : {
    fontWeight: "medium",
    _hover: {
      bgColor: "primaryAlpha.300",
    }
  }

  return (
    <ReactRouterLink to={to}>
      <Text
        display="flex"
        alignItems="center"
        gap="2"
        px="4"
        py="2"
        borderRadius="full"
        cursor="pointer"
        transition="ease-in-out 0.3s"
        {...conditionalStyles}
      >
        {children}
      </Text>
    </ReactRouterLink>
  )
}