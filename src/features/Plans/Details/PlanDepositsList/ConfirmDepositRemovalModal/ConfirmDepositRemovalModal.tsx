import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { ConfirmDepositRemovalModalProps } from "./ConfirmDepositRemovalModal.types";

export function ConfirmDepositRemovalModal(props: ConfirmDepositRemovalModalProps) {
  const formattedValue = currencyFormatter.format(props.deposit.value)

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      colorScheme="primary"
      isCentered
    >
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Opa! Pera aí...</ModalHeader>

        <ModalBody>
          {props.deposit.description ? (
            <>
              Tem certeza que deseja remover o registro
              {" "}
              <Text
                display="inline"
                fontSize="inherit"
                fontWeight="medium"
              >
                {props.deposit.description}
              </Text>
              {" "}
              com valor de
              {" "}
              <Text
                display="inline"
                fontSize="inherit"
                fontWeight="medium"
              >
                {formattedValue}
              </Text>
              ?
            </>
          ) : (
            <>
              Tem certeza que deseja remover esse registro de
              {" "}
              <Text
                display="inline-block"
                fontSize="inherit"
                fontWeight="medium"
              >
                {formattedValue}
              </Text>
              ?
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button onClick={props.onClose}>
              Cancelar
            </Button>

            <Button colorScheme="red" onClick={props.onConfirm}>
              Sim, remover
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}