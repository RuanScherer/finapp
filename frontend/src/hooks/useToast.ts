import { useToast as useChakraToast, UseToastOptions } from "@chakra-ui/react"

type ToastParams = Omit<UseToastOptions, "duration" | "size" | "variant" | "isClosable" | "position"> 

export function useToast() {
  const toast = useChakraToast()

  return (params: ToastParams) => {
    toast({
      ...params,
      duration: 8000,
      isClosable: true,
      position: "top-right",
      size: "sm",
      variant: "left-accent"
    })
  }
}
