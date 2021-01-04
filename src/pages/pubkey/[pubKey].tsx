import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Badge, Row, Col, Tabs, Tab } from "react-bootstrap";

import { Transactions } from "@components/Transactions";
import { Certifications } from "@components/Certifications";
import { Issuer } from "@components/Issuer";
import { Balance } from "@components/Balance";

const PubKey = () => {
  const router = useRouter();
  const { pubKey } = router.query;
  if (Array.isArray(pubKey)) {
    throw Error("only one pubKey is allowed");
  }

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 20 }}>
        <Col>
          <Issuer pubKey={pubKey} imageWidth={60} fontSize="2em" />
          <Badge variant="primary" style={{ marginLeft: 10 }}>
            <Balance pubKey={pubKey} />
          </Badge>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs defaultActiveKey="payments-received" mountOnEnter={true}>
            <Tab eventKey="payments-received" title="Paiements reçus">
              <Transactions pubKey={pubKey} direction="received" />
            </Tab>
            <Tab eventKey="payments-sent" title="Paiements envoyés">
              <Transactions pubKey={pubKey} direction="sent" />
            </Tab>
            <Tab
              eventKey="certifications-received"
              title="Certifications reçues"
            >
              <Certifications pubKey={pubKey} direction="received" />
            </Tab>
            <Tab eventKey="certifications-sent" title="Certifications envoyées">
              <Certifications pubKey={pubKey} direction="sent" />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PubKey;
