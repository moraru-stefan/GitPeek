import type { GithubRepo } from '../types/github'

interface RepoCardProps {
  repo: GithubRepo
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-blue-400 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
    >
      <h3 className="font-medium text-blue-600 dark:text-blue-400">{repo.name}</h3>

      {repo.description && (
        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {repo.description}
        </p>
      )}

      <div className="mt-auto flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        {repo.language && <span>{repo.language}</span>}
        <span>★ {repo.stargazers_count}</span>
      </div>
    </a>
  )
}
