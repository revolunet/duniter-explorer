import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tabs, Tab } from "react-bootstrap";

import { Transactions } from "@components/Transactions";
import { Issuer } from "@components/Issuer";
import { Balance } from "@components/Balance";

const PubKey = () => {
  const router = useRouter();
  const { pubKey } = router.query;
  if (Array.isArray(pubKey)) {
    throw Error("only one pubKey is allowed");
  }

  return (
    <div>
      <Issuer pubKey={pubKey} imageWidth={60} />
      <Balance pubKey={pubKey} />
      <Tabs defaultActiveKey="received">
        <Tab eventKey="received" title="Reçu">
          <Transactions pubKey={pubKey} direction="received" />
        </Tab>
        <Tab eventKey="sent" title="Envoyé">
          <Transactions pubKey={pubKey} direction="sent" />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PubKey;
