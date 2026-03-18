# Meal Calorie Tracker

A modern, responsive web application for tracking meal calories and nutritional information. Built with Next.js and TypeScript, featuring real-time calorie analysis, user authentication, and rate limiting.

## Live Demo
**Hosted URL:** [https://meal-calorie-frontend-denzil-diniz.vercel.app/login](https://meal-calorie-frontend-denzil-diniz.vercel.app/login)


**GitHub Repository:** [https://github.com/denzildiniz/meal-calorie-frontend-denzil-diniz.git](https://github.com/denzildiniz/meal-calorie-frontend-denzil-diniz.git)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Application Flow](#application-flow)
- [Setup Instructions](#setup-instructions)
- [Tech Decisions & Trade-offs](#tech-decisions--trade-offs)
- [Screenshots](#screenshots)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure JWT-based login and registration
- **Meal Analysis**: Real-time nutritional breakdown with macronutrients
- **Visual Results**: Interactive charts and progress bars for macro distribution
- **Rate Limiting**: Smart rate limiting with live countdown indicators
- **Responsive Design**: Mobile-first design with dark/light theme support
- **Persistent State**: Local storage for meal history and user preferences
- **Modern UI**: Beautiful, accessible interface with smooth animations
- **Fast Performance**: Optimized with Next.js App Router and server-side rendering

## Tech Stack

### Frontend Framework
- **Next.js 16.1.7** - React framework with App Router for optimal performance
- **React 19.2.3** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **Lucide React** - Beautiful, consistent icons
- **Next Themes** - Dark/light theme support

### State Management & Forms
- **Zustand 5.0.12** - Lightweight state management with persistence
- **React Hook Form 7.71.2** - Performant forms with validation
- **Zod 4.3.6** - TypeScript-first schema validation

### HTTP & Utilities
- **Axios 1.13.6** - HTTP client with interceptors
- **JWT Decode 4.0.0** - JWT token parsing
- **Sonner 2.0.7** - Toast notifications

### Development & Testing
- **Vitest 4.1.0** - Fast unit testing framework
- **ESLint 9** - Code linting and formatting
- **Testing Library** - Component testing utilities

## Application Flow

1. **Authentication**
   - User registers or logs in via JWT authentication
   - Token stored securely in localStorage
   - Automatic token validation and refresh

2. **Dashboard Access**
   - Authenticated users access the main dashboard
   - Navigation between different app sections

3. **Meal Analysis**
   - User enters meal details (dish name, servings)
   - Form validation using Zod schemas
   - API request to nutrition database

4. **Results Display**
   - Real-time nutritional breakdown
   - Macronutrient distribution with visual charts
   - Calorie information per serving and total

5. **Rate Limiting**
   - API requests monitored for rate limits
   - Live countdown indicator in header
   - Automatic retry after cooldown period

6. **History & Persistence**
   - Meal search history stored locally
   - Previous results accessible across sessions
   - State persistence using Zustand middleware

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/denzildiniz/meal-calorie-frontend-denzil-diniz.git
   cd meal-calorie-frontend-denzil-diniz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://xpcc.devb.zeak.io
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run
```

### Linting

```bash
npm run lint
```

## Tech Decisions & Trade-offs

### Next.js 16 with App Router
**Decision:** Chose Next.js 16's App Router over Pages Router for better performance and developer experience.
**Trade-offs:**
- Pros: Improved SEO, faster initial loads, nested layouts
- Cons: Steeper learning curve, less mature ecosystem

### Zustand for State Management
**Decision:** Selected Zustand over Redux Toolkit for simplicity and performance.
**Trade-offs:**
- Pros: Minimal boilerplate, TypeScript-friendly, built-in persistence
- Cons: Less ecosystem tools compared to Redux

### Tailwind CSS 4
**Decision:** Adopted Tailwind CSS 4 for rapid UI development with utility classes.
**Trade-offs:**
- Pros: Consistent design system, small bundle size, fast development
- Cons: Learning curve for utility-first approach, potential CSS bloat if not managed

### React Hook Form + Zod
**Decision:** Combined React Hook Form with Zod for robust form validation.
**Trade-offs:**
- Pros: Excellent performance, TypeScript integration, flexible validation
- Cons: Additional dependency for schema validation

### Vitest over Jest
**Decision:** Chose Vitest for faster test execution and better Vite integration.
**Trade-offs:**
- Pros: Native ESM support, faster cold starts, Jest-compatible API
- Cons: Smaller ecosystem, less mature tooling

## Screenshots

Loop expired

## API Integration

The application integrates with a nutrition API that provides:

- **Calorie Data**: Comprehensive nutritional information
- **Macronutrients**: Protein, carbohydrates, fats breakdown
- **Source Verification**: Database source attribution
- **Rate Limiting**: Request throttling with retry headers

### API Endpoints Used
- `POST /api/get-calories` - Meal analysis
- Authentication endpoints for user management

## Testing

### Test Coverage
- Component testing with Testing Library
- Hook testing for custom logic
- Form validation testing
- State management testing

### Test Structure
```
src/
  components/
    __tests__/          # Component tests
  hooks/
    __tests__/          # Hook tests
  stores/
    __tests__/          # Store tests
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Write tests for new features
- Maintain consistent code style with ESLint
- Update documentation for API changes
