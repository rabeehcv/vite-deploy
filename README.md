# Vite React App Deployment on GitHub

This repository provides a step-by-step guide on how to deploy a Vite React application on GitHub. 

## Getting Started
### 1. Create a Vite React App

If you haven't already, create a Vite React app by running the following commands:
```
npm create vite@latest
```
Give a project name and choose framework as React. Select a varient.

### 2. Install Dependencies

Navigate to your project directory and install the dependencies:
```
cd your-project-name
npm install
```
### 3. Create a new Repository on GitHub
Setup git by running following commands:
```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<your username>/<your repository name>.git
git push -u origin main
```

### 4. Setup Deploy

Add the following configuration in your vite.config.js file to set the base path for your GitHub Pages deployment:
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repository-name/', // Update this to your repository name
})
```

### 5. Create new folder named .github and create another folder named workflows inside .github. 
Inside workflows, add deploy.yml:
```
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v1
        with:
          node-version: 16

      - name: Install dependencies
        uses: bahmutov/npm-install@v1

      - name: Build project
        run: npm run build

      - name: Upload production-ready build files
        uses: actions/upload-artifact@v2
        with:
          name: production-files
          path: ./dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Download artifact
        uses: actions/download-artifact@v2
        with:
          name: production-files
          path: ./dist

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```
### 6. Run following command
```
git add .
git commit -m "add:deploy workflow"
git push
```
### 7. Go to Repository > Settings > general > workflow permissions > Read and write permissions > save

### 8. Actions > add:deploy workflow > Re-run jobs > Re-run failed jobs > Re-run jobs 

Wait until build and deploy become successful

### 9. Settings > pages > branch > gh-pages > save

### 10. Go to Actions and wait until "pages build and deployment" become successful.

### 11. settings > pages 

Click the link visible

### 12. We can sync new changes and whenever we push to github, it will deploy automatically.


