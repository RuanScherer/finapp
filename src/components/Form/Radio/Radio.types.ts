import { RadioProps as ChakraRadioProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface RadioProps extends ChakraRadioProps {
  label: string;
  name: string;
  defaultValue?: string;
  options: Option[];
}

interface Option {
  value: string;
  label: string | ReactNode;
}
