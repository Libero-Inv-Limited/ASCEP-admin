# ASCEP Admin - Anambra State Citizen Engagement Platform

A modern React-based admin dashboard for managing the Anambra State Citizen Engagement Platform (ASCEP), featuring democracy modules, dialogue management, surveys, and comprehensive user administration.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Key Concepts](#key-concepts)
- [Contributing](#contributing)

## Features

### Democracy Module
- **Debates** - Create and manage public debates with commenting and voting
- **Proposals** - Submit and track civic proposals with community feedback
- **Initiatives** - Coordinate citizen-driven initiatives with meeting management
- **Budgeting** - Participate in participatory budgeting processes
- **SDG Tracking** - Monitor Sustainable Development Goals alignment

### Dialogue & Response
- **FOI Requests** - Freedom of Information request management
- **Surveys** - Create and manage citizen surveys with analytics
- **Reports** - Generate and download comprehensive reports
- **Response Analytics** - Track engagement and response metrics

### User Management
- **Role-Based Access Control** - Granular permissions system
- **User Administration** - Manage users, roles, and permissions
- **Authority Management** - Configure organizational hierarchies

### Settings
- **Profile Management** - User profile and password management
- **API Integrations** - Manage external API connections
- **System Configuration** - Application-wide settings

## Tech Stack

### Core
- **React 18.2.0** - UI library with concurrent features
- **TypeScript 5.2.2** - Type-safe JavaScript
- **Vite 5.0.0** - Next-generation build tool

### State Management
- **React Query 3.39.3** - Server state management
- **Context API** - Global UI state

### UI & Styling
- **Tailwind CSS 3.3.5** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - High-quality component library

### Forms & Validation
- **React Hook Form 7.48.2** - Performant form library
- **Zod 3.22.4** - TypeScript-first schema validation

### Data Visualization
- **Recharts 2.10.3** - Chart library for React
- **React PDF 7.7.0** - PDF viewing and generation

### Routing
- **React Router DOM 6.20.0** - Declarative routing

### HTTP Client
- **Axios 1.6.2** - Promise-based HTTP client with interceptors

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/ASCEP-admin.git
   cd ASCEP-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure the required variables (see [Environment Variables](#environment-variables))

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

## Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```env
# API Configuration
VITE_API_BASE_URL=https://lens1.anambrastate.gov.ng
VITE_FRONTEND_URL=http://localhost:5173

# App Configuration
VITE_APP_NAME=ASCEP Admin
VITE_APP_ENV=development

# Optional: Logging
VITE_ENABLE_LOGGING=true

# Optional: Monitoring (if using Sentry)
# VITE_SENTRY_DSN=your-sentry-dsn
```

### Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | Yes |
| `VITE_FRONTEND_URL` | Frontend application URL | Yes |
| `VITE_APP_NAME` | Application name | No |
| `VITE_APP_ENV` | Environment (development/staging/production) | No |
| `VITE_ENABLE_LOGGING` | Enable/disable logger (default: true in dev) | No |

**Note:** All Vite environment variables must be prefixed with `VITE_` to be exposed to the client.

## Project Structure

```
ASCEP-admin/
├── public/              # Static assets
├── src/
│   ├── api/            # API layer with React Query hooks
│   │   ├── democracy/  # Democracy module APIs
│   │   ├── endpoints/  # API endpoint definitions
│   │   └── *.ts        # Domain-specific API hooks
│   ├── assets/         # Images, fonts, icons
│   ├── components/     # React components
│   │   ├── Auth/       # Authentication components
│   │   ├── Democracy/  # Democracy module components
│   │   ├── Dialogue/   # Dialogue components
│   │   ├── Response/   # Survey/report components
│   │   ├── Users/      # User management components
│   │   ├── Settings/   # Settings components
│   │   ├── custom/     # Custom reusable components
│   │   ├── layout-components/ # Layout utilities
│   │   └── ui/         # Shadcn UI components (28 components)
│   ├── contexts/       # React Context providers
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Page layouts (Main, Auth, etc.)
│   ├── lib/            # Library configurations
│   │   ├── axios.ts    # Axios instance with interceptors
│   │   └── react-query.ts # React Query configuration
│   ├── pages/          # Page components (route targets)
│   ├── providers/      # High-level providers (Auth, App)
│   ├── schemas/        # Zod validation schemas
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
│       ├── constants.ts # Application constants
│       ├── logger.ts    # Logging utility
│       └── storage.ts   # localStorage utilities
├── .env.example        # Environment variables template
├── .eslintrc.cjs       # ESLint configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── REFACTORING_GUIDE.md # Detailed refactoring documentation
└── README.md           # This file
```

### Key Directories

- **`/src/api`** - Contains all API integration logic using React Query hooks
- **`/src/components`** - Feature-based component organization
- **`/src/lib`** - Third-party library configurations (axios, react-query)
- **`/src/utils`** - Pure utility functions and constants
- **`/src/types`** - TypeScript type definitions organized by domain

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

### Code Style

This project uses:
- **ESLint** - Code linting
- **TypeScript** - Type checking in strict mode
- **Prettier** - Code formatting (recommended)

### Development Guidelines

1. **Components**
   - Use functional components with hooks
   - Place component-specific logic in custom hooks
   - Use TypeScript for all components
   - Follow the feature-based directory structure

2. **State Management**
   - Use React Query for server state
   - Use Context API for global UI state
   - Use local state (useState) for component-specific state
   - Use React Hook Form for form state

3. **API Integration**
   - Create custom hooks in `/src/api`
   - Use the centralized `apiClient` from `/src/lib/axios.ts`
   - Use React Query for caching and data synchronization
   - Use predefined query keys from `/src/lib/react-query.ts`

4. **Styling**
   - Use Tailwind utility classes
   - Use custom components from `/src/components/ui`
   - Follow the design system in `tailwind.config.js`
   - Use CVA for component variants

5. **Error Handling**
   - Components are wrapped in ErrorBoundary
   - API errors handled by axios interceptors
   - Form validation with Zod schemas
   - Use logger utility instead of console.log

### Example: Creating a New Feature

```typescript
// 1. Define types (src/types/my-feature.d.ts)
interface MyFeature {
  id: string;
  name: string;
}

// 2. Create API hook (src/api/my-feature.ts)
import { useQuery } from "react-query";
import { apiClient } from "@/lib/axios";
import { queryKeys } from "@/lib/react-query";

export const useMyFeature = (id: string) => {
  return useQuery(
    queryKeys.myFeature.detail(id),
    () => apiClient.get(`/my-feature/${id}`).then(res => res.data)
  );
};

// 3. Create component (src/components/MyFeature/MyFeatureCard.tsx)
import { useMyFeature } from "@/api/my-feature";

export const MyFeatureCard = ({ id }: { id: string }) => {
  const { data, isLoading } = useMyFeature(id);

  if (isLoading) return <div>Loading...</div>;

  return <div>{data.name}</div>;
};
```

## Building for Production

### Build Command

```bash
npm run build
```

This creates an optimized production build in the `/dist` directory.

### Build Optimization

The build is optimized with:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

### Deployment

1. **Environment Setup**
   - Set production environment variables
   - Configure `VITE_API_BASE_URL` for production API

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy**
   - Upload `/dist` folder to your hosting service
   - Configure server to serve `index.html` for all routes (SPA)

### Deployment Platforms

Compatible with:
- **Vercel** - Zero-config deployment
- **Netlify** - Automatic builds from Git
- **AWS S3 + CloudFront** - Scalable hosting
- **Traditional hosting** - Any static file server

Example `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Key Concepts

### Authentication

Authentication is handled via JWT tokens stored in localStorage:

```typescript
import { useAuthContext } from "@/providers/AuthProvider";

const { isLoggedIn, login, logout } = useAuthContext();
```

### Permissions

Role-based permissions control feature access:

```typescript
// Route protection
<ProtectedRoute requiredPermissions={["access dashboard module"]}>
  <DashboardPage />
</ProtectedRoute>

// Component-level checks
const { user } = useAppContext();
const hasPermission = user?.permissions.includes("manage users");
```

### API Integration

All API calls use the centralized axios instance:

```typescript
import { apiClient } from "@/lib/axios";

// Automatic token injection and error handling
const response = await apiClient.post("/endpoint", data);
```

### Form Handling

Forms use React Hook Form + Zod:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

### Logging

Use the logger utility instead of console.log:

```typescript
import logger from "@/utils/logger";

logger.info("User action", { userId: 123 }, "UserModule");
logger.error("API failed", error, "API");
```

Logs only appear in development mode.

## Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add my feature'`
6. Push to the branch: `git push origin feature/my-feature`
7. Open a Pull Request

### Commit Guidelines

Use conventional commits:

```
feat: Add new survey component
fix: Resolve login redirect issue
docs: Update README with deployment steps
refactor: Simplify user query hooks
style: Format code with prettier
```

### Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass (if applicable)
3. Update REFACTORING_GUIDE.md if architecture changes
4. Request review from maintainers

## Troubleshooting

### Common Issues

**Build fails with "Cannot find module"**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Environment variables not working**
- Ensure variables are prefixed with `VITE_`
- Restart dev server after changing `.env`
- Check that `.env` file exists in project root

**API calls fail with CORS errors**
- Verify `VITE_API_BASE_URL` is correct
- Check backend CORS configuration
- Ensure you're logged in (token present)

**TypeScript errors**
```bash
# Run type checking
npx tsc --noEmit
```

## Additional Resources

- [Refactoring Guide](./REFACTORING_GUIDE.md) - Detailed architecture documentation
- [Vite Documentation](https://vitejs.dev/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

## License

[Specify your license here]

## Support

For issues and questions:
- Create an issue on GitHub
- Contact the development team
- Check the [Refactoring Guide](./REFACTORING_GUIDE.md) for architecture details

---

**Built with ❤️ for Anambra State**
