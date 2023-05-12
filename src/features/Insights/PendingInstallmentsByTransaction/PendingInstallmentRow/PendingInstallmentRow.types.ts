import { Database } from "@type/supabase/database.types";

export interface PendingInstallmentRowProps {
  installment: Database["public"]["CompositeTypes"]["pending_installments_by_transaction"];
}
