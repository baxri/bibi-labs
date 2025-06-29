import React from "react";
import ProjectLinks from "./ProjectLinks";
import { ProjectHeaderProps } from "@/app/types";

export default function ProjectHeader({ 
  project, 
  className = "",
  showLinks = true
}: ProjectHeaderProps) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h1 className="text-4xl font-bold mt-10 sm:mt-4 mb-4">
        {project.title}
      </h1>
      
      {project.description && (
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {project.description}
        </p>
      )}
      
      {showLinks && (
        <ProjectLinks project={project} className="mb-8" />
      )}
    </div>
  );
} 