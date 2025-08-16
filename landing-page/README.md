# LEO Landing Page

Frontend application for the LEO voice agent real estate platform.

## Overview

The landing page serves as the primary entry point for potential customers and provides information about LEO's capabilities. It includes lead capture forms, feature demonstrations, and integration with the voice agent for live demos.

## Features

- Responsive design for all devices
- Lead capture and qualification forms
- Voice agent demo integration
- Performance optimized for fast loading
- SEO optimized for property management keywords

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Structure

- `src/` - Source code
  - `components/` - Reusable React components
  - `pages/` - Page components
  - `styles/` - CSS and styling
  - `utils/` - Utility functions
- `public/` - Static assets
- `package.json` - Dependencies and scripts

## Development

1. Create feature branches from `main`
2. Follow component naming conventions
3. Add tests for new features
4. Ensure responsive design
5. Optimize for performance

## Deployment

The landing page is automatically deployed to production on merge to `main` branch via Vercel integration.

## Environment Variables

```bash
REACT_APP_RETELL_API_KEY=your_retell_api_key
REACT_APP_N8N_WEBHOOK_URL=your_n8n_webhook_url
REACT_APP_ANALYTICS_ID=your_analytics_id
```