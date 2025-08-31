# 🚀 Migration from Lovable to Vercel/Netlify

## Prerequisites
- GitHub account
- Vercel or Netlify account
- Supabase project (already configured)

## Step 1: Update Supabase Configuration

### Create `.env` file in your project root:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://qjzoefbunmhpafcqbbtl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqem9lZmJ1bm1ocGFmY3FiYnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MDg5OTAsImV4cCI6MjA3MjA4NDk5MH0.ewM1knYlreKtdW6QpBjAU8BdyP7ssMYLFyEzuKImbvk

# App Configuration
VITE_APP_NAME="Julietta's Birthday Celebration"
VITE_APP_DESCRIPTION="Help celebrate Julietta's birthday by completing fun daily tasks"
```

### Update `src/integrations/supabase/client.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
```

## Step 2: Remove Lovable Dependencies

### Update `vite.config.ts`:
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Remove from `package.json`:
```json
{
  "devDependencies": {
    // Remove this line:
    // "lovable-tagger": "^1.1.9",
  }
}
```

## Step 3: Deploy to Vercel (Recommended)

### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### Option B: Deploy via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Step 4: Deploy to Netlify (Alternative)

### Option A: Deploy via Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in Site settings
6. Deploy!

### Option B: Deploy via CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Step 5: Update Domain Settings

### Custom Domain (Optional)
1. In your deployment platform dashboard
2. Go to Domain settings
3. Add your custom domain
4. Configure DNS records as instructed

## Step 6: Update Social Media Links

### Update `index.html`:
```html
<!-- Replace Lovable URLs with your new domain -->
<meta property="og:image" content="https://your-domain.com/og-image.png" />
<meta name="twitter:image" content="https://your-domain.com/og-image.png" />
```

## Step 7: Test Everything

### Checklist:
- [ ] App builds successfully
- [ ] Supabase connection works
- [ ] Authentication flows work
- [ ] All features function properly
- [ ] Mobile responsiveness
- [ ] Performance is good

## Troubleshooting

### Common Issues:
1. **Environment variables not loading**: Check variable names start with `VITE_`
2. **Build failures**: Check Node.js version compatibility
3. **Routing issues**: Ensure SPA routing is configured
4. **Supabase connection**: Verify API keys are correct

### Support:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [netlify.com/docs](https://netlify.com/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
