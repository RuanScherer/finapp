import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, VStack } from "@chakra-ui/react";
import { Input } from "@components/Form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CreateDepositFormData, DepositFormProps } from "./DepositForm.types";
import { useDepositForm } from "./useDepositForm";

const createDepositFormSchema = yup.object().shape({
  value: yup
    .number()
    .typeError("Informe um valor válido")
    .min(0, "Informe um valor positivo")
    .required("O valor é obrigatório"),
  description: yup.string()
})

export function DepositForm(props: DepositFormProps) {
  const { handleSubmit, register, formState, reset } = useForm<CreateDepositFormData>({
    resolver: yupResolver(createDepositFormSchema)
  })
  const { isDepositing, createDeposit } = useDepositForm(props.plan.id)

  async function handleCreateDeposit(data: CreateDepositFormData) {
    await createDeposit(data)
    handleClose()
  }

  function handleClose() {
    reset()
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />

      <form onSubmit={handleSubmit(handleCreateDeposit)}>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Novo registro em {props.plan.name}</ModalHeader>

          <ModalBody>
            <VStack alignItems="stretch" spacing={4}>
              <Input
                label="Valor"
                type="number"
                isCurrency
                step="0.01"
                {...register("value")}
                error={formState.errors.value}
              />

              <Input
                label="Descrição"
                {...register("description")}
                error={formState.errors.description}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="primary"
              isLoading={isDepositing}
              loadingText="Registrando..."
              spinner={<Spinner color="white" speed="1s" />}
            >
              Registrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}