# Top Automaat Les - Driving School Website

## Overview

Top Automaat Les is a modern driving school website built with React, TypeScript, and Express.js. The application provides a multilingual platform for a Dutch driving school offering automatic transmission lessons. It features a public-facing website with service information, photo gallery, and contact functionality, along with an admin panel for content management. The application supports three languages (Dutch, English, and Arabic) with full RTL support for Arabic text.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Internationalization**: Custom translation system supporting Dutch, English, and Arabic with RTL layout support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Replit's OpenID Connect integration with Passport.js for secure admin access
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple
- **File Uploads**: Multer for handling image uploads with Sharp for image processing and thumbnail generation

### Database Design
- **Database**: PostgreSQL with the following schema:
  - `users`: Admin user accounts with Replit OAuth integration
  - `sessions`: Session storage for authentication persistence
  - `photos`: Gallery images with metadata and thumbnail URLs
  - `contact_submissions`: Contact form submissions with multilingual support
- **Migration Strategy**: Drizzle Kit for database schema migrations and type generation

### API Structure
- **RESTful Endpoints**:
  - `/api/auth/*`: Authentication routes (login, logout, user info)
  - `/api/photos`: CRUD operations for gallery management
  - `/api/contact`: Contact form submission handling
  - `/api/uploads/*`: File upload and serving endpoints
- **File Handling**: Images stored locally with automatic thumbnail generation
- **Response Format**: JSON API responses with consistent error handling

### Security Implementation
- **Authentication**: Admin-only access using Replit's OAuth2 with role-based permissions
- **Session Security**: Secure HTTP-only cookies with CSRF protection
- **File Upload Security**: File type validation, size limits (5MB), and secure file serving
- **Input Validation**: Zod schema validation on both client and server sides

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **TypeScript**: Full TypeScript support with strict type checking
- **Build Tools**: Vite for development and production builds, esbuild for server bundling

### Database and ORM
- **Neon Database**: Serverless PostgreSQL using @neondatabase/serverless
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Connection Pooling**: Built-in connection pooling for database efficiency

### Authentication Services
- **Replit Auth**: OpenID Connect integration for admin authentication
- **Passport.js**: Authentication middleware with OpenID strategy
- **Session Storage**: PostgreSQL-backed sessions with connect-pg-simple

### Email Services
- **SendGrid**: Email delivery service for contact form notifications
- **Configuration**: API key-based authentication with configurable sender addresses

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Radix UI**: Headless UI components via shadcn/ui for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe component variants

### File Processing
- **Multer**: Multipart form data handling for file uploads
- **Sharp**: High-performance image processing for thumbnails and optimization
- **File System**: Local storage with organized directory structure

### Development Tools
- **Replit Integration**: Development banner, error overlay, and cartographer plugins
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility
- **Path Resolution**: Custom import aliases for cleaner code organization