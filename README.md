# Provider Management Frontend

Next.js frontend application for the Provider Management Tool with role-based interfaces for Provider Admins, Supplier Representatives, and Contract Coordinators.

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Radix UI Components
- Lucide React Icons

## Prerequisites

- Node.js 20+ and npm
- Backend API running at `http://localhost:8000`

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_GROUP3C_API_BASE_URL=http://localhost:8000/api
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build & Deployment

```bash
# Production build
npm run build

# Start production server
npm run start
```

## User Roles & Interfaces

### Provider Admin
- User management
- Specialist profile management
- Audit log viewer
- Organization settings

### Supplier Representative
- View service request tasks (from Flowable)
- Submit offers with specialist selection
- Manage active service orders
- Handle extensions and substitutions

### Contract Coordinator
- Review contract drafts
- Negotiate terms (accept/reject/counter-offer)
- Track contract versions
- Monitor expiring contracts


## API Integration

The frontend communicates with the Django backend via REST APIs:

```typescript
// Example: Fetch service requests
const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-requests/`, {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
});
```

## Authentication

The app uses JWT authentication:

1. User logs in → receives access & refresh tokens
2. Access token stored in memory/localStorage
3. Token included in all API requests
4. Automatic token refresh when expired

## Styling

Uses Tailwind CSS with custom configuration:

```bash
# Tailwind classes are utility-first
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow">
```

## Troubleshooting

### API Connection Issues

Ensure backend is running:
```bash
curl http://localhost:8000/api/
```

Check CORS settings in backend if requests fail.

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)