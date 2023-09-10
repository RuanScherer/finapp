import { List, ListItem, Skeleton, Text } from "@chakra-ui/react";
import { PlanDepositItem } from "./PlanDepositItem";
import { PlanDepositsListProps } from "./PlanDepositsList.types";

export function PlanDepositsList(props: PlanDepositsListProps) {
  if (!props.deposits) {
    return (
      <List flexDirection="column">
        {Array.from({ length: 5 }).map((_, index) => (
          <ListItem my={2} key={index}>
            <Skeleton height={6} />
          </ListItem>
        ))}
      </List>
    )
  }

  return (
    <List flexDirection="column">
      {Object.keys(props.deposits).map((historyDay) => (
        <>
          <ListItem
            w="full"
            mt={2}
            key={historyDay}
          >
            <Text fontSize={["xs", "sm"]} color="gray.500">
              {new Intl.DateTimeFormat("pt-BR").format(new Date(historyDay))}
            </Text>
          </ListItem>

          {props.deposits![historyDay].map((deposit, index) => (
            <PlanDepositItem
              deposit={deposit}
              hasBottomBorder={index < props.deposits![historyDay].length - 1}
              key={deposit.id}
            />
          ))}
        </>
      ))}
    </List>
  )
}