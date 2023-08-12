export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      allowed_users: {
        Row: {
          email: string
          id: number
        }
        Insert: {
          email: string
          id?: never
        }
        Update: {
          email?: string
          id?: never
        }
        Relationships: []
      }
      notifications: {
        Row: {
          category: string
          content: string
          created_at: string
          id: number
          read: boolean | null
          title: string
          transaction_id: number | null
          user_id: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          id?: never
          read?: boolean | null
          title: string
          transaction_id?: number | null
          user_id?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: never
          read?: boolean | null
          title?: string
          transaction_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_transaction_id_fkey"
            columns: ["transaction_id"]
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          }
        ]
      }
      plan_deposits: {
        Row: {
          created_at: string
          description: string | null
          id: number
          plan_id: number
          value: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: never
          plan_id: number
          value: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: never
          plan_id?: number
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "plan_deposits_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "plans"
            referencedColumns: ["id"]
          }
        ]
      }
      plans: {
        Row: {
          current_value: number
          due_date: string | null
          finished: boolean
          id: number
          name: string
          planned_value: number
          user_id: string
        }
        Insert: {
          current_value?: number
          due_date?: string | null
          finished?: boolean
          id?: never
          name: string
          planned_value: number
          user_id: string
        }
        Update: {
          current_value?: number
          due_date?: string | null
          finished?: boolean
          id?: never
          name?: string
          planned_value?: number
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category: string
          created_at: string
          due_date: string
          id: number
          id_original_transaction: number | null
          installment_amount: number | null
          installment_number: number | null
          name: string
          payment_method: string
          recurrence: string
          status: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          due_date: string
          id?: never
          id_original_transaction?: number | null
          installment_amount?: number | null
          installment_number?: number | null
          name: string
          payment_method: string
          recurrence: string
          status: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          due_date?: string
          id?: never
          id_original_transaction?: number | null
          installment_amount?: number | null
          installment_number?: number | null
          name?: string
          payment_method?: string
          recurrence?: string
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_id_original_transaction_fkey"
            columns: ["id_original_transaction"]
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      v_pending_installments_by_transaction: {
        Row: {
          installment_amount: number | null
          name: string | null
          pending_installment_amount: number | null
          type: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_category_suggestions_by_user_id: {
        Args: {
          p_user_id: string
        }
        Returns: string[]
      }
      get_month_balance: {
        Args: {
          p_user_id: string
          p_type: string
          p_from_date: string
          p_to_date: string
        }
        Returns: number
      }
      get_month_pendencies: {
        Args: {
          p_user_id: string
          p_type: string
          p_from_date: string
          p_to_date: string
        }
        Returns: number
      }
      get_month_pending_transactions: {
        Args: {
          p_user_id: string
          p_from_date: string
          p_to_date: string
        }
        Returns: Database["public"]["CompositeTypes"]["pending_transaction"][]
      }
      get_payment_suggestions_by_user_id: {
        Args: {
          p_user_id: string
        }
        Returns: string[]
      }
      get_pending_installments_by_transaction:
        | {
            Args: {
              p_user_id: string
              p_from_date: string
              p_to_date: string
              p_transaction_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["pending_installments_by_transaction"][]
          }
        | {
            Args: {
              p_user_id: string
              p_transaction_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["pending_installments_by_transaction"][]
          }
      get_spent_amount_by_category: {
        Args: {
          p_user_id: string
          p_from_date: string
          p_to_date: string
        }
        Returns: Database["public"]["CompositeTypes"]["spent_amount_by_category"][]
      }
      get_transactions_by_month: {
        Args: {
          p_user_id: string
          p_from_date: string
          p_to_date: string
        }
        Returns: {
          amount: number
          category: string
          created_at: string
          due_date: string
          id: number
          id_original_transaction: number | null
          installment_amount: number | null
          installment_number: number | null
          name: string
          payment_method: string
          recurrence: string
          status: string
          type: string
          user_id: string
        }[]
      }
      get_transactions_count_by_recurrence: {
        Args: {
          p_user_id: string
          p_from_date: string
          p_to_date: string
          p_transaction_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["transaction_count_by_recurrence"][]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      pending_installments_by_transaction: {
        name: string
        installment_amount: number
        pending_installment_amount: number
      }
      pending_transaction: {
        id: number
        name: string
        amount: number
        category: string
        type: string
        id_original_transaction: number
        installment_number: number
        installment_amount: number
      }
      spent_amount_by_category: {
        category: string
        amount: number
      }
      transaction_count_by_recurrence: {
        recurrence: string
        count: number
      }
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

