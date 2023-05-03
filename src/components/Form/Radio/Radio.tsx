import {
  Box,
  Radio as ChakraRadio,
  Text,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { useController } from "react-hook-form";
import { RadioProps } from "./Radio.types";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, name, control, defaultValue, options, ...rest }, ref) => {
    const { field } = useController({
      name,
      control,
      defaultValue,
    });
    const { getRootProps, getRadioProps } = useRadioGroup({ ...field });

    return (
      <Box>
        <Text fontSize="smaller" fontWeight="medium" m="1" w="fit-content">
          {label}
        </Text>
        <VStack alignItems="start" {...getRootProps()}>
          {options.map((option) => (
            <ChakraRadio
              id={name}
              name={name}
              colorScheme="primary"
              ref={ref}
              key={option.value}
              {...rest}
              {...getRadioProps({ value: option.value })}
            >
              {option.label}
            </ChakraRadio>
          ))}
        </VStack>
      </Box>
    );
  }
);
