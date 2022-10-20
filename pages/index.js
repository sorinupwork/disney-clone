/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { gql, GraphQLClient } from "graphql-request";

const url = process.env.HYGRAPH_CONTENT_API;

export const getStaticProps = async () => {
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_CMS_TOKEN}`,
    },
  });

  const query = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const data = await graphQLClient.request(query);
  const videos = data.videos;

  return {
    props: {
      videos,
    },
  };
};

const Home = ({ videos }) => {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  return (
    <>
      <Head>
        <title>Disney Clone</title>
        <meta
          name="description"
          content="Disney Channel Inc by next js and graphql"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>
      </div>

      <div className="video-feed"></div>
    </>
  );
};

export default Home;
