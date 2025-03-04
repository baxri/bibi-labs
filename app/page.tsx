import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

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
}

export default async function Home() {
  // Fetch all projects from Sanity
  const projects = await client.fetch<Project[]>(
    groq`*[_type == "project"] | order(_createdAt desc) {
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
    <div className="pt-4 items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-[1368px]">
        {projects.length > 0 ? (
          <div className="flex flex-col gap-12 w-full">
            {projects.map((project) => (
              <div key={project._id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {project.coverImage && (
                  <div className="relative w-full h-[400px]">
                    <Image
                      src={project.coverImage.asset.url}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                    {project.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-2">
                      <a 
                        href={`/projects/${project.slug.current}`} 
                        className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View project →
                      </a>
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Visit website →
                        </a>
                      )}
                      {project.iosStoreLink && (
                        <a 
                          href={project.iosStoreLink}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          iOS App Store →
                        </a>
                      )}
                      {project.androidStoreLink && (
                        <a 
                          href={project.androidStoreLink}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Android Play Store →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No projects found.</p>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:your.email@example.com"
        >
          Contact
        </a>
      </footer>
    </div>
  );
}
