import { Component } from 'react';
import Head from 'next/head';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-dom';

import { getApi } from '~/lib/prismic';
import { groupByYear } from '~/lib/utils';
import PageMeta from '~/components/PageMeta';
import Header from '~/components/Header';
import MainHeading from '~/components/MainHeading';
import Container from '~/components/Container';
import Divider from '~/components/ContentItem/Divider';
import SmallHeading from '~/components/SmallHeading';
import YearListing from '~/components/YearListing';
import YearListingItem from '~/components/YearListingItem';

const Exhibition = ({ exhibition: { title, venue, location } }) => (
  <YearListingItem>
    {RichText.asText(title)},{' '}
    {/* TODO: needs to link to a project if it's featured on one */}
    {venue}, {location}
  </YearListingItem>
);

export default class Exhibitions extends Component {
  static async getInitialProps({ req, query, pathname }) {
    const api = await getApi(req);
    const exhibitionsResponse = await api.query(
      Prismic.Predicates.at('document.type', 'exhibition'),
      {
        orderings: '[my.exhibition.date desc]',
        pageSize: 100,
      }
    );
    const exhibitions = exhibitionsResponse.results.map(r => ({
      uid: r.uid,
      ...r.data,
      exhibition_type: r.data.exhibition_type || 'solo',
    }));

    return {
      soloExhibitions: exhibitions.filter(e => e.exhibition_type === 'solo'),
      groupExhibitions: exhibitions.filter(e => e.exhibition_type === 'group'),
      pathname,
    };
  }

  render() {
    const { soloExhibitions, groupExhibitions, pathname } = this.props;

    return (
      <div>
        <Head>
          <title>Exhibitions | Bradley McCallum</title>
        </Head>
        <PageMeta />
        <Header pathname={pathname} />

        <MainHeading>Exhibitions List</MainHeading>

        <Container>
          <SmallHeading>Solo</SmallHeading>
          <ul>
            {groupByYear(soloExhibitions).map(([year, exhibitions]) => (
              <YearListing year={year} key={year}>
                {exhibitions.map(exhibition => (
                  <Exhibition exhibition={exhibition} key={exhibition.uid} />
                ))}
              </YearListing>
            ))}
          </ul>
        </Container>

        <Divider />

        <Container>
          <SmallHeading>Group</SmallHeading>
          <ul>
            {groupByYear(groupExhibitions).map(([year, exhibitions]) => (
              <YearListing year={year} key={year}>
                {exhibitions.map(exhibition => (
                  <Exhibition exhibition={exhibition} key={exhibition.uid} />
                ))}
              </YearListing>
            ))}
          </ul>
        </Container>

        <Divider />

        <Container>
          <SmallHeading>Special Exhibitions</SmallHeading>
          <p>
            There are a number of{' '}
            <Link
              as={`/project/special-exhibitions`} // URL exposed to the browser
              href={`/project?slug=special-exhibitions`} // simplified URL for next.js client routing
            >
              <a>special exhibitions</a>
            </Link>{' '}
            that Bradley wishes to highlight.
          </p>
        </Container>

        <style jsx>{`
          ul {
            padding-left: 0;
          }

          a {
            font-weight: ${weights.bold};
          }
        `}</style>
      </div>
    );
  }
}
