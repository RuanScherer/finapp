import { Box, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Text, theme, VStack } from "@chakra-ui/react";
import { FiTrendingUp } from "react-icons/fi";
import { RxDashboard, RxExit, RxGrid, RxStack } from "react-icons/rx";
import { Link } from "react-router-dom";
import { DrawerMenuProps } from "./DrawerMenu.types";

const menus = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <RxDashboard />
  },
  {
    label: "Transações",
    to: "/transactions",
    icon: <RxStack />
  },
  {
    label: "Métricas",
    to: "/insights",
    icon: <FiTrendingUp />
  },
  {
    label: "Planejamento",
    to: "/plans",
    icon: <RxGrid />
  }
]

export function DrawerMenu(props: DrawerMenuProps) {
  return (
    <Drawer
      isOpen={props.isOpen}
      onClose={props.onClose}
      size={["full", "xs"]}
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader />

        <DrawerBody>
          <VStack
            justifyContent="center"
            h="full"
            textAlign="center"
            spacing={0}
          >
            {menus.map((menu) => (
              <Box w="full" key={menu.to}>
                <Link
                  to={menu.to}
                  onClick={props.onClose}
                  style={{ width: "100%" }}
                >
                  <HStack
                    columnGap={1}
                    p={3}
                    rounded="md"
                    cursor="pointer"
                    _hover={{
                      bgColor: "primaryAlpha.200",
                    }}
                  >
                    {menu.icon}
                    <Text>{menu.label}</Text>
                  </HStack>
                </Link>

                <Divider my={1.5} />
              </Box>
            ))}

            <HStack
              gap={1}
              p={3}
              w="full"
              rounded="md"
              cursor="pointer"
              _hover={{
                bgColor: "red.100",
              }}
              onClick={() => {
                props.onClose();
                props.onSignOut();
              }}
            >
              <RxExit color={theme.colors.red[500]} />
              <Text color="red.500">Sair</Text>
            </HStack>
          </VStack>
        </DrawerBody>

        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  )
}