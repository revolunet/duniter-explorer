import React from "react";
import format from "date-fns/format";
import { request, gql } from "graphql-request";
import useSWR from "swr";
import { Spinner, Tabs, Tab, Table, Image as BsImage } from "react-bootstrap";

import type { TxGva, TxsHistoryBlockchainQueryInner } from "../types/gva";

import { gva } from "@lib/gva";
import { formatCurrency } from "@lib/formatCurrency";
import { Issuer } from "@components/Issuer";

interface TqueryTransactions {
  txsHistoryBc: TxsHistoryBlockchainQueryInner;
}

const queryTransactions = gql`
  query Transactions(
    $pubkeyOrScript: String!
    $showReceived: Boolean
    $showSent: Boolean
  ) {
    txsHistoryBc(pubkeyOrScript: $pubkeyOrScript) {
      received @include(if: $showReceived) {
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
        edges {
          node {
            hash
            issuers
            comment
            currency
            locktime
            writtenTime
            inputs
            outputs
          }
        }
      }
      sent @include(if: $showSent) {
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
        edges {
          node {
            hash
            issuers
            comment
            currency
            locktime
            writtenTime
            inputs
            outputs
          }
        }
      }
    }
  }
`;

interface FetchTransactionsArgs {
  pubKey: string;
  direction: "received" | "sent";
}

const fetchTransactions = ({ pubKey, direction }: FetchTransactionsArgs) =>
  gva.request<TqueryTransactions>(queryTransactions, {
    pubkeyOrScript: pubKey,
    showReceived: direction === "received",
    showSent: direction === "sent",
  });

const formatDate = (date: number) =>
  format(new Date(date * 1000), "dd/MM/yyyy");

type TransactionsPropTypes = {
  pubKey: string;
  direction: "received" | "sent";
};

const parseTxOutput = (output: string) => {
  const matches = output.match(/(\d+):0:SIG\((\w+)\)/);
  if (matches) {
    const [_, amount, key] = matches;
    return { amount: parseInt(amount, 10), key };
  }
  return { amount: 0 };
};

const sum = (arr: number[]): number => arr.reduce((a, c) => a + c, 0);

const TransactionAmount = ({ pubKey, inputs, outputs, direction }) => {
  //const entries = direction === "received" ? outputs : inputs;
  const amount =
    (outputs &&
      outputs.map &&
      sum(
        outputs
          .map(parseTxOutput)
          .filter((tx) =>
            direction === "received" ? tx.key === pubKey : tx.key !== pubKey
          )
          .map((tx) => tx.amount)
      )) ||
    0;
  return <React.Fragment>{formatCurrency(amount / 100)}</React.Fragment>;
};

const extractRecipientKeyFromOutputs = ({ senderKey, outputs }) =>
  outputs
    .map(parseTxOutput)
    .filter((tx) => tx.key !== senderKey)
    .map((tx) => tx.key);

export const Transactions: React.FC<TransactionsPropTypes> = ({
  pubKey,
  direction,
}) => {
  const {
    data: transactions,
    error,
  } = useSWR(`transactions-${direction}-${pubKey}`, () =>
    fetchTransactions({ pubKey, direction })
  );
  const targetLabel = direction === "received" ? "Emetteur" : "Destinataire";
  console.log("transactions", { pubKey, direction }, transactions);
  if (error) return <div>failed to load transactions</div>;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>{targetLabel}</th>
          <th>Montant</th>
          <th>Commentaire</th>
        </tr>
      </thead>
      <tbody>
        {(transactions &&
          transactions.txsHistoryBc[direction].edges
            .map((tx) => tx.node)
            .map((node: TxGva) => {
              const issuerKey =
                direction === "received"
                  ? node.issuers[0]
                  : extractRecipientKeyFromOutputs({
                      senderKey: pubKey,
                      outputs: node.outputs,
                    });
              return (
                <tr key={node.hash}>
                  <td>{node.hash.slice(0, 8)}</td>
                  <td>{formatDate(node.writtenTime)}</td>
                  <td>
                    <Issuer pubKey={issuerKey} />
                  </td>
                  <td className="text-right">
                    <TransactionAmount
                      pubKey={pubKey}
                      inputs={node.inputs}
                      outputs={node.outputs}
                      direction={direction}
                    />
                  </td>
                  <td>{node.comment}</td>
                </tr>
              );
            })) || (
          <tr>
            <td colSpan={5}>
              <Spinner animation="border" />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
