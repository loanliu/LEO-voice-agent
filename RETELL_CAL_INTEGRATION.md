# Retell + Cal.com Integration Guide

## Quick Setup Summary

This guide shows you how to create a custom function in Retell AI that automatically books Cal.com appointments during voice conversations.

### What You'll Build:
- ✅ Voice agent that understands appointment requests
- ✅ Automatic Cal.com booking creation
- ✅ Data flows to n8n via call_analyzed webhook
- ✅ Real-time appointment confirmations

## Complete Setup Checklist

### 1. Create Cal.com API Key
- [ ] Go to https://app.cal.com/settings/developer/api-keys
- [ ] Create new API key (starts with `cal_live_...`)
- [ ] Copy the full API key
- [ ] Note your event type ID (e.g., 2922364 for "Schedule a tour")

### 2. Deploy Serverless Function to Vercel
- [ ] Push code to GitHub repository
- [ ] Go to https://vercel.com/new
- [ ] Import your GitHub repository
- [ ] Deploy (Vercel auto-detects Vite project)
- [ ] Note your function URL: `https://your-project.vercel.app/api/book-with-cal`

### 3. Configure Retell AI Custom Function
- [ ] Go to Retell AI dashboard
- [ ] Create new Custom Function
- [ ] **Function Name**: `book_with_cal`
- [ ] **Endpoint URL**: `https://your-project.vercel.app/api/book-with-cal`
- [ ] **Parameters Schema**: 
```json
{
  "type": "object",
  "properties": {
    "eventTypeId": {
      "type": "number",
      "description": "Cal.com event type ID (e.g., 2922364 for 'Schedule a tour')"
    },
    "attendee": {
      "type": "object",
      "properties": {
        "name": {"type": "string", "description": "Full name of the person booking"},
        "email": {"type": "string", "description": "Email address"},
        "timeZone": {"type": "string", "description": "IANA timezone (e.g., 'America/Los_Angeles')"}
      },
      "required": ["name", "email"]
    },
    "startIsoUtc": {
      "type": "string",
      "description": "Appointment start time in UTC ISO format (e.g., '2025-10-12T18:00:00Z')"
    }
  },
  "required": ["eventTypeId", "attendee", "startIsoUtc"]
}
```
- [ ] Enable function in your agent

### 4. Set Up call_analyzed Webhook (for n8n)
- [ ] In Retell AI: Webhooks → call_analyzed
- [ ] Set your n8n webhook URL
- [ ] Enable webhook

### 5. Train Your Agent
- [ ] Update agent prompt to use `book_with_cal` function
- [ ] Add conversation examples for booking scenarios

**Example Agent Prompt Addition:**
```
When a user wants to schedule a tour or appointment:

1. Ask for their name and email
2. Ask for their preferred date and time
3. Use the book_with_cal function with these parameters:
   - eventTypeId: 2922364 (for "Schedule a tour")
   - attendee: {name: "User Name", email: "user@email.com", timeZone: "America/Los_Angeles"}
   - startIsoUtc: "2025-10-15T18:00:00Z" (convert their preferred time to UTC)

4. Confirm the booking with the meeting link
```

**Example Conversation:**
```
User: "I'd like to schedule a tour"
Agent: "I'd be happy to help you schedule a tour! What's your name and email address?"
User: "John Smith, john@example.com"
Agent: "Perfect! What date and time works best for you?"
User: "Tomorrow at 2 PM"
Agent: [Calls book_with_cal function] "Great! I've scheduled your tour for tomorrow at 2 PM. You'll receive a confirmation email at john@example.com with the meeting link."
```

## Overview
This document explains the Vercel serverless function that integrates Retell AI with Cal.com for automated appointment booking through voice conversations.

## What We Built
A serverless function (`api/book-with-cal.js`) that:
- Receives booking requests from Retell AI voice agent
- Creates appointments in Cal.com automatically
- Returns booking confirmation details back to the voice agent

## File Structure
```
Loan-landing-page/
├── api/
│   └── book-with-cal.js    # Vercel serverless function
├── src/                    # Your Vite React app
├── package.json
└── RETELL_CAL_INTEGRATION.md  # This file
```

