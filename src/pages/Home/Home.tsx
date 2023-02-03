import { Avatar, Box, Button, Flex, Heading, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import { RxAvatar, RxDashboard, RxPlus, RxStack } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

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
          Share
        </Heading>

        <Link to="/transaction/new">
          <Button
            leftIcon={<RxPlus />}
          >
            Add Transaction
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
          <Tab display="flex" alignItems="center" gap="2">
            <RxDashboard />
            Home
          </Tab>
          <Tab display="flex" alignItems="center" gap="2">
            <RxStack size="18" />
            Transactions
          </Tab>
          <Tab display="flex" alignItems="center" gap="2">
            <RxAvatar size="18" />
            Settings
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
