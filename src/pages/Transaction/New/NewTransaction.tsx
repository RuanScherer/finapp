import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Container } from "@components/Container";
import { Input } from "@components/Form/Input";
import { Radio } from "@components/Form/Radio/Radio";
import { Tooltip } from "@components/Tooltip";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCategorySuggestions } from "@hooks/useCategorySuggestions";
import { usePaymentMethodSuggestions } from "@hooks/usePaymentMethodSuggestions";
import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";
import { formatDateForDatabase } from "@shared/utils/formatDateForDatabase";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxArrowLeft, RxInfoCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { NewTransactionFormData } from "./NewTransaction.types";
import { useNewTransaction } from "./useNewTransaction";

const currentDate = formatDateForDatabase(new Date());

const newTransactionFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  amount: yup
    .number()
    .typeError("Valor deve ser um número")
    .min(0, "Valor deve ser maior que zero")
    .required("Valor é obrigatório"),
  category: yup.string().required("Categoria é obrigatória"),
  paymentMethod: yup.string().required("Forma de pagamento é obrigatória"),
  type: yup.string().required("Tipo é obrigatório"),
  status: yup.string().required("Situação é obrigatória"),
  recurrence: yup.string().required("Recorrência é obrigatória"),
  dueDate: yup
    .date()
    .typeError("Insira uma data válida")
    .min(currentDate, "A data deve ser atual ou futura")
    .required("Data de vencimento é obrigatória"),
  installmentAmount: yup.mixed().when("recurrence", {
    is: TransactionRecurrence.INSTALLMENT,
    then: yup
      .number()
      .typeError("Quantidade de parcelas deve ser um número")
      .min(1, "Quantidade de parcelas deve ser maior que zero")
      .required("Quantidade de parcelas é obrigatório"),
    otherwise: yup.mixed(),
  }),
  installmentValue: yup.mixed().when("recurrence", {
    is: TransactionRecurrence.INSTALLMENT,
    then: yup
      .number()
      .typeError("Valor da parcela deve ser um número")
      .min(1, "Valor da parcela deve ser maior que zero")
      .required("Valor da parcela é obrigatório"),
    otherwise: yup.mixed(),
  }),
});

