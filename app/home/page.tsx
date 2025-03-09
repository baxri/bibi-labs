import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from "next/link";

// Define the Project type
interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  coverImage?: {
    asset: {
      url: string;
    };
  };
  description?: string;
  tags?: string[];
  link?: string;
  iosStoreLink?: string;
  androidStoreLink?: string;
  orderRank?: string;
}

export default async function Home() {
  // Fetch all projects from Sanity, ordered by orderRank
  const projects = await client.fetch<Project[]>(
    groq`*[_type == "project"] | order(orderRank) {
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
    }`
  );

  return (
    <div className="pt-8 items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-[1368px] px-4">
        {projects.length > 0 ? (
          <div className="flex flex-col gap-12 w-full">
            {projects.map((project) => (
              <Link 
                href={`/projects/${project.slug.current}`} 
                key={project._id} 
                className="dark:border-gray-800 overflow-hidden block"
              >
                {project.coverImage && (
                  <div className="relative w-full h-[660px]">
                    <Image
                      src={project.coverImage.asset.url}
                      alt={project.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <div>
                  <div className="flex flex-col p-2">
                    <p className="text-white font-bold mt-2 text-[10pt]">{project.title}</p>
                    {project.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 max-w-[300px] text-[10pt]">{project.description}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No projects found.</p>
        )}
      </main>
    </div>
  );
}
