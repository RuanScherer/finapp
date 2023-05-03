import { useAuth } from "@contexts/AuthContext";
import { supabase } from "@services/supabase";
import { useQuery } from "react-query";

export function usePaymentMethodSuggestions() {
  const { user } = useAuth();

  const query = useQuery(
    "paymentMethodSuggestions",
    async () => {
      const { error, data } = await supabase.rpc(
        "get_payment_suggestions_by_user_id",
        {
          p_user_id: user!.id,
        }
      );

      if (error) throw new Error("Erro ao obter sugestões de pagamento.");
      return data;
    },
    {
      staleTime: 60 * 60 * 1000, // 1 hour
    }
  );

  return query;
}
