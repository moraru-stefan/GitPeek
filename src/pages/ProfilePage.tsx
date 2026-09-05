import { useParams } from 'react-router-dom'

// Placeholder: profile card, repo list, and loading/error states are built
// in the next chunk. For now this just confirms routing works end to end.
export default function ProfilePage() {
  const { username } = useParams()

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <p>Profile page for {username}</p>
    </div>
  )
}
