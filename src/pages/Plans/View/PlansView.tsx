import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Heading, HStack, Spinner, useDisclosure } from "@chakra-ui/react";
import { EmptyState } from "@components/EmptyState";
import { Link } from "@components/Link";
import { PlanForm } from "@features/Plans/PlanForm";
import { PlansGrid } from "@features/Plans/View/PlansGrid";
import { RxPlus } from "react-icons/rx";
import { usePlansView } from "./usePlansView";

export function PlansView() {
  const planFormDisclosure = useDisclosure()
  const {
    hasPlans,
    pendingPlans,
    hasPendingPlans,
    finishedPlans,
    hasFinishedPlans,
    isErrorLoadingPlans,
    isLoadingPlans,
    retryLoadPlans
  } = usePlansView()

  return (
    <>
      <HStack gap={2} justifyContent='space-between' mb={4}>
        <Heading fontSize={["lg", "xl"]} fontWeight="semibold">
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
        hasPlans ? (
          <Accordion
            display="flex"
            flexDirection="column"
            gap={2}
            defaultIndex={[0, 1]}
            allowToggle
            allowMultiple
          >
            <AccordionItem border={0}>
              <AccordionButton rounded="md" p={1}>
                <AccordionIcon />
                <Heading fontSize={["lg", "xl"]} fontWeight="medium" ml={1}>
                  Em andamento
                </Heading>
              </AccordionButton>

              <AccordionPanel px={0} py={2.5}>
                {hasPendingPlans ? (
                  <PlansGrid plans={pendingPlans!} />
                ) : (
                  <EmptyState>Você não tem nenhum plano em andamento.</EmptyState>
                )}
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border={0}>
              <AccordionButton rounded="md" p={1}>
                <AccordionIcon />
                <Heading fontSize={["lg", "xl"]} fontWeight="medium" ml={1}>
                  Concluídos
                </Heading>
              </AccordionButton>

              <AccordionPanel px={0} py={2.5}>
                {hasFinishedPlans ? (
                  <PlansGrid plans={finishedPlans!} />
                ) : (
                  <EmptyState>
                    Você ainda não concluiu nenhum plano. Tenha paciência, você vai conseguir!
                  </EmptyState>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ) : (
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
        )
      )}
    </>
  )
}