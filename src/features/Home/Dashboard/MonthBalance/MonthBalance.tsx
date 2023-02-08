import { ChakraProps, Divider, Heading, HStack, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { currencyFormatter } from "../../../../shared/utils/currencyFormatter";
import { Card } from "../Card";

interface BalanceRowProps extends ChakraProps {
  label: string
  value: number
}

export function MonthBalance() {
  const [isLoadingData, setIsLoadingData] = useState(true)
  
  
  useEffect(() => {

  }, [])

  const BalanceRow = ({ label, value, ...rest }: BalanceRowProps) => (
    <HStack justifyContent="space-between" alignItems="center" {...rest}>
      <Text color="text.700">{label}</Text>
      <Text fontSize="lg" fontWeight="bold">
        {currencyFormatter.format(value)}
      </Text>
    </HStack>
  )

  if (!isLoadingData) {
    return (
      <Card>
        <Skeleton w="50%" h="20px" />
        <Skeleton h="20px" mt="2.5" />
        <Skeleton h="20px" mt="2.5" />
        <Skeleton h="20px" mt="2.5" />
      </Card>
    )
  }

  return (
    <Card>
      <Heading fontSize="xl" fontWeight="semibold">
        Balanço mensal
      </Heading>

      <BalanceRow
        label="A pagar"
        value={1204.91}
        mt="2"
      />

      <BalanceRow
        label="A receber"
        value={836.22}
        mt="1"
      />

      <Divider my="2.5" borderColor="gray.300" />

      <BalanceRow
        label="Balanço"
        value={368.39}
      />
    </Card>
  )
}
