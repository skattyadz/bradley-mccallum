import { Component } from "react";
import Head from "next/head";
import Prismic from "prismic-javascript";

import { getApi } from "~/lib/prismic";
import PageMeta from "~/components/PageMeta";
import Header from "~/components/Header";
import MainHeading from "~/components/MainHeading";

export default class extends Component {
  static async getInitialProps({ req, query }) {
    const api = await getApi(req);

    return {
      // pressItems: pressItems.map(e => ({ uid: e.uid, ...e.data })),
    };
  }

  render() {
    const { pressItems } = this.props;

    return (
      <div>
        <Head>
          <title>Bibliography</title>
        </Head>
        <PageMeta />
        <Header />

        <div />
        <MainHeading>Bibliography</MainHeading>

        <style jsx>{``}</style>
      </div>
    );
  }
}