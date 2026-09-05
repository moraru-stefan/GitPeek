# GitPeek

A small GitHub profile explorer. Search a GitHub username and see their
public profile and repositories.

## Features

- Search any GitHub username from the home page
- Profile card: avatar, name, username, bio, location, followers,
  following, public repo count, account creation date
- Repository grid: name, description, primary language, star count, link
  to the repo on GitHub (sorted by most recently updated)
- Explicit states for every fetch: initial, loading, user not found (404),
  generic error, and success
- Shareable URLs: a profile lives at `/user/:username` and can be reloaded
  or shared directly
- Light/dark theme, remembered across visits, defaulting to the OS
  preference on first visit

## Tech stack

- React 19 + Vite
- TypeScript
- Tailwind CSS v4
- React Router
- [GitHub REST API](https://docs.github.com/en/rest) (unauthenticated,
  no backend or database)

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

Other scripts:

```bash
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
npm run lint      # run ESLint
npm run format    # format the codebase with Prettier
```

No environment variables or API keys are required for the MVP.

## Project structure

```
src/
  api/         fetch functions for the GitHub API (typed, throw on error)
  types/       TypeScript interfaces for GitHub API responses
  hooks/       custom hooks: useGithubUser, useGithubRepos, useTheme
  components/  presentational components (SearchBar, ProfileCard, etc.)
  pages/       route-level components (HomePage, ProfilePage)
```

## Architecture decisions

**Folder structure by responsibility, not by feature.** With a project
this small, splitting by technical layer (api / types / hooks /
components / pages) keeps each concern in one obvious place and avoids
deciding on a feature-folder convention before there is more than one
feature.

**A custom hook per data need, no state management library.** `useGithubUser`
and `useGithubRepos` each wrap one `fetch` call plus its `loading`/`error`/
data state. There is no cross-component shared state, no caching layer, and
no derived state that a library like Redux or a query cache would justify.
Two small hooks are easier to read end to end than a general-purpose data
layer built for a one-page app.

**Dark mode via Tailwind's class strategy, not a theming library.**
`useTheme` reads the saved preference (or the OS preference, via
`prefers-color-scheme`, on first visit) from `localStorage` and toggles a
`dark` class on `<html>`. Tailwind's `dark:` variants (configured to match
that class instead of the media query) style both themes without any
runtime CSS-in-JS or theming framework.

**One error type from the API layer, split into user-facing states in the
hooks.** `GithubApiError` carries the HTTP status code. Consumers only need
to check `status === 404` to distinguish "user not found" from a generic
failure (network issue, rate limit, etc), instead of parsing response
bodies at the call site.

## Known limitations

The GitHub API is called without authentication, which caps requests at
60 per hour per IP address. That is enough to demo the app but will
produce the generic error state if exceeded during heavy testing. Adding
an optional personal access token to raise this limit is a possible
future improvement, not needed for this project's scope.
