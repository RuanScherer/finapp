import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ConfirmSignOutModalProps } from "./ConfirmSignOutModal.types";

export function ConfirmSignOutModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmSignOutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Ei, espera aí!</ModalHeader>

        <ModalBody>Tem certeza que deseja sair?</ModalBody>

        <ModalFooter>
          <HStack>
            <Button onClick={onClose}>Cancelar</Button>

            <Button colorScheme="red" onClick={onConfirm}>
              Sair
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
