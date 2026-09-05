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

- **Folders by responsibility** (api / types / hooks / components / pages),
  not by feature - the project is too small to need feature folders.
- **Custom hooks instead of a state library.** `useGithubUser` and
  `useGithubRepos` each wrap one `fetch` call with its own loading/error
  state. No shared state or caching layer is needed for a one-page app.
- **Dark mode via Tailwind's class strategy.** `useTheme` stores the
  preference in `localStorage` (defaulting to `prefers-color-scheme`) and
  toggles a `dark` class on `<html>` - no theming library needed.
- **One `GithubApiError` type** carrying the HTTP status, so hooks just
  check `status === 404` to tell "not found" apart from other failures.

## Known limitations

Unauthenticated requests to the GitHub API are capped at 60/hour per IP.
Fine for a demo, but heavy testing can hit the generic error state.
