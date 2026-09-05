import type { GithubUser } from '../types/github'

interface ProfileCardProps {
  user: GithubUser
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const createdAt = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:flex-row dark:border-gray-700 dark:bg-gray-800">
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="h-24 w-24 rounded-full self-center sm:self-start"
      />
      <div className="flex flex-1 flex-col gap-2 text-center sm:text-left">
        <div>
          <h2 className="text-xl font-semibold">{user.name ?? user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="rounded text-sm text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
          >
            @{user.login}
          </a>
        </div>

        {user.bio && <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>}
        {user.location && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.location}</p>
        )}

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 sm:justify-start dark:text-gray-400">
          <span>{user.followers} followers</span>
          <span>{user.following} following</span>
          <span>{user.public_repos} repos</span>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">Joined {createdAt}</p>
      </div>
    </div>
  )
}
