import { Box, Radio as ChakraRadio, RadioGroup, RadioProps as ChakraRadioProps, Text, VStack } from "@chakra-ui/react";
import { forwardRef } from "react";

interface RadioProps extends ChakraRadioProps {
  label: string;
  name: string;
  defaultValue?: string;
  options: Option[];
}

interface Option {
  value: string;
  label: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((
  { label, name, defaultValue, options, ...rest },
  ref
) => {
  return (
    <Box>
      <Text fontSize="smaller" fontWeight="medium" m="1">
        {label}
      </Text>
      <RadioGroup defaultValue={defaultValue}>
        <VStack alignItems="start">
          {options.map((option) => (
            <ChakraRadio
              id={name}
              name={name}
              colorScheme="primary"
              value={option.value}
              ref={ref}
              key={option.value}
              {...rest}
            >
              {option.label}
            </ChakraRadio>
          ))}
        </VStack>
      </RadioGroup>
    </Box>
  )
})
