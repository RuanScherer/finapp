import { Container } from "@components/Container";
import { ContentProps } from "./";

export function Content({ children, ...rest }: ContentProps) {
  return (
    <Container py={[4, 8]} {...rest}>
      {children}
    </Container>
  );
}
