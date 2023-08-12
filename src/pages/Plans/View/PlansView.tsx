import { Button, Heading, HStack, Spinner, useDisclosure } from "@chakra-ui/react";
import { EmptyState } from "@components/EmptyState";
import { Link } from "@components/Link";
import { PlanForm } from "@features/Plans/PlanForm";
import { PlansGrid } from "@features/Plans/View/PlansGrid";
import { RxPlus } from "react-icons/rx";
import { usePlansView } from "./usePlansView";

export function PlansView() {
  const planFormDisclosure = useDisclosure()
  const { plans, isErrorLoadingPlans, isLoadingPlans, retryLoadPlans } = usePlansView()

  return (
    <>
      <HStack gap={2} justifyContent='space-between' mb={4}>
        <Heading fontSize="xl" fontWeight="semibold">
          Seus planos
          {isLoadingPlans && (
            <Spinner
              color="primary.500"
              speed="1s"
              size="sm"
              ml={2}
            />
          )}
        </Heading>

        <Button
          colorScheme="primary"
          size="sm"
          leftIcon={<RxPlus color="white" strokeWidth={1} />}
          onClick={planFormDisclosure.onOpen}
        >
          Criar plano
        </Button>
      </HStack>

      <PlanForm isOpen={planFormDisclosure.isOpen} onClose={planFormDisclosure.onClose} />

      {isErrorLoadingPlans && (
        <EmptyState>
          Infelizmente não foi possível carregar seus planos no momento.
          <Link fontSize="inherit" onClick={() => retryLoadPlans()}>
            Tentar novamente
          </Link>
        </EmptyState>
      )}

      {!isLoadingPlans && !isErrorLoadingPlans && (
        plans!.length === 0 ? (
          <EmptyState>
            Você ainda não possui planos,
            {' '}
            <Link
              fontSize="inherit"
              display="inline-block"
              onClick={planFormDisclosure.onOpen}
            >
              crie um novo plano
            </Link>
            {' '}
            e dê um up na sua organização!
          </EmptyState>
        ) : (
          <PlansGrid plans={plans!} />
        )
      )}
    </>
  )
}