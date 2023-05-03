import { TransactionRecurrence } from "@shared/enums/transactionRecurrence";
import { TransactionStatus } from "@shared/enums/transactionStatus";
import { TransactionType } from "@shared/enums/transactionType";
import { Database } from "@type/supabase/database.types";

export interface Transaction {
  id?: number;
  name?: string;
  amount?: number;
  type?: TransactionType;
  category?: string;
  paymentMethod?: string;
  recurrence?: TransactionRecurrence;
  dueDate?: Date;
  status?: TransactionStatus;
  installmentAmount?: number;
  installmentNumber?: number;
  idOriginalTransaction?: number;
  userId?: string;
}

export type DatabaseTransaction =
  Database["public"]["Tables"]["transactions"]["Row"];
