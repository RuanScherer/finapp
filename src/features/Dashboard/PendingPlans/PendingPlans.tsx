import { Center, List, ListItem, Progress, Spinner, Text } from "@chakra-ui/react";
import { EmptyState } from "@components/EmptyState";
import { Link } from "@components/Link";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { getProgressValue } from "@shared/utils/planUtils";
import { Link as ReactRouterLink } from "react-router-dom";
import { usePendingPlans } from "./usePendingPlans";

export function PendingPlans() {
  const {
    pendingPlans,
    isPendingPlansLoading,
    isPendingPlansError,
    refetchPendingPlans
  } = usePendingPlans()

  if (isPendingPlansError) {
    return (
      <EmptyState>
        Não foi possível carregar seus planos em andamento no momento.
        <Link fontSize="inherit" onClick={() => refetchPendingPlans()}>
          Tentar novamente
        </Link>
      </EmptyState>
    )
  }

  if (isPendingPlansLoading) {
    return (
      <Center>
        <Spinner color="primary.500" speed="1s" />
      </Center>
    )
  }

  return (
    <List spacing={2.5}>
      {!pendingPlans?.length && (
        <ListItem>
          <EmptyState>
            Não existem planos em andamento no momento.
          </EmptyState>
        </ListItem>
      )}

      {pendingPlans!.map(plan => {
        const progress = getProgressValue(plan.currentValue, plan.plannedValue)
        return (
          <ListItem
            bgColor="primaryAlpha.100"
            p={[2, 3]}
            rounded="md"
            key={plan.id}
          >
            <Text style={{ margin: 0 }}>
              {plan.name}
            </Text>
            <Text fontSize="sm" color="gray.500" style={{ margin: 0 }}>
              {currencyFormatter.format(plan.currentValue)} de {currencyFormatter.format(plan.plannedValue)}
            </Text>

            <Progress
              value={progress}
              borderRadius="full"
              colorScheme="primary"
              bgColor="primaryAlpha.300"
              mt={2}
            />
          </ListItem>
        )
      })}

      <ListItem>
        <Link>
          <ReactRouterLink to="/plans">
            Ver tudo
          </ReactRouterLink>
        </Link>
      </ListItem>
    </List>
  )
}