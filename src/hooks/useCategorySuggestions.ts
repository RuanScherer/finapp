import { useAuth } from "@contexts/AuthContext";
import { supabase } from "@services/supabase";
import { useQuery } from "react-query";

export function useCategorySuggestions() {
  const { user } = useAuth();

  const query = useQuery(
    "categorySuggestions",
    async () => {
      const { error, data } = await supabase.rpc(
        "get_category_suggestions_by_user_id",
        {
          p_user_id: user!.id,
        }
      );

      if (error) throw new Error("Erro ao obter sugestões de categorias.");
      return data;
    },
    {
      staleTime: 60 * 60 * 1000, // 1 hour
    }
  );

  return query;
}
