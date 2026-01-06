# Ticket Booking Implementation Plan

## Goal Description
Enable authenticated users to book tickets for events. Currently, the "Book Ticket" button is non-functional.

## User Review Required
None.

## Proposed Changes

### Frontend
#### [MODIFY] [Events.jsx](file:///c:/Users/yashd/Desktop/sih%20work/draft2/frontend/src/pages/Events.jsx)
- Import `api` and `useNavigate`.
- Add state for `user`.
- Implement `handleBook(event)` function:
    - Check if user is logged in. If not, alert and redirect to `/login`.
    - Calculate total amount (Simple alert/confirm for MVP, or a basic modal).
    - **Step 1**: Call `POST /api/bookings` with:
        - `targetType`: 'Event'
        - `targetId`: `event._id`
        - `qty`: 1 (Fixed for MVP or prompt user)
        - `totalAmount`: `event.ticketPrice`
        - `checkIn`: `event.startDate`
    - **Step 2**: Call `POST /api/tickets` with the returned `bookingId`.
    - **Step 3**: Alert success "Ticket sent to your email!".

## Verification Plan
### Manual Verification
1.  Log in as `john@example.com`.
2.  Go to **Events** page.
3.  Click **Book Ticket** on an event (e.g., "Sikkim International Flower Festival").
4.  Verify success alert appears.
5.  (Optional) Check backend database for new Booking and Ticket (via `seed.js` or console logs if visibility existed, but alert implies API success).
