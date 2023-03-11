import { Client } from "faunadb"

export const fauna = new Client({
  secret: import.meta.env.VITE_FAUNA_SECRET_KEY,
  domain: "db.us.fauna.com"
})
