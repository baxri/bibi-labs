import React from "react";
import Button from "./Button";
import { ProjectLinkProps } from "@/app/types";

export default function ProjectLink({ 
  type, 
  href, 
  children,
  className = ""
}: ProjectLinkProps) {
  const linkConfig = {
    project: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      ),
      defaultText: "Visit Project"
    },
    ios: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
          <path d="M12 6v12"></path>
          <path d="M6 12h12"></path>
        </svg>
      ),
      defaultText: "iOS App Store"
    },
    android: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12" y2="18"></line>
        </svg>
      ),
      defaultText: "Google Play Store"
    }
  };

  const config = linkConfig[type];

  return (
    <Button 
      href={href} 
      icon={config.icon}
      target="_blank"
      rel="noopener noreferrer"
      size="sm"
      className={className}
    >
      {children || config.defaultText}
    </Button>
  );
} 