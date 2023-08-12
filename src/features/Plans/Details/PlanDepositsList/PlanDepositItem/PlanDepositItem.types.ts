import { Deposit } from "../PlanDepositsList.types";

export interface PlanDepositItemProps {
  deposit: Deposit;
  hasBottomBorder?: boolean;
}

export interface UsePlanDepositItemParams {
  depositId: number;
  planId: number
}