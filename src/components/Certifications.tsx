import React from "react";
import format from "date-fns/format";
import useSWR from "swr";
import { Spinner, Table } from "react-bootstrap";

import type {
  Certifications as TCertifications,
  Certification,
} from "../types/bma";

import { fetchCertifications } from "@lib/bma";

import { Issuer } from "@components/Issuer";

const formatDate = (date: number) =>
  format(new Date(date * 1000), "dd/MM/yyyy");

type CertificationsPropTypes = {
  pubKey: string;
  direction: "received" | "sent";
};

export const Certifications: React.FC<CertificationsPropTypes> = ({
  pubKey,
  direction,
}) => {
  const { data, error } = useSWR<TCertifications>(
    `certifications-${direction}-${pubKey}`,
    () => fetchCertifications({ pubKey, direction })
  );
  const targetLabel = direction === "received" ? "Emetteur" : "Destinataire";
  console.log("certifications", { pubKey, direction }, data);
  if (error) return <div>failed to load certifications</div>;
  if (data && data.certifications.length === 0) {
    return <div>Aucune certification enregistrée</div>;
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>{targetLabel}</th>
        </tr>
      </thead>
      <tbody>
        {(data &&
          data.certifications &&
          data.certifications.map((node: Certification) => {
            return (
              <tr key={node.signature}>
                <td>{formatDate(node.cert_time.medianTime)}</td>
                <td>
                  <Issuer pubKey={node.pubkey} />
                </td>
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
