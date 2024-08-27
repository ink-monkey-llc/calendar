# React Google Calendar

Displays your google calendar events in a custom web app.

## Environment Variables

The project includes a .env.example file showing the environment variables needed to fetch the user's profile and calendar data using Auth.js and Google's calendar api.

## Google OAuth setup

A Google OAuth client id is required, and can be set up in Google Cloud dashboard under "APIs & Services". Go to "+ Create Credentials", choose "OAuth client id" and follow the prompts. In the section titled "Authorized redirect URIs", enter "http://localhost:3000/api/auth/callback/google" while in development, and in production, replace "localhost:3000" with your app's deployed url.

## Installation

```bash
npm install
```

## Authors

- [@FlapShatner](https://www.github.com/FlapShatner)
