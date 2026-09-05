import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
      <Link
        to="/"
        className="rounded text-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        GitPeek
      </Link>
      <ThemeToggle />
    </header>
  )
}
