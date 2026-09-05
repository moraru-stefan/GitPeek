import { useEffect, useState } from 'react'
import { getUserRepos } from '../api/github'
import type { GithubRepo } from '../types/github'

type FetchError = 'generic' | null

interface UseGithubReposResult {
  repos: GithubRepo[]
  loading: boolean
  error: FetchError
}

export function useGithubRepos(username: string | undefined): UseGithubReposResult {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<FetchError>(null)

  useEffect(() => {
    if (!username) return

    const usernameToFetch = username
    let cancelled = false

    async function fetchRepos() {
      setLoading(true)
      setError(null)

      try {
        const data = await getUserRepos(usernameToFetch)
        if (!cancelled) setRepos(data)
      } catch {
        if (!cancelled) setError('generic')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void fetchRepos()

    return () => {
      cancelled = true
    }
  }, [username])

  return { repos, loading, error }
}
