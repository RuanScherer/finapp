import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Heading, HStack, Input, Radio, RadioGroup, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { RxArrowLeft } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { firestore } from "../../../services/firebase";

type NewTransactionFormData = {
  name: string
  amount: number
  type: string
  status: string
}

const newTransactionFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  amount: yup.number().typeError('Amount must be a number').min(0).required("Amount is required"),
  type: yup.string().required("Type is required"),
  status: yup.string().required("Status is required")
})

export function NewTransaction() {
  const { register, formState, handleSubmit } = useForm<NewTransactionFormData>({
    resolver: yupResolver(newTransactionFormSchema)
  })
  const navigate = useNavigate()
  const toast = useToast()

  function handleBack() {
    navigate(-1)
  }

  async function handleSave(data: NewTransactionFormData) {
    try {
      await addDoc(
        collection(firestore, "transactions"),
        data
      )
      toast({
        title: "Success!",
        description: "Your transaction was just created.",
        status: "success"
      })
      navigate("/home")
    } catch {
      toast({
        title: "Error creating transaction.",
        description: "An error occurred while creating your transaction. Please try again.",
        status: "error"
      })
    }
  }

  return (
    <Flex
      as="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="full"
      maxW="600"
      mx="auto"
      px="4"
      py="6"
      onSubmit={handleSubmit(handleSave)}
    >
      <Heading
        display="flex"
        alignItems="center"
        alignSelf="flex-start"
        gap="4"
        fontSize="2xl"
        fontWeight="semibold"
      >
        <RxArrowLeft cursor="pointer" onClick={handleBack} />
        New Transaction
      </Heading>

      <Grid
        templateColumns="repeat(2, 1fr)"
        gap="4"
        w="full"
        mt="10"
      >
        <GridItem>
          <FormControl>
            <FormLabel fontSize="smaller" fontWeight="medium" m="1">
              Name
            </FormLabel>
            <Input variant="filled" _focus={{ boxShadow: "none", borderColor: "primary.500" }} {...register("name")} />
            {formState.errors.name && (
              <Text fontSize="smaller" color="red.500" mt="2">
                {formState.errors.name.message as any}
              </Text>
            )}
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel fontSize="smaller" fontWeight="medium" m="1">
              Amount
            </FormLabel>
            <Input type="number" step="0.01" variant="filled" _focus={{ boxShadow: "none", borderColor: "primary.500" }} {...register("amount")} />
            {formState.errors.amount && (
              <Text fontSize="smaller" color="red.500" mt="2">
                {formState.errors.amount.message as any}
              </Text>
            )}
          </FormControl>
        </GridItem>

        <GridItem>
          <SimpleGrid columns={2}>
            <Box>
              <Text fontSize="smaller" fontWeight="medium" m="1">
                Type
              </Text>
              <RadioGroup defaultValue="EXPENSE">
                <VStack alignItems="start">
                  <Radio colorScheme="primary" value="INCOME" {...register("type")}>Income</Radio>
                  <Radio colorScheme="primary" value="EXPENSE" {...register("type")}>Expense</Radio>
                </VStack>
              </RadioGroup>
            </Box>

            <Box>
              <Text fontSize="smaller" fontWeight="medium" m="1">
                Status
              </Text>
              <RadioGroup defaultValue="PENDENT">
                <VStack alignItems="start">
                  <Radio colorScheme="primary" value="PENDENT" {...register("status")}>Pendent</Radio>
                  <Radio colorScheme="primary" value="SETTLED" {...register("status")}>Settled</Radio>
                </VStack>
              </RadioGroup>
            </Box>
          </SimpleGrid>
        </GridItem>
      </Grid>

      <HStack justifyContent="center" mt="10" w="full">
        <Button
          type="button"
          flex="1"
          maxW="120px"
          fontWeight="medium"
          onClick={handleBack}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          flex="1"
          maxW="120px"
          fontWeight="medium"
          colorScheme="primary"
        >
          Save
        </Button>
      </HStack>
    </Flex>
  )
}
