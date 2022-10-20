/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Section from "../components/Section";
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

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unseenVideos = (videos) => {
    return videos.filter((video) => !video.seen || video.seen == null);
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

      <div className="video-feed">
        <Section genre={"Recommended for you"} videos={unseenVideos(videos)} />
        <Section genre={"Family"} videos={filterVideos(videos, "family")} />
        <Section genre={"Thriller"} videos={filterVideos(videos, "thriller")} />
        <Section genre={"Classic"} videos={filterVideos(videos, "classic")} />
        <Section genre={"Pixar"} videos={filterVideos(videos, "pixar")} />
        <Section genre={"Marvel"} videos={filterVideos(videos, "marvel")} />
        <Section
          genre={"National Geographic"}
          videos={filterVideos(videos, "national-geographic")}
        />
        <Section genre={"Disney"} videos={filterVideos(videos, "disney")} />
        <Section
          genre={"Star Wars"}
          videos={filterVideos(videos, "star-wars")}
        />
      </div>
    </>
  );
};

export default Home;
