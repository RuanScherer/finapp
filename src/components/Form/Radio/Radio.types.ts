import { RadioProps as ChakraRadioProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Control } from "react-hook-form";

export interface RadioProps extends ChakraRadioProps {
  label: string;
  name: string;
  defaultValue?: string;
  options: Option[];
  control: Control<any>;
}

interface Option {
  value: string;
  label: string | ReactNode;
}