export function NewTransaction() {
  const { register, control, formState, handleSubmit, watch, setValue } =
    useForm<NewTransactionFormData>({
      resolver: yupResolver(newTransactionFormSchema),
      defaultValues: {
        type: TransactionType.OUTCOME,
        recurrence: TransactionRecurrence.UNIQUE,
        status: TransactionStatus.PENDING,
      },
    });
  const { handleSave } = useNewTransaction();
  const { data: categorySuggestions } = useCategorySuggestions();
  const { data: paymentMethodSuggestions } = usePaymentMethodSuggestions();
  const navigate = useNavigate();

  const recurrence = watch("recurrence");
  const amount = watch("amount");
  const installmentAmount = watch("installmentAmount");
  const installmentValue = watch("installmentValue");

  useEffect(() => {
    if (recurrence !== TransactionRecurrence.UNIQUE) {
      setValue("status", TransactionStatus.PENDING);
    }

    if (recurrence === TransactionRecurrence.FIXED) {
      setValue("installmentAmount", 12); // 1 year
    }
  }, [recurrence]);

  function handleBack() {
    navigate(-1);
  }

  console.log(formState.errors);

  return (
    <>
      <Box bgColor="primary.500" shadow="md">
        <Container>
          <HStack justifyContent="center" gap={1}>
            <RxArrowLeft
              cursor="pointer"
              size={18}
              color="white"
              strokeWidth={1}
              onClick={handleBack}
            />

            <Heading
              fontSize={["lg", "xl", "2xl"]}
              fontWeight="semibold"
              color="whiteAlpha.900"
            >
              Nova transação
            </Heading>

            <Box visibility="hidden">
              <RxArrowLeft />
            </Box>
          </HStack>
        </Container>
      </Box>

      <Container py={[4, 8]}>
        <Flex
          as="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          w="full"
          maxW="600"
          mx="auto"
          onSubmit={handleSubmit(handleSave)}
        >
          <SimpleGrid columns={[1, 2]} gap="4" w="full">
            <Input
              label="Nome"
              error={formState.errors.name}
              {...register("name")}
            />

            {recurrence === TransactionRecurrence.INSTALLMENT ? (
              <Input
                name="amount-readonly"
                type="number"
                step="0.01"
                isCurrency
                label="Valor"
                isDisabled
                _disabled={{
                  opacity: 1,
                  cursor: "not-allowed",
                }}
                value={amount}
              />
            ) : (
              <Input
                type="number"
                step="0.01"
                isCurrency
                label="Valor"
                error={formState.errors.amount}
                {...register("amount")}
              />
            )}

            <Input
              list="categories"
              label="Categoria"
              error={formState.errors.category}
              {...register("category")}
            />
            <datalist id="categories">
              {categorySuggestions?.map((category) => (
                <option value={category} key={category} />
              ))}
            </datalist>

            <Input
              list="paymentMethods"
              label="Forma de pagamento"
              error={formState.errors.paymentMethod}
              {...register("paymentMethod")}
            />
            <datalist id="paymentMethods">
              {paymentMethodSuggestions?.map((paymentMethod) => (
                <option value={paymentMethod} key={paymentMethod} />
              ))}
            </datalist>

            <SimpleGrid columns={2} gap={4}>
              <Radio
                label="Recorrência"
                defaultValue={TransactionRecurrence.UNIQUE}
                options={[
                  { value: TransactionRecurrence.UNIQUE, label: "Único" },
                  {
                    value: TransactionRecurrence.INSTALLMENT,
                    label: "Parcelado",
                  },
                  {
                    value: TransactionRecurrence.FIXED,
                    label: (
                      <HStack>
                        <Text>Fixo</Text>
                        <Tooltip
                          label="A transação será repetida mensalmente por 12 meses. Após esse período, ela será encerrada e você precisará cadastrá-la novamente caso queria mantê-la. Mas relaxa, vamos te avisar antes 😉"
                          placement="top"
                          borderRadius="md"
                          fontSize="xs"
                          textAlign="center"
                          hasArrow
                        >
                          <Box>
                            <RxInfoCircled size={14} strokeWidth={0.2} />
                          </Box>
                        </Tooltip>
                      </HStack>
                    ),
                  },
                ]}
                control={control}
                {...register("recurrence")}
              />

              <Radio
                label="Tipo"
                defaultValue={TransactionType.OUTCOME}
                options={[
                  { value: TransactionType.INCOME, label: "Receita" },
                  { value: TransactionType.OUTCOME, label: "Despesa" },
                ]}
                control={control}
                {...register("type")}
              />

              {(!recurrence || recurrence === TransactionRecurrence.UNIQUE) && (
                <Radio
                  label="Situação"
                  defaultValue={TransactionStatus.PENDING}
                  options={[
                    { value: TransactionStatus.PENDING, label: "Pendente" },
                    { value: TransactionStatus.SETTLED, label: "Quitado" },
                  ]}
                  control={control}
                  {...register("status")}
                />
              )}
            </SimpleGrid>

            <Input
              type="date"
              label="Vencimento"
              min={currentDate}
              defaultValue={currentDate}
              error={formState.errors.dueDate}
              {...register("dueDate")}
            />
          </SimpleGrid>

          {recurrence === TransactionRecurrence.INSTALLMENT && (
            <>
              <Heading mt="6" fontSize="xl" fontWeight="semibold" w="full">
                Parcelamento
              </Heading>

              <SimpleGrid columns={2} gap="4" w="full" mt="2">
                <Input
                  type="number"
                  label="Quantidade de parcelas"
                  error={formState.errors.installmentAmount}
                  {...register("installmentAmount", {
                    onChange: (e) => {
                      const installmentAmount = Number(e.target.value);
                      const amount =
                        (installmentValue ?? 0) * (installmentAmount ?? 1);
                      if (amount) {
                        setValue("amount", Number(amount.toFixed(2)));
                      }
                    },
                  })}
                />

                <Input
                  type="number"
                  label="Valor da parcela"
                  error={formState.errors.installmentValue}
                  isCurrency
                  step="0.01"
                  {...register("installmentValue", {
                    onChange: (e) => {
                      const installmentValue = Number(e.target.value);
                      const amount =
                        (installmentValue ?? 0) * (installmentAmount ?? 1);
                      if (amount) {
                        setValue("amount", Number(amount.toFixed(2)));
                      }
                    },
                  })}
                />
              </SimpleGrid>
            </>
          )}

          <HStack justifyContent="center" gap="4" mt="10" w="full">
            <Button
              type="button"
              flex="1"
              maxW="120px"
              fontWeight="medium"
              onClick={handleBack}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              flex="1"
              maxW="120px"
              fontWeight="medium"
              colorScheme="primary"
            >
              Salvar
            </Button>
          </HStack>
        </Flex>
      </Container>
    </>
  );
}
