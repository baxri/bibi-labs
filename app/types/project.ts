// Project-related TypeScript interfaces

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  coverImage?: {
    asset: {
      url: string;
    };
  };
  description?: string;
  tags?: string[];
  link?: string;
  iosStoreLink?: string;
  androidStoreLink?: string;
  publishedAt?: string;
  body?: any;
  excerpt?: string;
  orderRank?: string;
}

export interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    coverImage?: {
      asset: {
        url: string;
      };
    };
    description?: string;
  };
  imageHeight?: number;
}

export interface ProjectLinkProps {
  type: "project" | "ios" | "android";
  href: string;
  children?: React.ReactNode;
  className?: string;
}

export interface ProjectLinksProps {
  project: {
    link?: string;
    iosStoreLink?: string;
    androidStoreLink?: string;
  };
  className?: string;
  layout?: "horizontal" | "vertical";
}

export interface ProjectHeaderProps {
  project: {
    title: string;
    description?: string;
    publishedAt?: string;
    link?: string;
    iosStoreLink?: string;
    androidStoreLink?: string;
  };
  className?: string;
  showLinks?: boolean;
} 