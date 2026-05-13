# ProspectRoute

ProspectRoute is a responsive React + Tailwind CSS assessment project with a landing page, Firebase Authentication, a protected users module, and a localStorage tasks dashboard.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Firebase Authentication
- DummyJSON Users API
- localStorage for tasks

## Folder Structure

- `src/components/ui` reusable Button, Input, and Card components.
- `src/components/layout` Navbar, Footer, and protected route layout pieces.
- `src/components/auth` reusable Firebase auth form.
- `src/context` authentication state and actions.
- `src/lib` Firebase setup.
- `src/pages` landing, auth, users, and tasks pages.
- `src/utils` shared validation helpers.

## Setup

Install dependencies:

```bash
npm install
```

Create a local `.env` file with Firebase web app values:

```bash
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Run locally:

```bash
npm run dev
```

Verify production build:

```bash
npm run build
npm run lint
```

## Implemented Features

- Responsive landing page with Navbar, Hero, Features, and Footer.
- Firebase signup, login, logout, validation, and protected routes.
- Users module using `https://dummyjson.com/users` with loading, errors, search, sorting, pagination, and user details in a popup.
- Tasks dashboard with create, read, update, delete, search, sorting, timestamps, delete confirmation, and per-user localStorage keys.

## Notes

- The provided ProspectRoute Figma file was not accessible to the authenticated Figma account, so the landing page was implemented from the written requirements with a clean CRM/SaaS visual direction.
- Arabic language support was optional and is not included.
- Firebase session persistence uses Firebase Auth defaults.
