# AI Movie Search App - Complete Setup Guide

This is an AI-powered movie search application that allows users to search for movies using natural language queries. The app translates natural language into TMDB API queries using AI and displays beautiful movie results.

## 🏗️ Architecture

The application consists of two main components:

### Frontend (`AI movie search frontend/`)
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

### Backend (`AI movie search backend/`)
- **FastAPI** Python web framework
- **OpenRouter API** for AI query translation
- **TMDB API** for movie data
- **HTTPx** for async HTTP requests

## 🚀 Quick Start

### Prerequisites

1. **Node.js 18+** and **pnpm**
2. **Python 3.8+**
3. **API Keys**:
   - [TMDB API Key](https://www.themoviedb.org/documentation/api)
   - [OpenRouter API Key](https://openrouter.ai/)

### 1. Setup Backend

```bash
cd "AI movie search backend"

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your API keys:
# OPENROUTER_API_KEY=your_openrouter_api_key_here
# TMDB_API_KEY=your_tmdb_api_key_here

# Run backend
python -m app.main
```

Backend will be available at `http://localhost:3000`

### 2. Setup Frontend

```bash
cd "AI movie search frontend"

# Install dependencies
pnpm install --save

# Setup environment (optional)
cp .env.example .env.local

# Run frontend
pnpm dev
```

Frontend will be available at `http://localhost:5173`

## 🔑 Getting API Keys

### TMDB API Key
1. Go to [TMDB website](https://www.themoviedb.org/documentation/api)
2. Create an account
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Fill out the form with your application details
6. Copy the API key to your `.env` file

### OpenRouter API Key
1. Go to [OpenRouter website](https://openrouter.ai/)
2. Sign up for an account
3. Go to the API Keys section
4. Create a new API key
5. Copy the API key to your `.env` file

## 💡 Usage Examples

Try these natural language queries:

- **"Action movies from the 90s with high ratings"**
- **"Sci-fi films about time travel"**
- **"Movies starring Leonardo DiCaprio"**
- **"Horror films from 2020"**
- **"Romantic comedies with happy endings"**
- **"Marvel superhero movies"**
- **"Animated movies for kids"**
- **"Thriller movies with plot twists"**

## 🔧 How It Works

1. **User Input**: User enters a natural language movie search query
2. **AI Translation**: Backend uses OpenRouter's Llama 3.1 model to translate the query into TMDB search terms
3. **Movie Search**: Backend searches TMDB API with the translated query
4. **Data Processing**: Backend formats movie data including posters, ratings, genres
5. **Display Results**: Frontend displays beautiful movie cards with all relevant information

## 📁 Project Structure

```
AI movie search frontend/
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   └── MovieSearch.tsx     # Main search component
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── package.json
├── vite.config.ts
└── tailwind.config.ts

AI movie search backend/
├── app/
│   ├── services/
│   │   ├── query_translator.py  # AI query translation
│   │   └── tmdb_service.py     # TMDB API integration
│   └── main.py                 # FastAPI application
├── requirements.txt
└── .env.example
```

## 🎯 Features

### ✅ Implemented
- Natural language to movie search translation
- TMDB API integration with comprehensive movie data
- Clean, modern UI inspired by GitHub search
- Real-time search with loading states
- Error handling and user feedback
- Responsive design
- Movie posters and detailed information
- Fast search performance

### 🚫 Intentionally Excluded
- User authentication (simplified for demo)
- Database persistence (stateless design)
- Analytics and tracking (privacy-focused)
- Complex movie features (focused on search)

## 🛠️ Development

### Backend Development
```bash
cd "AI movie search backend"
source venv/bin/activate
python -m app.main
```

### Frontend Development
```bash
cd "AI movie search frontend"
pnpm dev
```

### Testing
- Backend: Visit `http://localhost:3000` for the built-in test interface
- Frontend: Visit `http://localhost:5173` for the main app
- API Health: `GET http://localhost:3000/api/health`

## 🔍 API Endpoints

### Backend API

- `GET /` - Test interface
- `POST /api/search` - Search movies
  ```json
  {
    "query": "action movies from the 90s"
  }
  ```
- `GET /api/health` - Health check

### Response Format
```json
{
  "tmdb_query": "action 1990s",
  "movies": [
    {
      "id": 123,
      "title": "Movie Title",
      "overview": "Movie description...",
      "release_date": "1995-06-15",
      "vote_average": 8.5,
      "poster_path": "/path/to/poster.jpg",
      "genre_names": ["Action", "Thriller"]
    }
  ],
  "total_count": 20,
  "response_time_ms": 1250
}
```

## 🚨 Troubleshooting

### Common Issues

1. **"OpenRouter API key not configured"**
   - Make sure you have `OPENROUTER_API_KEY` in your `.env` file
   - Verify the API key is correct

2. **"TMDB API key not configured"**
   - Make sure you have `TMDB_API_KEY` in your `.env` file
   - Verify the API key is correct and activated

3. **Frontend can't connect to backend**
   - Make sure backend is running on port 3000
   - Check that CORS is properly configured
   - Verify the proxy settings in `vite.config.ts`

4. **Movie posters not loading**
   - This is normal for some movies - the app shows a placeholder
   - TMDB API sometimes has missing poster URLs

### Environment Issues
- Make sure you're in the correct directory for each command
- Activate Python virtual environment for backend commands
- Use `pnpm` instead of `npm` for frontend (as per user preference)

## 🎨 Customization

### Styling
- Edit `src/index.css` for global styles
- Modify `tailwind.config.ts` for theme customization
- Update `components/ui/` for component styling

### Search Behavior
- Modify `query_translator.py` to change AI translation logic
- Update `tmdb_service.py` to adjust search parameters
- Edit `MovieSearch.tsx` to change UI behavior

## 📝 License

This is a demonstration project. Feel free to use and modify as needed.

---

**Happy movie searching! 🎬✨** 