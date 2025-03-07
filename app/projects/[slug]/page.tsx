import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import PostBody from "@/app/components/PostBody";
import Link from "next/link";

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
  publishedAt?: string;
  body?: any;
  excerpt?: string;
}

interface Props {
  params: { slug: string };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = params;

  const project = await client.fetch<Project | null>(
    groq`*[_type == "project" && slug.current == $slug][0]{
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
    }`,
    { slug }
  );

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen p-4 sm:p-12">
      <header className="max-w-[1368px] mx-auto flex justify-between items-center mb-2 sm:flex hidden">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-md transition-colors duration-200 font-medium shadow-sm text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to all projects
        </Link>

        {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-end">
              {project.tags.map((tag) => (
                <span key={tag} className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

      </header>
      <main className="max-w-[1368px] mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl flex flex-col items-center">
          <div className="text-center mb-8">
        

      
            <h1 className="text-4xl font-bold mt-10 sm:mt-4 mb-4">{project.title}</h1>
            
            {project.description && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                {project.description}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-md transition-colors duration-200 font-medium shadow-sm text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Visit Project
                </a>
              )}
              
              {project.iosStoreLink && (
                <a href={project.iosStoreLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-md transition-colors duration-200 font-medium shadow-sm text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                    <path d="M12 6v12"></path>
                    <path d="M6 12h12"></path>
                  </svg>
                  iOS App Store
                </a>
              )}
              
              {project.androidStoreLink && (
                <a href={project.androidStoreLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-md transition-colors duration-200 font-medium shadow-sm text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12" y2="18"></line>
                  </svg>
                  Google Play Store
                </a>
              )}
            </div>
          </div>

          {project.coverImage && (
            <div className="relative w-full h-[600px] mb-20">
              <Image
                src={project.coverImage.asset.url}
                alt={project.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}

          {project.publishedAt && (
            <div className="text-gray-500 mb-8 text-center">
              {new Date(project.publishedAt).toLocaleDateString()}
            </div>
          )}
          
          <div className="w-full">
            {project.body && <PostBody body={project.body} />}
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 justify-center">
              {project.tags.map((tag) => (
                <span key={tag} className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="sm:hidden flex justify-center mt-12 mb-4 w-full">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to all projects
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = params;

  const project = await client.fetch<Project | null>(
    groq`*[_type == "project" && slug.current == $slug][0]{
      title,
      description
    }`,
    { slug }
  );

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Lynxly`,
    description: project.description,
  };
}
