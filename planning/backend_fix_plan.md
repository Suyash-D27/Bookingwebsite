# Backend Validation Fix Plan

## Goal Description
The user is experiencing a "validation fail" error during account creation. The current validation logic in `authRoutes.js` uses default error messages ("Invalid value"), which provides no insight into *why* the validation failed (e.g., password too short, invalid email). The goal is to provide clear, actionable error messages.

## User Review Required
None.

## Proposed Changes

### Routes
#### [MODIFY] [authRoutes.js](file:///c:/Users/yashd/Desktop/sih%20work/draft2/scr/routes/authRoutes.js)
- Update validation chain for `/register`:
    - `name`: Add `.withMessage("Name is required")`
    - `email`: Add `.withMessage("Invalid email address")`
    - `password`: Add `.withMessage("Password must be at least 6 characters")`

### Middleware (Optional but Recommended)
#### [MODIFY] [errorMiddleware.js](file:///c:/Users/yashd/Desktop/sih%20work/draft2/scr/middlewares/errorMiddleware.js)
- Explicitly include `errors` field in the JSON response to ensure it's not lost during object spreading.

## Verification Plan
### Manual Verification
- Since I cannot run the server directly without user input, the user will need to:
    1.  Restart the backend server.
    2.  Attempt registration again with invalid data (e.g., short password) -> Should see "Password must be at least 6 characters".
    3.  Attempt registration with valid data -> Should succeed.
