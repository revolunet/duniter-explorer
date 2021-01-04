import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumb, Row, Col, Container } from "react-bootstrap";

const Breadcrumbs = ({ breadcrumbs }) => (
  <Breadcrumb>
    {breadcrumbs.map((breadcrumb) =>
      breadcrumb.url && breadcrumbs.length > 1 ? (
        <Breadcrumb.Item linkAs={Link} href={breadcrumb.url}>
          <a>{breadcrumb.title}</a>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item active>{breadcrumb.title}</Breadcrumb.Item>
      )
    )}
  </Breadcrumb>
);

export const Layout = ({ children }) => {
  const router = useRouter();
  if (!router.query) return children;
  const breadcrumbs = [
    {
      title: "Accueil",
      url: "/",
    },
  ];
  if (router.query.pubKey) {
    breadcrumbs.push({
      title: `Portefeuille ${router.query.pubKey}`,
    });
  }
  return (
    <Container>
      <Row>
        <Col>
          {breadcrumbs.length > 1 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        </Col>
      </Row>
      {children}
    </Container>
  );
};
