import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { ConfirmPlanRemovalModalProps } from "./ConfirmPlanRemovalModal.types";

export function ConfirmPlanRemovalModal(props: ConfirmPlanRemovalModalProps) {
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
          Tem certeza que deseja excluir o plano {props.plan.name.trim()}?
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button onClick={props.onClose}>
              Cancelar
            </Button>

            <Button colorScheme="red" onClick={props.onConfirm}>
              Sim, excluir
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}