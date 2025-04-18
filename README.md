# REST API with Express.js and Firebase for Vercel

A simple REST API using Express.js and Firebase Firestore, configured for serverless deployment on Vercel.

## Features

- CRUD operations for user data
- Firebase Firestore database
- Ready for Vercel deployment
- ES module syntax

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and add your Firebase credentials
4. Run the development server:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a single user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Deploying to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Login to Vercel:
   ```
   vercel login
   ```
4. Deploy the project:
   ```
   vercel
   ```
5. Add Environment Variables in the Vercel dashboard:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`

## Seeding Sample Data

To populate the database with sample users:

```
node api/scripts/seedUsers.js
```

## Notes for Vercel Deployment

This API is specifically designed for Vercel's serverless functions. The main entry point is `api/index.js`, which exports an Express app that Vercel can use as a serverless function.
