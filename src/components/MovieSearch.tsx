import { useState } from "react";
import { Search, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  genre_names: string[];
  poster_url: string | null;
}

interface SearchResponse {
  tmdb_query: string;
  movies: Movie[];
  total_count: number;
  response_time_ms: number;
}

export function MovieSearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data: SearchResponse = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Film className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">AI Movie Search</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Search for movies using natural language
        </p>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Movie Search
          </CardTitle>
          <CardDescription>
            Describe the movies you're looking for in natural language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Action movies from the 90s with high ratings, or Sci-fi films about time travel"
              className="flex-1"
              disabled={isLoading}
            />
            <Button onClick={handleSearch} disabled={isLoading || !query.trim()}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
          
          {results && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">TMDB Query:</span> {results.tmdb_query}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive">
              <strong>Error:</strong> {error}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results && results.movies.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Found {results.movies.length} movies
            </h2>
            <div className="text-sm text-muted-foreground">
              {results.response_time_ms}ms
            </div>
          </div>

          <div className="grid gap-4">
            {results.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {results && results.movies.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-muted-foreground">
              No movies found for your search. Try rephrasing your query.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  const posterUrl = movie.poster_url || movie.poster_path 
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : null;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex gap-4 p-6">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-20 h-30 object-cover rounded-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-20 h-30 bg-muted rounded-md flex items-center justify-center">
                <Film className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="font-semibold text-lg leading-tight">
                {movie.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
                <span>📅 {movie.release_date || "Unknown"}</span>
                {movie.genre_names.length > 0 && (
                  <span>🎭 {movie.genre_names.join(", ")}</span>
                )}
              </div>
            </div>
            
            {movie.overview && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {movie.overview}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 