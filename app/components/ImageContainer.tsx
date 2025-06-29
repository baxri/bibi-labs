import Image from "next/image";
import React from "react";
import { ImageContainerProps } from "@/app/types";

export default function ImageContainer({
  src,
  alt,
  height = 600,
  className = "",
  priority = false,
  fill = true,
  width,
}: ImageContainerProps) {
  const containerClasses = `relative w-full rounded-lg overflow-hidden ${className}`;
  
  if (fill) {
    return (
      <div className={containerClasses} style={{ height: `${height}px` }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }
  
  return (
    <div className={containerClasses}>
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height}
        className="object-cover w-full h-full"
        priority={priority}
      />
    </div>
  );
} 