import { client } from "@/sanity/lib/client";
import ProjectCard from "../components/ProjectCard";
import { Project } from "@/app/types";
import { getAllProjectsQuery } from "@/app/queries";

export default async function Home() {
  // Fetch all projects from Sanity, ordered by orderRank
  const projects = await client.fetch<Project[]>(getAllProjectsQuery);

  return (
    <>
      {projects.length > 0 ? (
        <div className="flex flex-col gap-12 w-full">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              imageHeight={660}
            />
          ))}
        </div>
      ) : (
        <p>No projects found.</p>
      )}
    </>
  );
}
