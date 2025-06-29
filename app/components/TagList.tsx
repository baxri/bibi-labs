import React from "react";
import Tag from "./Tag";
import { TagListProps } from "@/app/types";

export default function TagList({ 
  tags, 
  variant = "default", 
  className = "",
  justify = "start"
}: TagListProps) {
  if (!tags || tags.length === 0) return null;
  
  const justifyClasses = {
    start: "justify-start",
    center: "justify-center", 
    end: "justify-end",
  };
  
  const classes = `flex flex-wrap gap-2 ${justifyClasses[justify]} ${className}`;
  
  return (
    <div className={classes}>
      {tags.map((tag) => (
        <Tag key={tag} variant={variant}>
          {tag}
        </Tag>
      ))}
    </div>
  );
} 