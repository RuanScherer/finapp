import { HStack } from "@chakra-ui/react";
import { FiTrendingUp } from "react-icons/fi";
import { RxDashboard, RxGrid, RxStack } from "react-icons/rx";
import { Link } from "../Link";

export function Tabs() {
  return (
    <HStack
      display={["none", "none", "flex"]}
      wrap="wrap"
      gap="1"
      rowGap="2"
      py="2"
      mt={4}
    >
      <Link to="/dashboard" icon={<RxDashboard />} label="Dashboard" />
      <Link to="/transactions" icon={<RxStack />} label="Transações" />
      <Link to="/insights" icon={<FiTrendingUp />} label="Métricas" />
      <Link to="/plans" icon={<RxGrid />} label="Planejamento" />
    </HStack>
  )
}