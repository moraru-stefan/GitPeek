import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:username" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
