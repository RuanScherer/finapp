import { HStack, Text, theme } from "@chakra-ui/react"
import { RxArrowBottomLeft, RxArrowTopRight } from "react-icons/rx"
import { TransactionType } from "../../shared/enums/transactionType"
import { currencyFormatter } from "../../shared/utils/currencyFormatter"

interface StatProps {
  type: TransactionType,
  amount: number
}

export function Stat({ type, amount }: StatProps) {
  let color
  let Icon

  if (type === TransactionType.DESPESA) {
    color = theme.colors.red[400]
    Icon = RxArrowBottomLeft
  } else {
    color = theme.colors.green[400]
    Icon = RxArrowTopRight
  }

  return (
    <HStack
      alignItems="center"
      spacing="2"
      mt="1"
    >
      <Text
        fontSize="2xl"
        fontWeight="semibold"
        color={color}
      >
        {currencyFormatter.format(amount)}
      </Text>
      <Icon color={color} size="24" />
    </HStack>
  )
}
