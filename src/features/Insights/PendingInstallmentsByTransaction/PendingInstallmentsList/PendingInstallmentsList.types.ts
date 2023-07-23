import { Database } from "@type/supabase/database.types";

export interface PendingInstallmentsListProps {
  pendingInstallments: Array<PendingInstallment>;
}

export type PendingInstallment = Database["public"]["CompositeTypes"]["pending_installments_by_transaction"]
