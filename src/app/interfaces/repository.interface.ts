export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  updated_at: string;
}

export interface Favorite {
  id?: string;           // ID generado por MockAPI
  repoId: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  ownerLogin: string;
  ownerAvatar: string;
  tag: string;           // etiqueta personalizada del usuario
  priority: string;      // 'alta' | 'media' | 'baja'
}
