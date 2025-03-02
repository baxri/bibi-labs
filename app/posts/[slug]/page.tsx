import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

// Define the Post type with full content
interface Post {
  _id: string;
  title: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  publishedAt: string;
  body?: any; // You might want to type this properly based on your Sanity schema
  excerpt?: string;
}

interface Props {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: Props) {
  // Fetch the post from Sanity
  // Check if the slug parameter is correctly passed
  console.log("Fetching post with slug:", params.slug);
  
  const post = await client.fetch<Post | null>(
    groq`*[_type == "post" && slug.current == $slug][0]{
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
    }`,
    { slug: `/${params.slug}` }
  );
  
  // Log the result to debug
  console.log("Query result:", post);
  
  // If post not found, return 404
  if (!post) {
    console.error("Post not found for slug:", params.slug);
    notFound();
  }


  console.log('post', params.slug, post);




  // If post not found, return 404
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl">
          {post.mainImage && (
            <div className="relative w-full h-[400px] mb-8">
              <Image
                src={post.mainImage.asset.url}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="text-gray-500 mb-8">
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>

          {post.excerpt && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Add your Sanity Portable Text component here for the body */}
          {/* Example: <PortableText value={post.body} /> */}
          
          <div className="mt-8">
            <a
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to all posts
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const post = await client.fetch<Post | null>(
    groq`*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt
    }`,
    { slug: params.slug }
  );

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
} 