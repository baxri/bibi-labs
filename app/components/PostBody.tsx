import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

// Define a constant for text max width
const TEXT_MAX_WIDTH = "1000px";

interface PostBodyProps {
  body: any;
}

export default function PostBody({ body }: PostBodyProps) {
  return (
    <PortableText
      value={body}
      components={{
        types: {
          image: ({ value }) => {
            const imageUrl = urlFor(value.asset)?.url();
            return (
              <div className="relative w-full h-[600px] my-20">
                <Image
                  src={imageUrl}
                  alt={value.alt || 'Blog post image'}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            );
          },
        },
        block: {
          normal: ({children}) => <p className="text-gray-300 dark:text-gray-200 text-xl text-center max-w-[var(--text-max-width)] mx-auto leading-loose" style={{"--text-max-width": TEXT_MAX_WIDTH} as React.CSSProperties}>{children}</p>,
          h1: ({children}) => <h1 className="text-6xl font-bold mt-10 mb-6 text-center max-w-[var(--text-max-width)] mx-auto leading-tight" style={{"--text-max-width": TEXT_MAX_WIDTH} as React.CSSProperties}>{children}</h1>,
          h2: ({children}) => <h2 className="text-5xl font-bold mt-8 mb-4 text-center max-w-[var(--text-max-width)] mx-auto leading-tight" style={{"--text-max-width": TEXT_MAX_WIDTH} as React.CSSProperties}>{children}</h2>,
          h3: ({children}) => <h3 className="text-4xl font-bold mt-6 mb-3 text-center max-w-[var(--text-max-width)] mx-auto leading-tight" style={{"--text-max-width": TEXT_MAX_WIDTH} as React.CSSProperties}>{children}</h3>,
          h4: ({children}) => <h4 className="text-3xl font-bold mt-5 mb-2 text-center max-w-[var(--text-max-width)] mx-auto leading-tight" style={{"--text-max-width": TEXT_MAX_WIDTH} as React.CSSProperties}>{children}</h4>,
          blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-8 text-xl text-center max-w-[var(--text-max-width)] mx-auto leading-loose" style={{"--text-max-width": TEXT_MAX_WIDTH} as React.CSSProperties}>{children}</blockquote>,
          code: ({children}) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-6 text-xl max-w-[var(--text-max-width)] mx-auto leading-loose" style={{"--text-max-width": TEXT_MAX_WIDTH} as React.CSSProperties}><code>{children}</code></pre>,
        },
        list: {
          bullet: ({children}) => <ul className="list-disc pl-6 my-6 text-xl mx-auto max-w-[var(--text-max-width)] leading-loose" style={{"--text-max-width": TEXT_MAX_WIDTH} as React.CSSProperties}>{children}</ul>,
          number: ({children}) => <ol className="list-decimal pl-6 my-6 text-xl mx-auto max-w-[var(--text-max-width)] leading-loose" style={{"--text-max-width": TEXT_MAX_WIDTH} as React.CSSProperties}>{children}</ol>,
        },
        listItem: {
          bullet: ({children}) => <li className="mb-2 text-gray-300 dark:text-gray-200 leading-loose">{children}</li>,
          number: ({children}) => <li className="mb-2 text-gray-300 dark:text-gray-200 leading-loose">{children}</li>,
        },
        marks: {
          strong: ({children}) => <strong className="font-bold">{children}</strong>,
          em: ({children}) => <em className="italic">{children}</em>,
          code: ({children}) => <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xl">{children}</code>,
          link: ({value, children}) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
              <a 
                href={value?.href} 
                target={target} 
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                className="text-blue-400 dark:text-blue-300 hover:underline"
              >
                {children}
              </a>
            )
          },
        }
      }}
    />
  );
} 