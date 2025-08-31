#!/bin/bash

# 🚀 Quick Migration Script for Julietta's Birthday App
# This script helps migrate from Lovable to Vercel/Netlify

echo "🎂 Julietta's Birthday App Migration Script"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Found project files"

# Step 1: Create .env file
echo "📝 Creating .env file..."
cat > .env << EOL
# Supabase Configuration
VITE_SUPABASE_URL=https://qjzoefbunmhpafcqbbtl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqem9lZmJ1bm1ocGFmY3FiYnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MDg5OTAsImV4cCI6MjA3MjA4NDk5MH0.ewM1knYlreKtdW6QpBjAU8BdyP7ssMYLFyEzuKImbvk

# App Configuration
VITE_APP_NAME="Julietta's Birthday Celebration"
VITE_APP_DESCRIPTION="Help celebrate Julietta's birthday by completing fun daily tasks"
EOL

echo "✅ Created .env file"

# Step 2: Test build
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Step 3: Choose deployment platform
echo ""
echo "🚀 Choose your deployment platform:"
echo "1) Vercel (Recommended)"
echo "2) Netlify"
echo "3) Just prepare files (no deployment)"
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "📦 Deploying to Vercel..."
        echo "Please follow these steps:"
        echo "1. Go to https://vercel.com"
        echo "2. Click 'New Project'"
        echo "3. Import your GitHub repository"
        echo "4. Add environment variables:"
        echo "   - VITE_SUPABASE_URL"
        echo "   - VITE_SUPABASE_ANON_KEY"
        echo "5. Deploy!"
        ;;
    2)
        echo "📦 Deploying to Netlify..."
        echo "Please follow these steps:"
        echo "1. Go to https://netlify.com"
        echo "2. Click 'New site from Git'"
        echo "3. Connect your GitHub repository"
        echo "4. Build settings:"
        echo "   - Build command: npm run build"
        echo "   - Publish directory: dist"
        echo "5. Add environment variables in Site settings"
        echo "6. Deploy!"
        ;;
    3)
        echo "📁 Files prepared for manual deployment"
        echo "Check MIGRATION_GUIDE.md for detailed instructions"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🎉 Migration preparation complete!"
echo "📖 Check MIGRATION_GUIDE.md for detailed instructions"
echo "🔗 Your app will be ready to deploy!"
