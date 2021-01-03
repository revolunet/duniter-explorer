import React from "react";
import App from "next/app";
import Head from "next/head";

// custom bootstrap
import "@styles/bootstrap-theme.scss";

const Layout = ({ children }) => <div>{children}</div>;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>June</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Layout user={pageProps.user}>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default MyApp;
