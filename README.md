# Hamsalekha Event Production - Corporate Portfolio

This is the official corporate portfolio website for Hamsalekha Event Production. It is a highly optimized, statically generated Next.js application built to showcase event curation, signature sets, and production capabilities.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion & GSAP
- **Forms**: React Hook Form + Zod validation
- **Emails**: Resend SDK
- **Spam Protection**: Cloudflare Turnstile

## Development

First, ensure you have the required environment variables in your `.env.local` (see `.env.example`).

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

## Environment Variables

For production deployment on Netlify or Vercel, the following environment variables must be configured:

- `RESEND_API_KEY`: API key for email delivery
- `ENQUIRY_TO_EMAIL`: Destination email for customer enquiries
- `ENQUIRY_FROM_EMAIL`: Authorized sender email (e.g. enquiries@hamsalekha.com)
- `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile secret key for server verification
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Public site key for the Turnstile widget
- `NEXT_PUBLIC_SITE_URL`: The canonical URL of the deployed application

> **Note**: Do NOT commit `.env.local` or any file containing actual secret values to this repository.

## Deployment

This repository is optimized for deployment on Netlify using the default Next.js serverless adapters.
