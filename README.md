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

## Project Structure
```
flight-search/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── src/
│   ├── components/
│   │   ├── FlightSearch.tsx
│   │   ├── FlightResults.tsx
│   │   └── FlightCard.tsx
│   │
│   ├── hooks/
│   │   └── useFlightSearch.ts
│   │
│   ├── services/
│   │   └── flightApi.ts
│   │
│   ├── types/
│   │   └── flight.ts
│   │
│   ├── utils/
│   │   └── formatters.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
└── vite.config.ts
```

### .github/workflows/ci.yml
```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

### services/flightApi.ts
```typescript
import axios from 'axios';

const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const RAPID_API_HOST = 'sky-scrapper.p.rapidapi.com';

export const searchFlights = async (params: {
  from: string;
  to: string;
  date: string;
}) => {
  try {
    const response = await axios.get('/flights', {
      baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': RAPID_API_HOST
      },
      params
    });
    return response.data;
  } catch (error) {
    console.error('Flight search error', error);
    throw error;
  }
};
```

## Performance & Best Practices
- Use React Query for state management and caching
- Implement code splitting with React.lazy
- Use TypeScript for type safety
- Leverage Vite's fast build and HMR
- Implement proper error boundaries
- Use React hooks for component logic
```

## Next Steps
1. Implement components
2. Configure API integration
3. Set up state management
4. Add routing
5. Implement responsive design with Tailwind

## Stay in touch

- Author - [Meshach Arinze](meshacharinze@gmail.com)
- Website - [devsfolio](https://devsfolio-nine.vercel.app/)
- Linkedin - [Linkedin](https://linkedin.com/in/meshach-ekene)