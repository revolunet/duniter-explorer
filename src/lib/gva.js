import { GraphQLClient } from "graphql-request";

const GVA_ENDPOINT = process.env.GVA_ENDPOINT || "https://g1.librelois.fr/gva";

const client = new GraphQLClient(GVA_ENDPOINT, { headers: {} });

export default client;
