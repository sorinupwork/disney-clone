// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient } from "graphql-request";

// eslint-disable-next-line import/no-anonymous-default-export
export default async ({ body }, res) => {
  const graphcms = new GraphQLClient(process.env.HYGRAPH_CONTENT_API, {
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_CMS_TOKEN}`,
    },
  });

  await graphcms.request(
    `
  mutation($slug: String!) {
    updateVideo(where: { slug: $slug }, data: { seen: true }) {
      id
      title
      seen
    }
  }
`,
    {
      slug: body.slug,
    }
  );

  await graphcms.request(
    `mutation publishVideo($slug: String!){
      publishVideo(where: {slug: $slug}, to: PUBLISHED){
        slug
      }
    }
    `,
    { slug: body.slug }
  );

  res.status(201).json({ slug: body.slug });
};
