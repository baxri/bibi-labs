import React from "react";
import Button from "./Button";
import { BackButtonProps } from "@/app/types";

export default function BackButton({ 
  href, 
  children = "Back", 
  className = "",
  size = "sm"
}: BackButtonProps) {
  const backIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  );
  
  return (
    <Button 
      href={href} 
      icon={backIcon} 
      className={className}
      size={size}
    >
      {children}
    </Button>
  );
} 