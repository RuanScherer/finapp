import { FormControl, FormLabel, Input as ChakraInput, InputGroup, InputLeftAddon, InputProps as ChakraInputProps, Text } from "@chakra-ui/react";
import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  label: string;
  name: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  isCurrency?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>((
  { label, name, error, isCurrency, ...rest },
  ref
) => {
  const Input = (
    <ChakraInput
      name={name}
      variant="filled"
      _focus={{
        boxShadow: "none",
        borderColor: "primary.500"
      }}
      {...rest}
      ref={ref}
    />
  )

  return (
    <FormControl>
      <FormLabel fontSize="smaller" fontWeight="medium" m="1">
        {label}
      </FormLabel>

      {isCurrency ? (
        <InputGroup>
          <InputLeftAddon>
            <Text fontSize="smaller">R$</Text>
          </InputLeftAddon>
          {Input}
        </InputGroup>
      ) : (
        Input
      )}    

      {!!error && (
        <Text fontSize="smaller" color="red.500" mt="2">
          {String(error.message)}
        </Text>
      )}
    </FormControl>
  )
})