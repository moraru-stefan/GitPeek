import SearchBar from '../components/SearchBar'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-semibold">GitPeek</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Search any GitHub username to see their profile
      </p>
      <SearchBar />
    </div>
  )
}
