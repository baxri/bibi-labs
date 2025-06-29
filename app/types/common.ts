// Common UI component TypeScript interfaces

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "light";
  className?: string;
}

export interface TagListProps {
  tags: string[];
  variant?: "default" | "light";
  className?: string;
  justify?: "start" | "center" | "end";
}

export interface ImageContainerProps {
  src: string;
  alt: string;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
}

export interface BackButtonProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export interface PageProps {
  params: { slug: string };
} 