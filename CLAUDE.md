# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Vercel Commands
- `npm run dev:vercel` - Start development with Vercel dev environment
- `npm run preview` - Deploy preview to Vercel
- `npm run deploy` - Deploy to production on Vercel
- `npm run env:pull` - Pull environment variables from Vercel

## Architecture Overview

This is a Next.js 15 application using the App Router with TypeScript and Tailwind CSS. The project implements a **Redis-based anonymous session management system** that provides session tracking without user authentication.

### Key Architectural Components

#### Session Management System
- **Anonymous Sessions**: Creates temporary sessions for users without requiring authentication
- **Redis Storage**: Uses Upstash Redis for session persistence with 24-hour TTL
- **Middleware Protection**: `/middleware.ts` validates sessions for API routes (except `/api/session`)
- **Session Provider**: React context (`SessionProvider.tsx`) manages client-side session state

#### Core Data Flow
1. Users visit the app → middleware checks for session cookie
2. If no session → redirected to create one via `/api/session`
3. Session stored in Redis with auto-expiry → cookie set in browser
4. Protected API routes receive session info via request headers

#### Directory Structure
```
app/
├── api/
│   ├── session/route.ts    # Session creation/validation endpoint
│   └── count/route.ts      # Protected counter API
├── layout.tsx              # Root layout with SessionProvider
└── page.tsx                # Home page with server-side data fetching

lib/
├── session.ts              # Session utilities and Redis operations
└── count.ts                # Counter business logic

components/
├── SessionProvider.tsx     # Session context provider
├── CountDisplay.tsx        # Server component for displaying count and session
├── IncrementButton.tsx     # Client component for count increment
└── GeoInfo.tsx            # Geographic location display component
```

### Technology Stack
- **Next.js 15** with App Router and React Server Components
- **Upstash Redis** for session storage and counter persistence
- **NextAuth.js** configured (but not actively used - anonymous sessions instead)
- **Tailwind CSS 4** for styling
- **TypeScript** with strict mode

### Environment Variables Required
```env
REDIS_URL=your_redis_connection_string
REDIS_PASSWORD=your_redis_password
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Key Implementation Details

#### Session Flow
- Sessions are created in `lib/session.ts` with format: `anon_{timestamp}_{random}`
- Middleware in `middleware.ts` validates sessions and adds headers for API routes
- Client-side session state managed through React Context

#### Error Handling
- Graceful fallbacks for Redis connection issues
- Comprehensive error messages with error codes (`NO_SESSION`, `INVALID_SESSION`)
- Client-side error states with user-friendly messages

### Development Notes
- The project structure follows Next.js 15 App Router conventions
- Uses server components for initial data fetching and client components for interactivity
- Middleware handles session validation automatically for protected routes
- Redis connection is established using environment variables via `Redis.fromEnv()`