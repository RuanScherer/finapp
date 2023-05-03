import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@hooks/useToast";
import { useQuery } from "react-query";

export function useTransactionsPerCategory() {
  const { user } = useAuth();
  const toast = useToast();

  const { data: transactionsPerCategory } = useQuery(
    "dashboardTransactionsPerCategory",
    fetchTransactionsPerCategory,
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  async function fetchTransactionsPerCategory() {
    try {
      return [] as any[];
    } catch {
      toast({
        title: "Erro ao buscar dados.",
        description:
          "Ocorreu um erro ao buscar alguns dados. Por favor, tente recarregar a página.",
        status: "error",
      });
    }
  }

  return { transactionsPerCategory };
}
