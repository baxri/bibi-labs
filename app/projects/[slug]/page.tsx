import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import PostBody from "@/app/components/PostBody";
import BackButton from "@/app/components/BackButton";
import TagList from "@/app/components/TagList";
import ImageContainer from "@/app/components/ImageContainer";
import ProjectHeader from "@/app/components/ProjectHeader";
import { Project, PageProps } from "@/app/types";
import { getProjectBySlugQuery, getProjectMetadataQuery } from "@/app/queries";

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const project = await client.fetch<Project | null>(getProjectBySlugQuery, {
    slug,
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen mt-8">
      <header className="flex justify-between items-center mb-2 sm:flex hidden">
        <BackButton href="/home" size="sm">
          Back to all projects
        </BackButton>

        <TagList tags={project.tags || []} justify="end" />
      </header>

        <article className="prose dark:prose-invert lg:prose-xl flex flex-col items-center">
          <ProjectHeader project={project} />

          {project.coverImage && (
            <ImageContainer
              src={project.coverImage.asset.url}
              alt={project.title}
              height={600}
              className="mb-20"
              priority
            />
          )}
          {project.body && <PostBody body={project.body} />}
          <TagList
            tags={project.tags || []}
            justify="center"
            className="mt-8"
          />
          <div className="sm:hidden flex justify-center mt-12 mb-4">
            <BackButton href="/home" size="md">
              Back to all projects
            </BackButton>
          </div>
        </article>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const project = await client.fetch<Project | null>(getProjectMetadataQuery, {
    slug,
  });

  // Get company name from environment variable
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Lynxly";

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | ${companyName}`,
    description: project.description,
  };
}
