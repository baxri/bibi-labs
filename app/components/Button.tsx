import React from "react";
import Link from "next/link";
import { ButtonProps } from "@/app/types";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  target,
  rel,
}: ButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 font-medium shadow-sm transition-colors duration-200";
  
  const variantClasses = {
    primary: "bg-gray-800 hover:bg-gray-900 text-white",
    secondary: "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white",
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 rounded-md",
    lg: "px-6 py-3 text-lg rounded-lg",
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  const content = (
    <>
      {icon}
      {children}
    </>
  );
  
  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {content}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
} 