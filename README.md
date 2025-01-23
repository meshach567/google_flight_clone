# Flight Search Application Setup

## Project Initialization
```bash
# Create Vite project with React and TypeScript
npm create vite

# Navigate to project directory
cd flight-search

# Install dependencies
npm install 
npm install axios react-router-dom @tanstack/react-query
npm install -D tailwindcss postcss autoprefixer eslint prettier 
npm install -D husky lint-staged commitlint @commitlint/config-conventional

# Setup Tailwind
npx tailwindcss init -p

# Setup Husky and Commitlint
npx husky init
npm pkg set scripts.prepare="husky install"
npm pkg set scripts.lint="eslint . --ext .ts,.tsx"
npm pkg set scripts.format="prettier --write ."

# Commitlint configuration
echo "module.exports = {
  extends: ['@commitlint/config-conventional']
}" > commitlint.config.js
```