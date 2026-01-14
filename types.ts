export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string; // Optional cover image
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  impact: string; // e.g., "Reduced carbon emissions by 40%"
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export enum ViewState {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  BLOG = 'BLOG'
}