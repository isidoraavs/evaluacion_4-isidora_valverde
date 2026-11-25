export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  category: string;
  period: string;
  tags: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}

export interface GitHubReposResponse {
  status: number;
  data: GitHubRepo[];
}

export type ApiState =
  | { kind: 'loading' }
  | { kind: 'success'; status: number; data: GitHubRepo[] }
  | { kind: 'error'; status: number | null; message: string; retryAt?: number | null };

export type Theme = 'light' | 'dark';

export interface ContactFields {
  name: string;
  email: string;
  message: string;
}
