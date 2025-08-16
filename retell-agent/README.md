# Retell AI Voice Agent Configuration

This folder contains all configuration files, templates, and documentation for the LEO voice agent powered by Retell.AI.

## Overview

LEO is designed to handle property management inquiries, tenant screening, maintenance requests, and general leasing support. The voice agent uses natural language processing to understand tenant and prospect needs and provide appropriate responses while guiding them toward booking tours and capturing lead information.

## Files Structure

### Core Configuration Files

#### `LeoVoiceAgent.json`
- **Purpose**: Main Retell.AI agent configuration file
- **Contains**: Agent settings, voice parameters, and system configuration
- **Usage**: Import directly into Retell.AI dashboard
- **Format**: JSON configuration for agent deployment

#### `PROMPT - Leo Voice Agent.md`
- **Purpose**: Complete conversation framework and agent behavior instructions
- **Contains**: 
  - Role definition and personality traits
  - Detailed conversation flow (10 steps from greeting to wrap-up)
  - Communication style guidelines
  - Function usage instructions
  - Sample dialogues and escalation procedures
- **Usage**: Primary prompt engineering document for voice agent behavior
- **Format**: Structured markdown with conversation flow logic

### Knowledge Base and Data

#### `Lakeside Apartments - MOCK DATA SET.md`
- **Purpose**: Complete property information dataset for testing and development
- **Contains**: 
  - Property details, amenities, and location information
  - Voice-safe responses and escalation scripts
  - FAQ sections and canonical questions
  - Test probes for validation
- **Usage**: Example knowledge base for Lakeside Apartments property
- **Format**: Voice-optimized markdown with chunking guidance

#### `Knowledge Base Template.md`
- **Purpose**: Standardized template for creating property knowledge bases
- **Contains**: 
  - Structured sections for property information
  - Placeholder fields for easy customization
  - Best practices for voice-safe content
  - Escalation guidelines and test scenarios
- **Usage**: Template for creating new property knowledge bases
- **Format**: Reusable markdown template

### Documentation and Guidelines

#### `Best Practices Retell knowledge base.md`
- **Purpose**: Guidelines for optimizing content for Retell.AI
- **Contains**: 
  - File format recommendations
  - Content structuring best practices
  - Chunking and embedding guidelines
  - Testing and update procedures
- **Usage**: Reference guide for knowledge base preparation
- **Format**: Best practices summary with quick reference table

#### `LVA - Lakeside.rtf`
- **Purpose**: Rich text format version of agent configuration
- **Contains**: Formatted version of agent setup and configuration
- **Usage**: Alternative format for documentation and sharing
- **Format**: Rich Text Format (RTF)

### Configuration Files

#### `.gitignore`
- **Purpose**: Defines files and patterns to exclude from version control
- **Contains**: 
  - Sensitive configuration files (API keys, secrets)
  - Temporary and backup files
  - Environment-specific configurations
- **Usage**: Maintains security and clean repository

## Configuration Guide

### Agent Setup Process

1. **Import Base Configuration**
   - Upload `LeoVoiceAgent.json` to Retell.AI dashboard
   - Configure voice settings and conversation parameters
   - Set up webhook endpoints for N8N integration

2. **Configure Conversation Logic**
   - Review and customize `PROMPT - Leo Voice Agent.md`
   - Adapt conversation flows for specific property needs
   - Set up escalation procedures and function calls

3. **Prepare Knowledge Base**
   - Use `Knowledge Base Template.md` to create property-specific content
   - Follow guidelines in `Best Practices Retell knowledge base.md`
   - Structure content for optimal voice retrieval
   - Reference `Lakeside Apartments - MOCK DATA SET.md` as example

4. **Testing and Validation**
   - Test conversation flows with sample scenarios
   - Validate knowledge base retrieval accuracy
   - Ensure proper escalation handling
   - Monitor voice quality and response timing

### Voice Agent Capabilities

#### Core Functions
- **Lead Qualification**: Capture contact information and rental preferences
- **Tour Scheduling**: Check availability and book property tours
- **Information Provision**: Answer questions about amenities, location, and policies
- **Escalation Management**: Route complex queries to human agents
- **Follow-up Automation**: Trigger email confirmations and nurture sequences

#### Conversation Flow
The agent follows a structured 10-step process:

1. Greeting & Filtering
2. Rapport & Intent Discovery
3. Lead Qualification
4. Preference Discovery
5. Contact Info Capture
6. Scheduling Eligibility Check
7. Calendar Coordination
8. Appointment Booking
9. Wrap-Up & Follow-Up
10. Escalation or Exit

### Integration Points

#### Webhook Integration
- **N8N Workflows**: Real-time data processing and CRM integration
- **Lead Processing**: Automatic lead scoring and routing
- **Email Automation**: Confirmation and follow-up sequences
- **Calendar Systems**: Tour scheduling and availability checking

#### Function Calls
- `check_availability`: Query calendar for tour slots
- `schedule_appointment`: Book confirmed tours
- `send_email_summary`: Deliver property information
- `log_lead_data`: Capture prospect information
- `end_call`: Graceful conversation completion

### Best Practices

#### Content Optimization
- Use voice-safe language and natural phrasing
- Structure information in 500-token chunks with 100-token overlap
- Include canonical questions and test probes
- Separate voice-safe content from internal-only information

#### Conversation Design
- Keep responses concise (1-2 sentences maximum)
- Ask one clear question at a time
- Wait for complete caller responses before proceeding
- Maintain consistent, friendly personality
- Always confirm contact information spelling

#### Security and Compliance
- Never quote exact pricing or lease terms
- Escalate complex policy questions to human agents
- Handle PII data according to privacy regulations
- Maintain conversation logs for quality assurance

## Deployment Process

### Development Environment
1. Test agent configuration with sample data
2. Validate conversation flows and escalation procedures
3. Ensure proper integration with N8N webhooks
4. Verify knowledge base retrieval accuracy

### Staging Environment
1. Deploy to staging Retell.AI environment
2. Conduct end-to-end testing with realistic scenarios
3. Validate email and calendar integrations
4. Performance testing under load

### Production Deployment
1. Import final configuration to production environment
2. Set up monitoring and alerting
3. Configure backup and disaster recovery
4. Train support team on agent capabilities

## Monitoring and Maintenance

### Key Metrics
- Conversation completion rate
- Intent recognition accuracy
- Tour booking conversion rate
- Average conversation duration
- Escalation rate to human agents

### Regular Maintenance
- Weekly performance review
- Monthly knowledge base updates
- Quarterly conversation flow optimization
- Annual security and compliance audit

## Support Resources

### Documentation
- [Retell.AI Documentation](https://docs.retell.ai)
- [Voice Agent Best Practices](./Best%20Practices%20Retell%20knowledge%20base.md)
- [Knowledge Base Template](./Knowledge%20Base%20Template.md)

### Configuration Files
- [Agent Configuration](./LeoVoiceAgent.json)
- [Conversation Prompts](./PROMPT%20-%20Leo%20Voice%20Agent.md)
- [Sample Knowledge Base](./Lakeside%20Apartments%20-%20MOCK%20DATA%20SET.md)

### Development Support
- Check `dev-reviews/retell-agent/issues/` for current development tasks
- Review integration documentation in `project-docs/technical-architecture/`
- Follow deployment procedures in `project-docs/project-planning/`

---

**The LEO voice agent is designed to provide intelligent, natural conversation experiences while efficiently capturing leads and scheduling tours for property management companies.**