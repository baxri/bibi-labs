import React from "react";
import ProjectLink from "./ProjectLink";
import { ProjectLinksProps } from "@/app/types";

export default function ProjectLinks({ 
  project, 
  className = "",
  layout = "horizontal"
}: ProjectLinksProps) {
  const hasLinks = project.link || project.iosStoreLink || project.androidStoreLink;
  
  if (!hasLinks) return null;

  const layoutClasses = {
    horizontal: "flex flex-col sm:flex-row justify-center gap-4",
    vertical: "flex flex-col gap-4"
  };

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      {project.link && (
        <ProjectLink type="project" href={project.link} />
      )}
      
      {project.iosStoreLink && (
        <ProjectLink type="ios" href={project.iosStoreLink} />
      )}
      
      {project.androidStoreLink && (
        <ProjectLink type="android" href={project.androidStoreLink} />
      )}
    </div>
  );
} 