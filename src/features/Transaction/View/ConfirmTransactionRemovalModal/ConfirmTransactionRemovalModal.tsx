import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { ConfirmTransactionRemovalModalProps } from "./ConfirmTransactionRemovalModal.types";

export function ConfirmTransactionRemovalModal({
  isOpen,
  onClose,
  onConfirm,
  warningMessage,
  transactionToRemove
}: ConfirmTransactionRemovalModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      colorScheme="primary"
      isCentered
    >
      <ModalOverlay />

      <ModalContent m={2}>
        <ModalCloseButton />

        <ModalHeader>Ei, calma aí...</ModalHeader>

        <ModalBody>
          {warningMessage && (
            <Text textAlign="justify">{warningMessage}</Text>
          )}
          <Text mt={warningMessage ? 2 : 0} textAlign="justify">
            Tem certeza que deseja continuar e excluir{" "}
            <Text display="inline-block" fontWeight="medium">
              {transactionToRemove?.name}
            </Text>
            ?
          </Text>
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button onClick={onClose}>
              Cancelar
            </Button>

            <Button
              colorScheme="red"
              onClick={onConfirm}
            >
              Sim, continuar
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}