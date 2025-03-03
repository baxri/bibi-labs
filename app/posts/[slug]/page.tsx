import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

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
  const { slug } = await params

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
    { slug: `/${slug}` }
  );

  console.log(post);


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
          {post.body && (
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ({ value }) => {
                    const imageUrl = urlFor(value.asset).url();

                    return <div className="relative w-full h-[300px] my-6">
                    <Image
                      src={imageUrl}
                      alt={value.alt || 'Blog post image'}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  },
                },
                block: {
                  normal: ({children}) => <p className="text-gray-600 dark:text-gray-400">{children}</p>,
                  h1: ({children}) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-2xl font-bold mt-5 mb-2">{children}</h3>,
                  h4: ({children}) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-6">{children}</blockquote>,
                  code: ({children}) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4"><code>{children}</code></pre>,
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc pl-6 my-4">{children}</ul>,
                  number: ({children}) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
                },
                listItem: {
                  bullet: ({children}) => <li className="mb-1">{children}</li>,
                  number: ({children}) => <li className="mb-1">{children}</li>,
                },
                marks: {
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  code: ({children}) => <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{children}</code>,
                  link: ({value, children}) => {
                    const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
                    return (
                      <a 
                        href={value?.href} 
                        target={target} 
                        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {children}
                      </a>
                    )
                  },
                }
              }}
            />
          )}

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
  const { slug } = await params

  const post = await client.fetch<Post | null>(
    groq`*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt
    }`,
    { slug: `/${slug}` }
  );

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}
