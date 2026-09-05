import type { GithubRepo } from '../types/github'
import RepoCard from './RepoCard'

interface RepoListProps {
  repos: GithubRepo[]
}

export default function RepoList({ repos }: RepoListProps) {
  if (repos.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500 dark:text-gray-400">
        This user has no public repositories yet.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}
