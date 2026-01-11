# Draft2 - Booking Website

## Prerequisites
- Node.js installed on your machine.
- MongoDB installed and running locally, or a MongoDB Atlas URI.

## specific Instructions
Since the `backend` folder structure has changed, please ensure you follow the installation steps below carefully.

## Installation

1.  **Install Root Dependencies**
    Run this command in the root directory (where this README is located) to install tools like `concurrently`:
    ```bash
    npm install
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd backend
    npm install
    cd ..
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

## Configuration

Ensure you have a `.env` file in `backend/src/.env` (or `backend/.env` depending on your setup) with your MongoDB connection string and other secrets.

## Running the Application

To run both the backend and frontend concurrently in development mode:

```bash
npm run dev
```

- **Backend** typically runs on `http://localhost:5000` (or your configured port).
- **Frontend** typically runs on `http://localhost:5173` (Vite default).

## Seeding the Database

To populate the database with initial test data, run the `seed.js` script.

**From the Root Directory:**
```bash
node backend/src/seed.js
```

**Alternative (from backend folder):**
```bash
cd backend
node src/seed.js
```

## Project Structure
- `backend/`: Contains all backend logic.
    - `src/`: Source code (controllers, models, routes, etc.).
    - `node_modules/`: Backend dependencies.
- `frontend/`: React frontend application.

