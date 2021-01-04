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
        <Link href="/pubkey/pnSrZARn2gL5T5BLFGvLWFdWQ4RSLpQf8tJvBrK1GGE">
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
