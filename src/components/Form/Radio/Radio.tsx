import {
  Box,
  Radio as ChakraRadio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { RadioProps } from "./Radio.types";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, name, defaultValue, options, ...rest }, ref) => {
    return (
      <Box>
        <Text fontSize="smaller" fontWeight="medium" m="1" w="fit-content">
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
    );
  }
);
