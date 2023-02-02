import { Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, Heading, Input, SimpleGrid, Text } from "@chakra-ui/react";

const editableStyles = {
  fontSize: "2xl",
  pb: "2",
  px: "2",
  borderBottom: "2px",
  borderBottomColor: "gray.400",
  borderRadius: "none",
  w: "full",
  _hover: {
    borderBottomColor: "gray.500"
  },
  _focus: {
    boxShadow: "none",
    borderBottomColor: "primary.500"
  }
}

export function NewTransaction() {
  return (
    <Flex
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="full"
      maxW="600"
      mx="auto"
      px="4"
      py="6"
    >
      <Heading fontSize="3xl" fontWeight="semibold" mb="4">New Transaction</Heading>

      <Text fontSize="sm">Name</Text>
      <Editable
        w="full"
        textAlign="center"
      >
        <EditablePreview {...editableStyles} />
        <EditableInput {...editableStyles} />
      </Editable>

      <SimpleGrid columns={2} gap="4" w="full" mt="8">
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input type="number" />
        </FormControl>

        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input type="number" />
        </FormControl>
      </SimpleGrid>
    </Flex>
  )
}
