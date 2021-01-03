import Link from "next/link";
import { Jumbotron, Button } from "react-bootstrap";

const Page = () => (
  <div>
    <Jumbotron>
      <h1>Duniter explorer</h1>
      <p>
        Static web app to explore{" "}
        <a href="https://duniter.org" target="_blank">
          duniter blockchain
        </a>{" "}
        through the GraphQL Validation API.
      </p>
      <p>
        <Link href="/pubkey/2NPxu6pjYoLdangwYRQNxMXSM1fqkmt35zHdfKEsNs4w">
          <Button variant="primary">Explorer un portefeuille</Button>
        </Link>{" "}
        <Link href="https://github.com/revolunet/duniter-explorer">
          <Button variant="light">Voir le projet sur GitHub</Button>
        </Link>
      </p>
    </Jumbotron>
  </div>
);

export default Page;
