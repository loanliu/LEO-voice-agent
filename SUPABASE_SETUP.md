# Supabase Authentication Setup Guide

This guide will help you configure Supabase for the authentication system implemented in this application.

## 1. Environment Variables Setup

Create a `.env` file in your project root with the following variables:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### How to get these values:
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the "Project URL" for `VITE_SUPABASE_URL`
5. Copy the "anon public" key for `VITE_SUPABASE_ANON_KEY`

## 2. Google OAuth Configuration

### Step 1: Create Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set Application type to "Web application"
6. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - `http://localhost:5173/auth/callback` (for local development)

### Step 2: Configure Google OAuth in Supabase
1. In your Supabase Dashboard, go to Authentication → Providers
2. Find "Google" and click "Enable"
3. Enter your Google OAuth credentials:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console
4. Set the redirect URL to: `https://your-project-id.supabase.co/auth/v1/callback`
5. Save the configuration

## 3. Authentication Settings

### Email Authentication
1. Go to Authentication → Settings
2. Enable "Enable email confirmations" if you want email verification
3. Configure email templates if needed
4. Set up custom SMTP (optional) for branded emails

### Site URL Configuration
1. In Authentication → Settings
2. Set "Site URL" to your production domain (e.g., `https://yourdomain.com`)
3. Add additional redirect URLs if needed:
   - `http://localhost:5173` (for development)
   - `https://yourdomain.com` (for production)

## 4. Database Setup

The authentication system uses Supabase's built-in `auth.users` table. No additional database setup is required for basic authentication.

### User Metadata
The system stores the user's full name in the `user_metadata` field as:
- `display_name`: The user's full name
- `full_name`: Backup field for the full name

You can access this data in your application using:
```typescript
const user = await supabase.auth.getUser();
const displayName = user.data.user?.user_metadata?.display_name;
```

## 5. Row Level Security (RLS)

If you plan to create additional tables that reference users, make sure to:
1. Enable RLS on your tables
2. Create policies that reference `auth.uid()`

Example policy:
```sql
CREATE POLICY "Users can only see their own data" ON your_table
FOR ALL USING (auth.uid() = user_id);
```

## 6. Testing the Setup

### Local Development
1. Start your development server: `npm run dev`
2. Navigate to `/register` to test signup
3. Navigate to `/login` to test signin
4. Test Google OAuth by clicking "Continue with Google"

### Production Deployment
1. Update environment variables in your hosting platform
2. Update redirect URLs in Google Cloud Console
3. Update Site URL in Supabase Dashboard
4. Test all authentication flows

## 7. Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use different Supabase projects for development and production
- Rotate API keys regularly

### OAuth Security
- Use HTTPS in production
- Validate redirect URLs
- Monitor authentication logs in Supabase Dashboard

## 8. Troubleshooting

### Common Issues

**"Invalid redirect URL" error:**
- Check that your redirect URLs are properly configured in both Google Cloud Console and Supabase
- Ensure URLs match exactly (including protocol and trailing slashes)

**"Invalid client" error:**
- Verify Google OAuth credentials in Supabase Dashboard
- Check that Google+ API is enabled in Google Cloud Console

**Email confirmation not working:**
- Check email settings in Supabase Dashboard
- Verify SMTP configuration if using custom email provider
- Check spam folder for confirmation emails

**User metadata not saving:**
- Verify that the signup function is passing metadata correctly
- Check Supabase logs for any errors during user creation

### Debug Mode
Enable debug mode by adding to your `.env`:
```env
VITE_DEBUG_AUTH=true
```

This will log additional information to the browser console during authentication flows.

## 9. Next Steps

After setting up authentication, you might want to:
1. Create protected routes that require authentication
2. Add user profile management
3. Implement password reset functionality
4. Add social login with other providers (GitHub, Facebook, etc.)
5. Set up user roles and permissions

For more advanced features, refer to the [Supabase Auth documentation](https://supabase.com/docs/guides/auth).