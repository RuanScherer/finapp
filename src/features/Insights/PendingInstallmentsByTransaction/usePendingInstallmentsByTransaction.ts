import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { supabase } from "@services/supabase";
import { TransactionType } from "@shared/enums/transactionType";
import { QueryFunctionContext, useQuery } from "react-query";

export function usePendingInstallmentsByTransaction(
  transactionType: TransactionType
) {
  const { user } = useAuth();
  const toast = useToast();

  const { data: pendingInstallmentsByTransaction } = useQuery(
    ["insightsPendingInstallmentsByTransaction", transactionType],
    fetchPendingInstallmentsByTransaction,
    {
      staleTime: 60 * 60 * 1000, // 1 hour
    }
  );

  async function fetchPendingInstallmentsByTransaction(
    context: QueryFunctionContext<any>
  ) {
    const [_key, transactionType] = context.queryKey;

    const { error, data } = await supabase.rpc(
      "get_pending_installments_by_transaction",
      {
        p_user_id: user!.id,
        p_transaction_type: transactionType,
      }
    );

    if (error) {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar as parcelas pendentes. Por favor, tente recarregar a página.",
        status: "error",
      });
      throw new Error("Erro ao buscar parcelas pendentes.");
    }

    return data;
  }

  return { pendingInstallmentsByTransaction };
}
