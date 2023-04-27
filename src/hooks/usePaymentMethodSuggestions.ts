import { useAuth } from "@contexts/AuthContext";
import { fauna } from "@services/faunadb";
import { query as q } from "faunadb";
import { useQuery } from "react-query";

export function usePaymentMethodSuggestions() {
  const { user } = useAuth();

  const query = useQuery(
    "paymentMethodSuggestions",
    async () => {
      const paymentMethods = await fauna.query<{ data: string[] }>(
        q.Paginate(
          q.Distinct(
            q.Match(
              q.Index("payment_methods_of_transactions_by_user_id"),
              user!.id
            )
          )
        )
      );
      return paymentMethods.data;
    },
    {
      staleTime: 60 * 60 * 1000, // 1 hour
    }
  );

  return query;
}
