import { groq } from "next-sanity";

// GROQ queries for projects

export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(orderRank) {
    _id,
    title,
    slug,
    coverImage {
      asset-> {
        url
      }
    },
    description,
    tags,
    link,
    iosStoreLink,
    androidStoreLink
  }
`;

export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    coverImage {
      asset-> {
        url
      }
    },
    publishedAt,
    body,
    description,
    tags,
    link,
    iosStoreLink,
    androidStoreLink,
    excerpt
  }
`;

export const getProjectMetadataQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    title,
    description
  }
`; 