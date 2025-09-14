# Copilot Instructions for FreshVora LMS Mockup

## Project Overview
- **Stack:** React 19, Vite, Material UI (MUI), MUI X Charts, ESLint
- **Purpose:** Modern, responsive Learning Management System (LMS) dashboard mockup
- **Entry Point:** `src/main.jsx` renders `App` into `#root` in `index.html`

## Architecture & Patterns
- **App Structure:**
  - `App.jsx` manages login state and theme (MUI ThemeProvider)
  - `Layout.jsx` composes `Header`, `Sidebar`, `Footer`, and main content area
  - `Sidebar` controls navigation; content is switched via `selectedMenuItem` in `Layout`
  - Pages live in `src/pages/` (e.g., `DashboardPage.jsx`, `LoginPage.jsx`)
  - Dashboard widgets are in `src/components/widgets/` (e.g., `ProgressChart`, `OngoingClass`, etc.)
- **Styling:**
  - Uses MUI's `styled` API for all custom component styles
  - Global styles in `src/index.css` and `src/App.css`
- **Component Conventions:**
  - All major UI elements are functional components using React hooks
  - Widget and layout components are highly modular and themed
  - No Redux or context API; state is local to components
- **Navigation:**
  - No router; navigation is handled by state in `Layout.jsx` (see `selectedMenuItem`)

## Workflows
- **Development:**
  - Start dev server: `npm run dev`
  - Build for production: `npm run build`
  - Preview build: `npm run preview`
  - Lint: `npm run lint`
- **Testing:**
  - No test framework or test files present
- **Debugging:**
  - Use browser devtools; HMR is enabled via Vite

## Linting & Code Quality
- **ESLint:**
  - Configured via `eslint.config.js` (uses recommended, react-hooks, and react-refresh rules)
  - Ignores `dist/` and `node_modules/`
  - Custom rule: allows unused variables if they start with uppercase or underscore

## Integration & Dependencies
- **External:**
  - MUI for UI, MUI X Charts for charts, Emotion for styling
  - No backend/API integration; all data is static/mock
- **Assets:**
  - Images in `public/` and `src/assets/`
  - Widget images use external URLs or local assets

## Project-Specific Notes
- **Theme:**
  - Custom MUI theme with FreshVora green as primary color
- **Responsiveness:**
  - Uses MUI's `useMediaQuery` for mobile/desktop layout changes
- **No Routing:**
  - All navigation is state-driven, not URL-based
- **No TypeScript:**
  - All code is JavaScript/JSX

## Examples
- To add a new dashboard widget: create a component in `src/components/widgets/` and import it in `DashboardPage.jsx`
- To add a new sidebar menu: update `menuItems` in `Sidebar.jsx` and handle it in `Layout.jsx`

---

For more details, see `src/App.jsx`, `src/components/Layout.jsx`, and `src/pages/DashboardPage.jsx`.
