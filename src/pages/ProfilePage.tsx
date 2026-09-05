import { useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import ProfileCard from '../components/ProfileCard'
import { useGithubUser } from '../hooks/useGithubUser'

export default function ProfilePage() {
  const { username } = useParams()
  const { user, loading, error } = useGithubUser(username)

  return (
    <div className="min-h-screen bg-white px-4 py-8 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-2xl">
        {loading && <LoadingSpinner />}

        {!loading && error === 'not-found' && (
          <ErrorMessage
            title="User not found"
            description={`There is no GitHub user named "${username}"`}
          />
        )}

        {!loading && error === 'generic' && (
          <ErrorMessage
            title="Something went wrong"
            description="Could not reach GitHub right now. This can also happen if you hit the API rate limit."
          />
        )}

        {!loading && !error && user && <ProfileCard user={user} />}
      </div>
    </div>
  )
}
