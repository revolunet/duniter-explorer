import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { request, gql } from "graphql-request";
import useSWR from "swr";
import { User as UserIcon } from "react-feather";
import { Table, Image as BsImage } from "react-bootstrap";
import format from "date-fns/format";

import gva from "@lib/gva";

const queryTransactions = gql`
  query queryTransactions($pubkeyOrScript: String!) {
    txsHistoryBc(pubkeyOrScript: $pubkeyOrScript) {
      received {
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

const queryBalance = gql`
  query queryBalance($script: String!) {
    balance(script: $script) {
      amount
    }
  }
`;

//("2NPxu6pjYoLdangwYRQNxMXSM1fqkmt35zHdfKEsNs4w");

const fetchTransactions = (pubKey) =>
  gva.request(queryTransactions, { pubkeyOrScript: pubKey });

const fetchBalance = (pubKey) => gva.request(queryBalance, { script: pubKey });

//fetch(url).then((res) => res.json());

const parseTxOutput = (output) => {
  const [_, amount, key] = output.match(/(\d+):0:SIG\((\w+)\)/);
  return { amount: parseInt(amount, 10), key };
};

const sum = (arr) => console.log(arr) || arr.reduce((a, c) => a + c, 0);

const KeyOutputs = ({ pubKey, outputs }) => {
  const keyOutputsAmount =
    (outputs &&
      sum(
        outputs
          .map(parseTxOutput)
          .filter((tx) => tx.key === pubKey)
          .map((tx) => tx.amount)
      )) ||
    0;
  return <div>{keyOutputsAmount / 100}</div>;
};

const G1_NODE_URL = `https://g1.data.le-sou.org`;

const fetchProfile = (pubKey) =>
  fetch(`${G1_NODE_URL}/user/profile/${pubKey}`).then((r) => r.json());

const Issuer = ({ pubKey, imageWidth = 30 }) => {
  const [src, setSrc] = useState(null);
  const { data: profile, error } = useSWR(`profile-${pubKey}`, () =>
    fetchProfile(pubKey)
  );
  if (error || !profile || !profile._source) return null;

  const avatar = profile._source.avatar ? (
    <BsImage
      src={`data:${profile._source.avatar._content_type};base64,${profile._source.avatar._content}`}
      width={imageWidth}
      rounded
    />
  ) : (
    <UserIcon width={imageWidth} />
  );

  return (
    <Link href={`/pubkey/${profile._source.issuer}`}>
      <a>
        {avatar}&nbsp;{profile._source.title}
      </a>
    </Link>
  );
};

const Balance = ({ pubKey }) => {
  const { data: balance, error } = useSWR(`balance-${pubKey}`, () =>
    fetchBalance(pubKey)
  );
  console.log("balance", balance);
  if (error || !balance) return <h4>0</h4>;
  return <h4>Balance : {formatCurrency(balance.balance.amount / 100)}</h4>;
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("fr-FR").format(amount) + " Ğ1";

const formatDate = (date) => format(new Date(date * 1000), "dd/MM/yyyy");

const PubKey = () => {
  const router = useRouter();
  const { pubKey } = router.query;
  const { data: transactions, error } = useSWR(`transactions-${pubKey}`, () =>
    fetchTransactions(pubKey)
  );

  console.log("transactions", transactions);
  if (error) return <div>failed to load transactions</div>;
  if (!transactions) return <div>loading transactions...</div>;
  return (
    <div>
      <Issuer pubKey={pubKey} imageWidth={60} />
      <Balance pubKey={pubKey} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Issuer</th>
            <th>Amount</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {transactions.txsHistoryBc.received.edges
            .map((tx) => tx.node)
            .map((node) => {
              return (
                <tr key={node.hash}>
                  <td>{node.hash.slice(0, 8)}</td>
                  <td>{formatDate(node.writtenTime)}</td>
                  <td>
                    <Issuer pubKey={node.issuers[0]} />
                  </td>
                  <td>
                    <KeyOutputs pubKey={pubKey} outputs={node.outputs} />
                  </td>
                  <td>{node.comment}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default PubKey;
