export interface GithubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  followers: number
  following: number
  public_repos: number
  created_at: string
  html_url: string
}

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  updated_at: string
}
