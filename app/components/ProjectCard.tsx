import React from "react";
import Link from "next/link";
import ImageContainer from "./ImageContainer";
import { ProjectCardProps } from "@/app/types";

export default function ProjectCard({ project, imageHeight = 770 }: ProjectCardProps) {
  return (
    <Link 
      href={`/projects/${project.slug.current}`} 
      className="dark:border-gray-800 overflow-hidden block"
    >
      {project.coverImage && (
        <ImageContainer
          src={project.coverImage.asset.url}
          alt={project.title}
          height={imageHeight}
          className="mb-4"
        />
      )}
      <div className="flex flex-col p-2">
        <p className="text-white font-bold mt-2 text-[10pt]">
          {project.title}
        </p>
        {project.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 max-w-[200px] text-[10pt]">
            {project.description}
          </p>
        )}
      </div>
    </Link>
  );
} 