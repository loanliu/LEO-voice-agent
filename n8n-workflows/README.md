# N8N Backend Workflows

Automation workflows and backend logic for the LEO voice agent system using N8N.

## Overview

These workflows handle the backend processing for LEO's voice agent interactions, including lead processing, CRM integration, maintenance request routing, and communication automation.

## Workflow Structure

### Core Workflows

- `workflows/lead-processing.json` - Lead qualification and CRM integration
- `workflows/tenant-communication.json` - Automated tenant notifications and responses
- `workflows/maintenance-requests.json` - Maintenance request routing and tracking
- `workflows/showing-scheduler.json` - Property showing appointment management
- `workflows/emergency-escalation.json` - Emergency maintenance escalation procedures

## Setup Instructions

### 1. N8N Instance Setup

```bash
# Using Docker
docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n

# Or using npm
npm install n8n -g
n8n start
```

### 2. Import Workflows

1. Access N8N interface at `http://localhost:5678`
2. Go to Workflows → Import
3. Upload each JSON file from the `workflows/` directory
4. Configure credentials and connections
5. Test each workflow before activation

### 3. Configure Integrations

#### Required Credentials
- **Retell.AI**: API key for webhook authentication
- **CRM System**: Salesforce, HubSpot, or similar
- **Email Service**: SendGrid, Mailgun, or SMTP
- **SMS Service**: Twilio or similar
- **Calendar**: Google Calendar or Outlook

#### Webhook Endpoints
- Primary: `https://your-n8n-instance.com/webhook/leo-main`
- Lead Processing: `https://your-n8n-instance.com/webhook/lead-processing`
- Maintenance: `https://your-n8n-instance.com/webhook/maintenance-request`
- Emergency: `https://your-n8n-instance.com/webhook/emergency-escalation`

## Workflow Descriptions

### Lead Processing Workflow
Handles incoming leads from voice agent interactions:
1. Receives lead data from Retell.AI webhook
2. Validates and enriches lead information
3. Scores lead quality based on predefined criteria
4. Creates or updates contact in CRM
5. Triggers follow-up sequences
6. Notifies property managers

### Maintenance Request Workflow
Processes maintenance requests from tenants:
1. Categorizes request type and priority
2. Routes to appropriate maintenance team
3. Creates work order in property management system
4. Sends confirmation to tenant
5. Schedules follow-up and completion tracking

### Tenant Communication Workflow
Automates tenant communications:
1. Sends lease renewal reminders
2. Payment notifications and receipts
3. Property updates and announcements
4. Survey and feedback collection

## Testing and Validation

### Test Data
Use the provided test data in `test-data/` folder:
- Sample lead information
- Test maintenance requests
- Mock tenant data

### Validation Checklist
- [ ] All webhooks respond correctly
- [ ] CRM integration creates/updates records
- [ ] Email notifications send properly
- [ ] Error handling works as expected
- [ ] Data validation prevents bad inputs

## Monitoring and Maintenance

### Key Metrics
- Webhook response times
- Integration success rates
- Error frequencies
- Processing volumes

### Regular Maintenance
- Weekly workflow performance review
- Monthly credential rotation
- Quarterly workflow optimization
- Annual security audit

## Troubleshooting

### Common Issues
1. **Webhook timeouts**: Check N8N server capacity
2. **CRM sync failures**: Validate API credentials
3. **Email delivery issues**: Check service provider status
4. **Data formatting errors**: Review input validation

### Support Resources
- N8N Documentation: https://docs.n8n.io
- Community Forum: https://community.n8n.io
- Internal support: Check dev-reviews/ folder