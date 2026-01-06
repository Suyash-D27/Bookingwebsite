# Core Pages Implementation Plan

## Goal Description
Expand the frontend to include pages for all core features provided by the backend: Hotels, Monasteries, Events, and User Profile. This includes setting up routing and a navigation bar.

## User Review Required
None.

## Proposed Changes

### Components
#### [NEW] [Navbar.jsx](file:///c:/Users/yashd/Desktop/sih%20work/draft2/frontend/src/components/Navbar.jsx)
- A responsive navigation bar to link to all pages.
- Conditionally render Login/Register vs Profile/Logout based on auth state (token presence).

### Pages
#### [NEW] [Hotels.jsx](file:///c:/Users/yashd/Desktop/sih%20work/draft2/frontend/src/pages/Hotels.jsx)
- List hotels fetched from `/api/hotels`.
- Cards with Image, Name, Location, Price.

#### [NEW] [Monasteries.jsx](file:///c:/Users/yashd/Desktop/sih%20work/draft2/frontend/src/pages/Monasteries.jsx)
- List monasteries fetched from `/api/monasteries`.

#### [NEW] [Events.jsx](file:///c:/Users/yashd/Desktop/sih%20work/draft2/frontend/src/pages/Events.jsx)
- List events.

#### [NEW] [Profile.jsx](file:///c:/Users/yashd/Desktop/sih%20work/draft2/frontend/src/pages/Profile.jsx)
- Show user details from `/api/auth/me` (or similar).
- Show booking history.

### Routing
#### [MODIFY] [App.jsx](file:///c:/Users/yashd/Desktop/sih%20work/draft2/frontend/src/App.jsx)
- Add routes: `/hotels`, `/monasteries`, `/events`, `/profile`.
- Include `Navbar` in the layout.

## Verification Plan
### Manual Verification
- Navigate to each page via Navbar.
- Verify data loads (if backend has data).
