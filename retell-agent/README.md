# Retell AI Voice Agent Configuration

This folder contains all configuration files for the LEO voice agent powered by Retell.AI.

## Overview

LEO is designed to handle property management inquiries, tenant screening, maintenance requests, and general leasing support. The voice agent uses natural language processing to understand tenant and prospect needs and provide appropriate responses.

## Files

- `agent-config.json` - Main voice agent configuration and settings
- `prompts.json` - Conversation prompts, responses, and flow logic
- `knowledge-base.json` - Domain-specific knowledge for property management

## Configuration Guide

### Agent Configuration

The `agent-config.json` file contains:
- Voice settings (speed, pitch, voice selection)
- Conversation parameters (duration, interruption handling)
- Integration endpoints (webhooks, API connections)
- Security and authentication settings

### Prompts and Flows

The `prompts.json` file defines:
- System prompts and personality
- Conversation triggers and responses
- Intent recognition patterns
- Escalation and transfer logic

### Knowledge Base

The `knowledge-base.json` file includes:
- Property management procedures
- Leasing policies and requirements
- Maintenance protocols
- Frequently asked questions
- Legal compliance information

## Testing and Validation

1. **Voice Quality Testing**
   - Test different voice settings
   - Validate pronunciation of industry terms
   - Ensure natural conversation flow

2. **Conversation Flow Testing**
   - Test all conversation branches
   - Validate intent recognition accuracy
   - Ensure proper escalation handling

3. **Knowledge Accuracy**
   - Verify all information is current
   - Test edge cases and complex scenarios
   - Ensure compliance with local regulations

## Deployment

Configuration changes are deployed through:
1. Update JSON files in this directory
2. Commit changes to repository
3. Automated deployment pipeline pushes to Retell.AI
4. Validation tests run automatically

## Best Practices

- Keep prompts conversational and natural
- Regular updates to knowledge base
- Monitor conversation analytics
- A/B test different approaches
- Maintain consistent brand voice

## Support

For Retell.AI specific issues:
- Check Retell.AI documentation
- Contact Retell.AI support
- Review conversation logs and analytics