## GitHub Repository
- **Repository**: https://github.com/loanliu/LEO-voice-agent.git
- **Email**: loanliu@gmail.com
- **Branch**: main

## How It Works

### 1. Retell AI calls your function
When someone talks to your voice agent and wants to book an appointment, Retell sends a POST request to your function with details like:
- Event type (what kind of meeting)
- Attendee info (name, email, phone)
- Start time (when they want to meet)
- Duration (how long the meeting should be)

### 2. Your function books with Cal.com
The serverless function takes that information and creates a real booking in Cal.com using their API.

### 3. Confirmation goes back to the voice agent
The function returns the booking details (confirmation number, meeting link, etc.) back to Retell, which can then tell the person "Your meeting is booked!"

## Deployment Instructions

### Step 1: Deploy to Vercel

#### Option A: Through Vercel Website (Easiest)
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account and choose `loanliu/LEO-voice-agent`
4. Vercel will auto-detect it's a Vite project
5. Click **Deploy** (no need to change any settings)
6. Wait for deployment to complete (usually 1-2 minutes)

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel

# Follow the prompts
```

### Step 2: Add Your Cal.com API Key

1. Get your Cal.com API key:
   - Go to: https://app.cal.com/settings/developer/api-keys
   - Click "Create API Key"
   - Copy the key (it starts with `cal_live_...`)

2. Add it to Vercel:
   - Go to your Vercel project dashboard
   - Click **Settings** → **Environment Variables**
   - Click **Add New**
   - **Name**: `CAL_API_KEY`
   - **Value**: Paste your Cal.com API key
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

3. Redeploy (if needed):
   - Vercel usually auto-redeploys when you add environment variables
   - Or click **Deployments** → Three dots → **Redeploy**

## Your Function URL

After deployment, your endpoint will be:
```
https://your-project-name.vercel.app/api/book-with-cal
```

Example:
```
https://leo-voice-agent.vercel.app/api/book-with-cal
```

## Connecting to Retell AI

### Step 1: Create Custom Function in Retell
1. Go to your Retell AI dashboard
2. Navigate to **Custom Functions** (or LLM Functions)
3. Click **Create New Function**

### Step 2: Configure the Function
Use this configuration:

**Function Name**: `book_with_cal`

**Description**: 
```
Books a meeting appointment with the user through Cal.com
```

**Endpoint URL**:
```
https://your-project-name.vercel.app/api/book-with-cal
```

**Parameters Schema** (JSON):
```json
{
  "type": "object",
  "properties": {
    "eventTypeId": {
      "type": "number",
      "description": "Cal.com event type ID (e.g., 2922364 for 'Schedule a tour')"
    },
    "eventTypeSlug": {
      "type": "string",
      "description": "Cal.com event type slug (alternative to eventTypeId)"
    },
    "username": {
      "type": "string",
      "description": "Cal.com username"
    },
    "attendee": {
      "type": "object",
      "properties": {
        "name": {"type": "string"},
        "email": {"type": "string"},
        "timeZone": {"type": "string"},
        "phoneNumber": {"type": "string"}
      },
      "required": ["name", "email"]
    },
    "startIsoUtc": {
      "type": "string",
      "description": "Appointment start time in UTC ISO format (e.g., 2025-10-12T18:00:00Z)"
    },
    "lengthInMinutes": {
      "type": "number",
      "description": "Duration of the meeting in minutes"
    }
  },
  "required": ["attendee", "startIsoUtc"]
}
```

### Step 3: Add to Your Agent
1. Go to your Retell AI agent configuration
2. Under **Custom Functions**, enable `book_with_cal`
3. Train your agent's prompt to use this function when users want to book appointments

## Example Voice Conversation Flow

**User**: "I'd like to schedule a meeting"

**Agent**: "Sure! I can help you with that. What day and time works best for you?"

**User**: "Tomorrow at 2 PM"

**Agent**: "Perfect! Can I get your name and email?"

**User**: "John Smith, john@example.com"

**Agent**: *[Calls book_with_cal function]* "Great! I've booked your meeting for tomorrow at 2 PM. You'll receive a confirmation email at john@example.com with the meeting link."

## Response Format

The function returns this JSON structure:

**Success Response**:
```json
{
  "ok": true,
  "status": 201,
  "booking_id": 11679943,
  "booking_uid": "dg4pi5ofuATsQXHUZL57Nu",
  "meeting_url": "https://app.cal.com/video/dg4pi5ofuATsQXHUZL57Nu",
  "start_time": "2025-10-15T18:00:00.000Z",
  "end_time": "2025-10-15T18:45:00.000Z",
  "duration_minutes": 45,
  "attendee_name": "Test User",
  "attendee_email": "test@example.com",
  "host_name": "Loan Liu",
  "host_email": "loanliu@gmail.com",
  "event_type_name": "schedule-a-tour",
  "event_type_id": 2922364,
  "message": "Great! I've scheduled your tour for 10/15/2025 at 2:00:00 PM. You'll receive a confirmation email with the meeting link.",
  "raw": {
    "ok": true,
    "status": 201,
    "bookingUid": "dg4pi5ofuATsQXHUZL57Nu",
    "bookingId": 11679943,
    "start": "2025-10-15T18:00:00.000Z",
    "end": "2025-10-15T18:45:00.000Z",
    "duration": 45,
    "meetingUrl": "https://app.cal.com/video/dg4pi5ofuATsQXHUZL57Nu",
    "attendee": {
      "name": "Test User",
      "email": "test@example.com"
    }
  }
}
```

**Error Response**:
```json
{
  "ok": false,
  "error": "Invalid time slot or booking failed"
}
```

## Integrating with n8n via call_analyzed

### How it Works:
1. **Retell calls** your `book_with_cal` function
2. **Function returns** booking data in the response
3. **Retell sends** all function responses to your `call_analyzed` webhook
4. **n8n receives** the booking data automatically

### Setting up call_analyzed Webhook in Retell:
1. Go to your Retell AI agent settings
2. Navigate to **Webhooks** → **call_analyzed**
3. Set your n8n webhook URL (e.g., `https://your-n8n-instance.com/webhook/retell-call-analyzed`)
4. Enable the webhook

