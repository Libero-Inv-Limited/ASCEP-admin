#!/bin/bash

# Quick Fix Script for React Hooks Error
# This script clears all cache and reinstalls dependencies

echo "🔧 Fixing React Hooks Error..."
echo ""

# Step 1: Stop any running dev server
echo "📋 Step 1: Ensure dev server is stopped (press Ctrl+C if running)"
echo ""

# Step 2: Clear Vite cache
echo "📋 Step 2: Clearing Vite cache..."
rm -rf .vite
rm -rf node_modules/.vite
echo "✅ Vite cache cleared"
echo ""

# Step 3: Clear dist folder
echo "📋 Step 3: Clearing build folder..."
rm -rf dist
echo "✅ Build folder cleared"
echo ""

# Step 4: Remove node_modules and package-lock
echo "📋 Step 4: Removing node_modules and package-lock.json..."
rm -rf node_modules
rm -f package-lock.json
echo "✅ node_modules and package-lock.json removed"
echo ""

# Step 5: Clear npm cache
echo "📋 Step 5: Clearing npm cache..."
npm cache clean --force
echo "✅ npm cache cleared"
echo ""

# Step 6: Reinstall dependencies
echo "📋 Step 6: Reinstalling dependencies..."
npm install
echo "✅ Dependencies reinstalled"
echo ""

echo "🎉 Fix complete! Now run: npm run dev"
echo ""
