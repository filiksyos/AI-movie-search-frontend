# AI Movie Search Frontend

https://github.com/user-attachments/assets/8f8776eb-42c1-444a-85ed-ada8cc7bd7be

A modern React frontend for AI-powered movie search using natural language queries.

## Features

- Clean and minimal UI inspired by modern search interfaces
- Natural language movie search
- Real-time search results with movie details
- Responsive design with Tailwind CSS
- Modern React with TypeScript and Vite

## Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Setup

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository and navigate to the frontend directory
2. Install dependencies:

```bash
pnpm install --save
```

3. Copy environment variables:

```bash
cp .env.example .env.local
```

4. Update `.env.local` if needed (default backend URL is `http://localhost:3000`)

### Development

Start the development server:

```bash
pnpm dev
```

The frontend will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## API Integration

The frontend connects to the AI Movie Search backend via:
- **Proxy**: Development server proxies `/api/*` requests to `http://localhost:3000`
- **Search Endpoint**: `POST /api/search` with natural language queries

## Components

- **MovieSearch**: Main search interface component
- **UI Components**: shadcn/ui components (Button, Input, Card, etc.)
- **MovieCard**: Individual movie result display

## Usage

1. Start the backend server (see backend README)
2. Start the frontend development server
3. Open `http://localhost:5173` in your browser
4. Enter natural language movie search queries like:
   - "Action movies from the 90s with high ratings"
   - "Sci-fi films about time travel"
   - "Movies starring Leonardo DiCaprio"
   - "Horror films from 2020"

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   └── MovieSearch.tsx  # Main search component
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
``` 