### What n8n Receives:
When a booking is made, your n8n webhook will receive the complete call data including:

```json
{
  "call_id": "abc123...",
  "agent_id": "your-agent-id",
  "function_calls": [
    {
      "function_name": "book_with_cal",
      "function_response": {
        "ok": true,
        "booking_id": 11680318,
        "booking_uid": "gjm7NVbj8SddVpg3y5g5qr",
        "meeting_url": "https://app.cal.com/video/gjm7NVbj8SddVpg3y5g5qr",
        "start_time": "2025-10-16T19:00:00.000Z",
        "end_time": "2025-10-16T19:45:00.000Z",
        "duration_minutes": 45,
        "attendee_name": "Demo User",
        "attendee_email": "demo@example.com",
        "host_name": "Loan Liu",
        "host_email": "loanliu@gmail.com",
        "event_type_name": "schedule-a-tour",
        "event_type_id": 2922364,
        "message": "Great! I've scheduled your tour..."
      }
    }
  ],
  "call_analyzed": {
    "summary": "User booked a tour for tomorrow",
    "next_steps": "Send confirmation email"
  }
}
```

### n8n Workflow Example:
Your n8n workflow can:
1. **Filter** for `book_with_cal` function calls
2. **Extract** booking data from `function_response`
3. **Send** confirmation emails
4. **Update** your CRM database
5. **Notify** your team via Slack/email

## Testing Your Function

### Using curl:
```bash
curl -X POST https://your-project-name.vercel.app/api/book-with-cal \
  -H "Content-Type: application/json" \
  -d '{
    "name": "book_with_cal",
    "call": {
      "call_id": "test-123"
    },
    "args": {
      "eventTypeId": 2922364,
      "attendee": {
        "name": "Test User",
        "email": "test@example.com",
        "timeZone": "America/Los_Angeles"
      },
      "startIsoUtc": "2025-10-15T18:00:00Z"
    }
  }'
```

