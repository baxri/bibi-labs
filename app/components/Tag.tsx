import React from "react";
import { TagProps } from "@/app/types";

export default function Tag({ 
  children, 
  variant = "default", 
  className = "" 
}: TagProps) {
  const baseClasses = "px-3 py-1 rounded-full text-sm";
  
  const variantClasses = {
    default: "bg-gray-800 text-white",
    light: "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white",
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
} 