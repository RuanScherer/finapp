import { Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Text, VStack } from "@chakra-ui/react";
import { useTransactionsView } from "@contexts/TransactionsViewContext";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { getTransactionIdToNavigate } from "@shared/utils/transactionUtils";
import { Link } from "react-router-dom";
import { ConfirmTransactionRemovalModal } from "../../ConfirmTransactionRemovalModal";
import { useConfirmTransactionRemoval } from "../../ConfirmTransactionRemovalModal/useConfirmTransactionRemoval";
import { useTransactionRemoval } from "../../hooks/useTransactionRemoval";
import { Transaction } from "../TransactionsList.types";
import { TransactionDrawerProps } from "./TransactionDrawer.types";

export function TransactionDrawer(props: TransactionDrawerProps) {
  const {
    confirmTransactionRemovalDisclosure,
    handleCloseConfirmTransactionRemovalModal,
    warningMessage,
    transactionToRemove,
    confirmTransactionRemoval
  } = useConfirmTransactionRemoval<Transaction>();
  const { removeTransaction } = useTransactionRemoval();
  const { updateTransactionStatusById, } = useTransactionsView();

  function handleChangeStatus() {
    const newStatus = props.transaction!.status === TransactionStatus.PENDING
      ? TransactionStatus.SETTLED
      : TransactionStatus.PENDING

    updateTransactionStatusById({
      id: props.transaction!.id,
      status: newStatus,
    })
    props.onClose()
  }

  function handleRequestRemovalConfirmation() {
    confirmTransactionRemoval(props.transaction!)
  }

  async function handleRemoveTransaction() {
    await removeTransaction(transactionToRemove!)
    handleCloseConfirmTransactionRemovalModal()
    props.onClose()
  }

  if (!props.transaction) return null

  return (
    <>
      <Drawer
        placement="bottom"
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <DrawerOverlay />

        <DrawerContent borderTopRadius="xl">
          <DrawerHeader textAlign="center">
            {props.transaction.name}
          </DrawerHeader>

          <DrawerBody>
            <VStack
              justifyContent="center"
              h="full"
              textAlign="center"
              spacing={1.5}
            >
              <Text
                p={3}
                w="full"
                rounded="md"
                cursor="pointer"
                _hover={{
                  bgColor: "primaryAlpha.200",
                }}
                onClick={handleChangeStatus}
              >
                {props.transaction.status === TransactionStatus.PENDING
                  ? 'Marcar como quitado'
                  : 'Marcar como pendente'
                }
              </Text>

              <Divider />

              <Link
                to={'/transaction/' + getTransactionIdToNavigate(props.transaction)}
                onClick={props.onClose}
                style={{ width: "100%", outline: "none" }}
              >
                <Text
                  w="full"
                  p={3}
                  rounded="md"
                  cursor="pointer"
                  _hover={{
                    bgColor: "primaryAlpha.200",
                  }}
                >
                  Editar
                </Text>
              </Link>

              <Divider />

              <Text
                p={3}
                w="full"
                rounded="md"
                cursor="pointer"
                color="red.500"
                _hover={{
                  bgColor: "red.100",
                }}
                onClick={handleRequestRemovalConfirmation}
              >
                Excluir
              </Text>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <ConfirmTransactionRemovalModal
        isOpen={confirmTransactionRemovalDisclosure.isOpen}
        onClose={confirmTransactionRemovalDisclosure.onClose}
        onConfirm={handleRemoveTransaction}
        transactionToRemove={transactionToRemove}
        warningMessage={warningMessage}
      />
    </>
  )
}