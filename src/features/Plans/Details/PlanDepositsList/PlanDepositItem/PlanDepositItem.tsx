import { HStack, IconButton, ListItem, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { RxTrash } from "react-icons/rx";
import { ConfirmDepositRemovalModal } from "../ConfirmDepositRemovalModal";
import { PlanDepositItemProps } from "./PlanDepositItem.types";
import { usePlanDepositItem } from "./usePlanDepositItem";

export function PlanDepositItem(props: PlanDepositItemProps) {
  const { removeDeposit } = usePlanDepositItem({
    depositId: props.deposit.id,
    planId: props.deposit.planId,
  })
  const confirmDepositRemovalDisclosure = useDisclosure()

  async function handleRemoveDeposit() {
    confirmDepositRemovalDisclosure.onClose()
    await removeDeposit()
  }

  return (
    <>
      <ListItem
        w="full"
        borderBottomWidth={props.hasBottomBorder ? 1 : 0}
        borderBottomColor="gray.200"
        py={2}
      >
        <HStack justifyContent="space-between">
          <VStack alignItems="stretch" flex={1}>
            {props.deposit.description && (
              <Text color="blackAlpha.800" lineHeight="short">
                {props.deposit.description}
              </Text>
            )}

            <Text
              fontWeight="medium"
              color="green.400"
              whiteSpace="nowrap"
              style={{ margin: 0 }}
            >
              + {currencyFormatter.format(props.deposit.value)}
            </Text>
          </VStack>

          <IconButton
            aria-label="Remover registro"
            icon={<RxTrash strokeWidth={0.4} size={18} />}
            variant="ghost"
            size="sm"
            colorScheme="red"
            onClick={confirmDepositRemovalDisclosure.onOpen}
          />
        </HStack>
      </ListItem>

      <ConfirmDepositRemovalModal
        isOpen={confirmDepositRemovalDisclosure.isOpen}
        onClose={confirmDepositRemovalDisclosure.onClose}
        onConfirm={handleRemoveDeposit}
        deposit={props.deposit}
      />
    </>
  )
}