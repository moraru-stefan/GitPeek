import type { GithubRepo, GithubUser } from '../types/github'

const GITHUB_API_BASE = 'https://api.github.com'

// Carries the HTTP status so callers can distinguish 404 (user not found)
// from other failures (network error, rate limit, etc).
export class GithubApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'GithubApiError'
    this.status = status
  }
}

export async function getUser(username: string): Promise<GithubUser> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`)

  if (!response.ok) {
    throw new GithubApiError(`Failed to fetch user "${username}"`, response.status)
  }

  return response.json() as Promise<GithubUser>
}

export async function getUserRepos(username: string): Promise<GithubRepo[]> {
  // "sort=updated" is a native query param on this endpoint, so no need to
  // sort client-side. Sorting by stars instead would require that.
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`,
  )

  if (!response.ok) {
    throw new GithubApiError(`Failed to fetch repos for "${username}"`, response.status)
  }

  return response.json() as Promise<GithubRepo[]>
}
