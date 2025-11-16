# Rice NetID Authentication Demo

A Next.js application demonstrating Rice University NetID authentication using CAS (Central Authentication Service) with an animated ASCII owl upon successful login.

## Live Demo

**[https://rice-netid-auth.vercel.app/](https://rice-netid-auth.vercel.app/)**

## Features

- Rice NetID authentication via CAS protocol
- Secure session management with HTTP-only cookies
- Protected routes that require authentication
- Animated ASCII owl (similar to ghostty.org's ghost animation)
- Clean, modern UI with Tailwind CSS
- TypeScript for type safety

## How It Works

### Authentication Flow

1. **Login Initiation**: User clicks "Login with Rice NetID" button
2. **CAS Redirect**: User is redirected to `https://netid.rice.edu/cas/login`
3. **Credentials**: User enters their Rice NetID credentials on the CAS server
4. **Ticket Generation**: CAS generates a one-time ticket and redirects back to the app
5. **Ticket Validation**: App validates the ticket with the CAS server
6. **Session Creation**: Upon successful validation, a secure session is created
7. **Owl Reveal**: User sees the animated ASCII owl on the dashboard!

### File Structure

```
rice-netid-auth/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── callback/route.ts          # CAS callback handler
│   │       ├── logout/route.ts            # Logout handler
│   │       ├── logout-callback/route.ts   # CAS logout callback
│   │       └── session/route.ts           # Session status endpoint
│   ├── dashboard/
│   │   └── page.tsx                       # Protected dashboard with owl
│   ├── globals.css                        # Global styles
│   ├── layout.tsx                         # Root layout
│   └── page.tsx                           # Login page
├── components/
│   └── AnimatedOwl.tsx                    # Animated ASCII owl component
├── lib/
│   ├── cas-auth.ts                        # CAS authentication utilities
│   └── session.ts                         # Session management
└── ...
```

## Setup

### Prerequisites

- Node.js 18+ installed
- Rice NetID credentials for testing

### Installation

1. Clone or navigate to the project directory:
```bash
cd rice-netid-auth
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` with your configuration:
```env
CAS_SERVER_URL=https://netid.rice.edu
APP_URL=http://localhost:3000
SESSION_SECRET=your-random-secret-key-here
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Visit `http://localhost:3000`
2. Click "Login with Rice NetID"
3. Enter your Rice NetID credentials on the CAS login page
4. Upon successful authentication, you'll be redirected to the dashboard
5. Enjoy the animated ASCII owl!
6. Click "Logout" to end your session

## CAS Protocol Details

This application uses **CAS 2.0 Protocol** for authentication:

- **Login URL**: `https://netid.rice.edu/cas/login?service=[callback-url]`
- **Validation URL**: `https://netid.rice.edu/cas/serviceValidate?ticket=[ticket]&service=[callback-url]`
- **Logout URL**: `https://netid.rice.edu/cas/logout?service=[return-url]`

The validation response is an XML document containing the authenticated user's NetID.

## Security Features

- HTTP-only cookies prevent XSS attacks
- Server-side session validation
- Secure ticket validation with CAS server
- Single-use tickets
- Session expiration (7 days)

## Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **CAS 2.0** - Authentication protocol

## Animated Owl

The owl animation cycles through 16 frames with different eye expressions:
- Blinking eyes
- Different pupil styles
- Heart eyes
- Various Unicode characters for variety

Inspired by the ghost animation on [ghostty.org](https://ghostty.org)

## Development Notes

### Testing Without Rice NetID

If you want to test the UI without actual Rice NetID authentication:
1. Comment out the session check in `app/dashboard/page.tsx`
2. Access `/dashboard` directly

### Production Deployment

For production deployment:
1. Set `NODE_ENV=production`
2. Use HTTPS for secure cookies
3. Update `APP_URL` to your production URL
4. Generate a strong `SESSION_SECRET`

## License

MIT

## Credits

- Authentication flow based on [rice-apps/rice-elections](https://github.com/rice-apps/rice-elections)
- Owl animation inspired by [ghostty.org](https://ghostty.org)
