import { useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import ProfileCard from '../components/ProfileCard'
import RepoList from '../components/RepoList'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { useGithubUser } from '../hooks/useGithubUser'

export default function ProfilePage() {
  const { username } = useParams()
  const { user, loading: userLoading, error: userError } = useGithubUser(username)
  const { repos, loading: reposLoading, error: reposError } = useGithubRepos(username)

  return (
    <div className="min-h-screen bg-white px-4 py-8 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        {userLoading && <LoadingSpinner />}

        {!userLoading && userError === 'not-found' && (
          <ErrorMessage
            title="User not found"
            description={`There is no GitHub user named "${username}"`}
          />
        )}

        {!userLoading && userError === 'generic' && (
          <ErrorMessage
            title="Something went wrong"
            description="Could not reach GitHub right now. This can also happen if you hit the API rate limit."
          />
        )}

        {!userLoading && !userError && user && (
          <>
            <ProfileCard user={user} />

            <div>
              <h2 className="mb-4 text-lg font-semibold">Repositories</h2>

              {reposLoading && <LoadingSpinner />}

              {!reposLoading && reposError && (
                <ErrorMessage
                  title="Could not load repositories"
                  description="Something went wrong while fetching this user's repositories."
                />
              )}

              {!reposLoading && !reposError && <RepoList repos={repos} />}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
