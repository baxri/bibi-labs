import { groq } from "next-sanity";

// GROQ queries for posts

export const getPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage {
      asset-> {
        url
      }
    },
    publishedAt,
    body,
    excerpt
  }
`;

export const getPostMetadataQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt
  }
`; 