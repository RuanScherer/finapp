import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Input } from "@components/Form/Input";
import { Radio } from "@components/Form/Radio/Radio";
import { yupResolver } from "@hookform/resolvers/yup";
import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";
import { currencyFormatter } from "@shared/utils/currencyFormatter";
import { formatDateForFauna } from "@shared/utils/formatDateForFauna";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxArrowLeft } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { NewTransactionFormData } from "./NewTransaction.types";
import { useNewTransaction } from "./useNewTransaction";

const currentDate = formatDateForFauna(new Date());

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
});

export function NewTransaction() {
  const { register, formState, handleSubmit, watch, setValue } =
    useForm<NewTransactionFormData>({
      resolver: yupResolver(newTransactionFormSchema),
      defaultValues: {
        status: TransactionStatus.PENDENT,
      },
    });
  const { categorySuggestions, paymentMethodSuggestions, handleSave } =
    useNewTransaction();
  const navigate = useNavigate();

  const recurrence = watch("recurrence");
  const amount = watch("amount");
  const installmentAmount = watch("installmentAmount");

  useEffect(() => {
    if (recurrence !== TransactionRecurrence.UNIQUE) {
      setValue("status", TransactionStatus.PENDENT);
    }

    if (recurrence === TransactionRecurrence.FIXED) {
      setValue("installmentAmount", 12); // 1 year
    }
  }, [recurrence]);

  function handleBack() {
    navigate(-1);
  }

  return (
    <Flex
      as="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="full"
      maxW="600"
      mx="auto"
      px="4"
      py="6"
      onSubmit={handleSubmit(handleSave)}
    >
      <Heading
        display="flex"
        alignItems="center"
        alignSelf="flex-start"
        gap="4"
        fontSize="2xl"
        fontWeight="semibold"
      >
        <RxArrowLeft cursor="pointer" onClick={handleBack} />
        Nova transação
      </Heading>

      <SimpleGrid columns={2} gap="4" w="full" mt="10">
        <Input
          label="Nome"
          error={formState.errors.name}
          {...register("name")}
        />

        <Input
          type="number"
          step="0.01"
          isCurrency
          label="Valor"
          error={formState.errors.amount}
          {...register("amount")}
        />

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
              { value: TransactionRecurrence.INSTALLMENT, label: "Parcelado" },
              { value: TransactionRecurrence.FIXED, label: "Fixo" },
            ]}
            {...register("recurrence")}
          />

          <Radio
            label="Tipo"
            defaultValue={TransactionType.OUTCOME}
            options={[
              { value: TransactionType.INCOME, label: "Receita" },
              { value: TransactionType.OUTCOME, label: "Despesa" },
            ]}
            {...register("type")}
          />

          {(!recurrence || recurrence === "UNICO") && (
            <Radio
              label="Situação"
              defaultValue={TransactionStatus.PENDENT}
              options={[
                { value: TransactionStatus.PENDENT, label: "Pendente" },
                { value: TransactionStatus.SETTLED, label: "Quitado" },
              ]}
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
            <Box>
              <Input
                type="number"
                label="Quantidade de parcelas"
                error={formState.errors.installmentAmount}
                {...register("installmentAmount")}
              />

              {amount && installmentAmount && (
                <Text fontSize="small" mt="1" color="text.600">
                  Valor das parcelas:{" "}
                  {currencyFormatter.format(
                    Number(amount) / Number(installmentAmount)
                  )}
                </Text>
              )}
            </Box>
          </SimpleGrid>
        </>
      )}

      <HStack justifyContent="center" mt="10" w="full">
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
  );
}
