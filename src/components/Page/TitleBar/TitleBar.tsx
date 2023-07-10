import { Box, Heading, HStack } from "@chakra-ui/react";
import { Container } from "@components/Container";
import { RxArrowLeft } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { TitleBarProps } from "./";

export function TitleBar({ title }: TitleBarProps) {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
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
            {title}
          </Heading>

          <Box visibility="hidden">
            <RxArrowLeft />
          </Box>
        </HStack>
      </Container>
    </Box>
  );
}
