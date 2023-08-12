import { Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { Card } from "@components/Card";
import { EmptyState } from "@components/EmptyState";
import { Link } from "@components/Link";
import { PlanCard } from "@features/Plans/Details/PlanCard";
import { PlanDepositsList } from "@features/Plans/Details/PlanDepositsList";
import { usePlanDetails } from "./usePlanDetails";

export function PlanDetails() {
  const {
    plan,
    isPlanError,
    isPlanLoading,
    refetchPlan,
    depositHistory,
    hasDeposits,
    isDepositHistoryError,
    isDepositHistoryLoading,
    refetchDepositHistory
  } = usePlanDetails()

  return (
    <SimpleGrid
      columns={[1, 1, 1, 2]}
      templateColumns={["1fr", "1fr", "1fr", "10fr 14fr"]}
      gap={4}
    >
      {isPlanError ? (
        <EmptyState h="fit-content">
          Não foi possível obter os detalhes do plano.
          <Link fontSize="inherit" onClick={() => refetchPlan()}>
            Tente novamente
          </Link>
        </EmptyState>
      ) : (
        <PlanCard
          position={["unset", "unset", "unset", "sticky"]}
          top={4}
          h="fit-content"
          plan={isPlanLoading ? undefined : plan}
        />
      )}

      <VStack alignItems="stretch" h="fit-content">
        {isDepositHistoryError ? (
          <EmptyState h="fit-content">
            Não foi possível obter o histórico de registros do plano.
            <Link fontSize="inherit" onClick={() => refetchDepositHistory()}>
              Tente novamente
            </Link>
          </EmptyState>
        ) : (
          <Card>
            <Heading fontSize="xl" fontWeight="semibold" mb={2}>
              Histórico
            </Heading>

            {!isDepositHistoryLoading && !hasDeposits ? (
              <EmptyState>
                Não há registros neste plano ainda.
              </EmptyState>
            ) : (
              <PlanDepositsList
                deposits={isDepositHistoryLoading ? undefined : depositHistory}
              />
            )}
          </Card>
        )}
      </VStack>
    </SimpleGrid>
  )
}