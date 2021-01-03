import * as React from "react";
import App from "next/app";
import Head from "next/head";
import { Container } from "react-bootstrap";

import type { AppProps } from "next/app";

// custom bootstrap theme
import "@styles/bootstrap-theme.scss";

const Layout = ({ children }) => <Container>{children}</Container>;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <React.Fragment>
      <Head>
        <title>Duniter explorer</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
};

export default MyApp;
