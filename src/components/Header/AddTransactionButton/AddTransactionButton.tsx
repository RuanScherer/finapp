import { Button, IconButton } from "@chakra-ui/react";
import { RxPlus } from "react-icons/rx";
import { Link } from "react-router-dom";

const buttonCommonProps = {
  bgColor: "whiteAlpha.200",
  textColor: "whiteAlpha.900",
  _hover: {
    bgColor: "whiteAlpha.300",
  },
}

export function AddTransactionButton() {
  return (
    <Link to="/transaction/new">
      <Button
        {...buttonCommonProps}
        display={["none", "flex"]}
        leftIcon={<RxPlus color="white" strokeWidth={1} />}
      >
        Adicionar transação
      </Button>

      <IconButton
        {...buttonCommonProps}
        display={["flex", "none"]}
        icon={<RxPlus color="white" strokeWidth={1} />}
        aria-label="Sair do FinApp"
        borderRadius="full"
      />
    </Link>
  )
}