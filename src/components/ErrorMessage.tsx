interface ErrorMessageProps {
  title: string
  description: string
}

// Shared by both the "user not found" (404) and generic error states,
// they only differ in copy.
export default function ErrorMessage({ title, description }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-12 text-center">
      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</p>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}
