import { request, gql } from "graphql-request";
import useSWR from "swr";

import type { AmountWithBase } from "../types/gva";
import { gva } from "@lib/gva";
import { formatCurrency } from "@lib/formatCurrency";

const queryBalance = gql`
  query queryBalance($script: String!) {
    balance(script: $script) {
      amount
    }
  }
`;

interface TqueryBalance {
  balance: AmountWithBase;
}

const fetchBalance = (pubKey) =>
  gva.request<TqueryBalance>(queryBalance, { script: pubKey });

type BalancePropTypes = {
  pubKey: string;
};

export const Balance: React.FC<BalancePropTypes> = ({ pubKey }) => {
  const { data: balance, error } = useSWR(`balance-${pubKey}`, () =>
    fetchBalance(pubKey)
  );
  if (error || !balance) return <h4>0</h4>;
  return <h4>Balance : {formatCurrency(balance.balance.amount / 100)}</h4>;
};
