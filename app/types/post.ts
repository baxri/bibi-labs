// Post-related TypeScript interfaces

export interface Post {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  mainImage?: {
    asset: {
      url: string;
    };
  };
  publishedAt: string;
  body?: any; 
  excerpt?: string;
}

export interface PostBodyProps {
  body: any;
} 