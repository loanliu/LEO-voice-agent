# LEO Voice Agent

Voice agent for real estate property management using Retell.AI to support leasing activities.

## Overview

LEO is an AI-powered voice agent designed to revolutionize property management by automating leasing activities and tenant communications. This repository contains all the code, configurations, and documentation for the LEO voice agent platform.

## Repository Structure

```
LEO-voice-agent/
├── project-docs/          # Strategy & business planning
│   ├── outline/           # Business plan & product strategy
│   ├── technical-architecture/  # System design docs
│   ├── project-planning/  # Timeline & resource planning
│   ├── admin/            # Administrative documents
│   └── meeting-notes/    # Meeting recordings & notes
├── landing-page/         # Frontend application
├── retell-agent/         # Retell AI voice agent configs
├── n8n-workflows/        # Backend automation workflows
└── dev-reviews/          # Development issues & reviews
```

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/willert-ai/LEO-voice-agent.git
   cd LEO-voice-agent
   ```

2. **Set up development environment**
   ```bash
   # Install dependencies for landing page
   cd landing-page
   npm install
   
   # Start development server
   npm run dev
   ```

3. **Configure voice agent**
   - Update `retell-agent/agent-config.json` with your Retell.AI settings
   - Customize prompts in `retell-agent/prompts.json`
   - Update knowledge base in `retell-agent/knowledge-base.json`

4. **Set up N8N workflows**
   - Import workflows from `n8n-workflows/workflows/`
   - Configure integrations and webhooks
   - Test automation flows

## Technologies

- **Frontend**: React/Next.js
- **Voice Agent**: Retell.AI
- **Backend Automation**: N8N
- **Hosting**: Vercel/AWS
- **Version Control**: GitHub

## Contributing

Please read our contributing guidelines and check the development issues in `dev-reviews/` before making changes.

## Documentation

Comprehensive documentation is available in the `project-docs/` folder:
- Business plan and strategy in `outline/`
- Technical architecture in `technical-architecture/`
- Project planning in `project-planning/`

## Getting Help

- Check existing issues in `dev-reviews/`
- Review documentation in `project-docs/`
- Contact the development team

## License

[Add license information]

---

**LEO - Intelligent Property Management Voice Agent**