### Using Postman:
1. Create a new POST request
2. URL: `https://your-project-name.vercel.app/api/book-with-cal`
3. Headers: `Content-Type: application/json`
4. Body: Use the JSON from the curl example above

## Troubleshooting

### Function returns "error" in response
- ✅ Check that `CAL_API_KEY` is set in Vercel environment variables
- ✅ Verify your Cal.com API key is valid
- ✅ Make sure the event type ID exists in your Cal.com account
- ✅ Check that the time slot is available

### "Invalid time format" error
- ✅ Ensure `startIsoUtc` is in UTC ISO format: `2025-10-12T18:00:00Z`
- ✅ The time must end with `Z` to indicate UTC

### Deployment fails
- ✅ Make sure you pushed the latest code to GitHub
- ✅ Check Vercel deployment logs for specific errors
- ✅ Verify the `api/` folder exists in your repository

### Environment variable not working
- ✅ After adding environment variables, redeploy your project
- ✅ Make sure the variable name is exactly `CAL_API_KEY` (case-sensitive)
- ✅ Check that you selected all environments (Production, Preview, Development)

## Code Modifications

If you need to customize the function, edit `api/book-with-cal.js`:

### Adding more fields:
Look for the `payload` object around line 28 and add your fields:
```javascript
const payload = {
  start: startIsoUtc,
  attendee,
  lengthInMinutes,
  eventTypeId,
  // Add your custom fields here
  customField: args.customField,
};
```

### Changing Cal.com API version:
Update the header on line 52:
```javascript
"cal-api-version": "2024-08-13"  // Change this date
```

## Important Notes

- 🔒 **Never** commit your `CAL_API_KEY` to GitHub
- 🔒 The `.gitignore` file already protects `.env` files
- 📝 All times must be in UTC format
- 📝 Cal.com API documentation: https://cal.com/docs/api-reference
- 📝 Retell AI documentation: https://docs.retellai.com

## Support

If you need help:
1. Check Vercel deployment logs
2. Check Cal.com API logs
3. Test the function directly with curl/Postman before connecting to Retell
4. Review Retell AI's custom function logs

## Troubleshooting

### Function Returns 404 Error
- ✅ Check Vercel root directory is set to `.` (not `landing-page`)
- ✅ Verify `api/book-with-cal.js` exists in your repository
- ✅ Redeploy your Vercel project

### Function Returns "Invalid Access Token"
- ✅ Verify your Cal.com API key is correct
- ✅ Check the API key is active in Cal.com dashboard
- ✅ Ensure your Cal.com account has pro features enabled

### Function Returns "User with username not found"
- ✅ Use `eventTypeId` instead of `username` + `eventTypeSlug`
- ✅ Get your event type ID from Cal.com dashboard
- ✅ Use the exact event type ID (e.g., 2922364)

### Function Returns "User already has booking"
- ✅ Try a different time slot
- ✅ Check if the time slot is actually available
- ✅ Use future dates for testing

### n8n Not Receiving Data
- ✅ Verify call_analyzed webhook is enabled in Retell
- ✅ Check your n8n webhook URL is correct
- ✅ Look for `function_name: "book_with_cal"` in the webhook payload
- ✅ Extract data from `function_response` object

## Your Working URLs

- **Function Endpoint**: `https://leo-voice-agent-iw69.vercel.app/api/book-with-cal`
- **GitHub Repository**: `https://github.com/loanliu/LEO-voice-agent`
- **Event Type ID**: 2922364 ("Schedule a tour")
- **Function Name in Retell**: `book_with_cal`

## Changelog

- **2025-10-11**: Initial setup of Vercel serverless function for Retell + Cal.com integration
- **2025-10-11**: Added comprehensive setup checklist and troubleshooting guide
- Connected to GitHub repository: `loanliu/LEO-voice-agent`
- Deployed serverless function at `api/book-with-cal.js`
- Successfully tested with event type ID 2922364

