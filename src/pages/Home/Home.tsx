import { Avatar, Box, Button, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { RxAvatar, RxDashboard, RxPlus, RxStack } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Dashboard } from "./Tabs/Dashboard";

const tabStyles = {
  display: "flex",
  alignItems: "center",
  gap: "2",
}

export function Home() {
  const { user } = useAuth()
  
  return (
    <Box
      w="full"
      maxW="1200px"
      mx="auto"
      px="4"
      py="6"
    >
      <Flex as="header" justifyContent="space-between" alignItems="center">
        <Heading
          fontSize="3xl"
          fontWeight="bold"
          letterSpacing="wide"
        >
          <Text color="primary.500" display="inline">
            Fin
          </Text>
          App
        </Heading>

        <Link to="/transaction/new">
          <Button
            leftIcon={<RxPlus />}
          >
            Adicionar transação
          </Button>
        </Link>

        <Avatar
          src={user?.avatar ?? undefined}
          name={user?.name}
          bgColor="light.100"
        />
      </Flex>

      <Tabs variant="soft-rounded" colorScheme="primary" mt="6" >
        <TabList gap="1">
          <Tab {...tabStyles}>
            <RxDashboard />
            Dashboard
          </Tab>
          <Tab {...tabStyles}>
            <RxStack size="18" />
            Transações
          </Tab>
          <Tab {...tabStyles}>
            <RxAvatar size="18" />
            Configurações
          </Tab>
        </TabList>

        <TabPanels mt="1">
          <TabPanel px="0">
            <Dashboard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
