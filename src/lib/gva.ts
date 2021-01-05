import { GraphQLClient } from "graphql-request";

const GVA_ENDPOINT =
  process.env.NEXT_PUBLIC_GVA_ENDPOINT || "https://g1.librelois.fr/gva";

export const gva = new GraphQLClient(GVA_ENDPOINT, { headers: {} });
