import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Spinner, VStack } from "@chakra-ui/react";
import { Input } from "@components/Form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { CreatePlanFormData, PlanFormProps } from "./PlanForm.types";
import { usePlanForm } from "./usePlanForm";

const newPlanSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  plannedValue: yup
    .number()
    .typeError("Insira um valor válido")
    .required('O valor planejado é obrigatório')
    .min(0, "O valor planejado deve ser maior que zero"),
  dueDate: yup
    .date()
    .nullable()
    .transform((curr, orig) => orig === '' ? null : curr)
    .typeError("Insira uma data válida"),
})

export function PlanForm(props: PlanFormProps) {
  const { handleSubmit, formState, register, reset } = useForm<CreatePlanFormData>({
    resolver: yupResolver(newPlanSchema)
  })
  const { createPlan, editPlan, isSavingPlan } = usePlanForm()

  useEffect(() => {
    if (!props.isOpen) return

    if (props.isEditing) {
      reset({
        name: props.plan.name,
        plannedValue: props.plan.plannedValue,
        dueDate: props.plan.dueDate
          ? props.plan.dueDate.toISOString().split('T')[0]
          : undefined
      })
    }
  }, [props.isOpen, props.isEditing])

  async function handleSavePlan(data: CreatePlanFormData) {
    if (props.isEditing) {
      await editPlan({
        ...data,
        id: props.plan.id
      })
    } else {
      await createPlan(data)
    }
    handleClose()
  }

  function handleClose() {
    reset()
    props.onClose()
  }

  return (
    <Drawer isOpen={props.isOpen} onClose={handleClose}>
      <DrawerOverlay />

      <form onSubmit={handleSubmit(handleSavePlan)}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {props.isEditing ? "Editar plano" : "Novo plano"}
          </DrawerHeader>

          <DrawerBody>
            <VStack alignItems="stretch">
              <Input
                label="Nome"
                error={formState.errors.name}
                {...register("name")}
              />

              <Input
                label="Valor planejado"
                type="number"
                step="0.01"
                isCurrency
                error={formState.errors.plannedValue}
                {...register("plannedValue")}
              />

              <Input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                label="Data limite"
                error={formState.errors.dueDate}
                {...register("dueDate")}
              />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              type="submit"
              w="full"
              colorScheme="primary"
              loadingText={props.isEditing ? "Salvando..." : "Criando..."}
              spinner={
                <Spinner size="sm" color="white" speed="1s" />
              }
              isLoading={isSavingPlan}
            >
              {props.isEditing ? "Salvar alterações" : "Criar"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  )
}