import SearchBar from '../components/SearchBar'

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-3xl font-semibold">GitPeek</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Search any GitHub username to see their profile
      </p>
      <SearchBar />
    </div>
  )
}
