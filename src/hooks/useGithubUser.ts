import { useEffect, useState } from 'react'
import { getUser, GithubApiError } from '../api/github'
import type { GithubUser } from '../types/github'

type FetchError = 'not-found' | 'generic' | null

interface UseGithubUserResult {
  user: GithubUser | null
  loading: boolean
  error: FetchError
}

export function useGithubUser(username: string | undefined): UseGithubUserResult {
  const [user, setUser] = useState<GithubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<FetchError>(null)

  useEffect(() => {
    if (!username) return

    // Copied so TypeScript keeps treating it as a plain string inside the
    // closure below (it can't narrow a captured parameter across calls).
    const usernameToFetch = username

    // Avoids setting state on an unmounted/stale request if username
    // changes again before the previous fetch resolves.
    let cancelled = false

    async function fetchUser() {
      setLoading(true)
      setError(null)
      setUser(null)

      try {
        const data = await getUser(usernameToFetch)
        if (!cancelled) setUser(data)
      } catch (err) {
        if (cancelled) return
        if (err instanceof GithubApiError && err.status === 404) {
          setError('not-found')
        } else {
          setError('generic')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void fetchUser()

    return () => {
      cancelled = true
    }
  }, [username])

  return { user, loading, error }
}
