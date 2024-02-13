import { useState, useEffect, useContext } from "react";
import { IMovie } from "../ts/interfaces/global_interface";
import MovieContext from "../utils/MovieContext";

export default function useMovies() {
  const [movies, setMovies] = useContext(MovieContext);
  const [err, setErr] = useState<Error | null>(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    (async () => {
      try {
        const data = await fetch(`/movies`, options);
        setMovies((await data.json()) as IMovie[]);
      } catch (error) {
        setErr(error as Error);
      }
    })();
  }, [setMovies]);

  async function handleDelete(movie: IMovie) {
    const options = {
      method: "DELETE",
    };
    const res = await fetch(`/movies/${movie.id}`, options);
    if (res.ok) {
      setMovies((prevMovie) =>
      prevMovie.filter((prevMovie) => prevMovie.id !== movie.id)
      );
    }
  }

  async function handleAdd(movie: IMovie): Promise<void> {
    const options = {
      method: "POST",
      body: JSON.stringify(movie),
      headers: { " Content-Type": "application/json" },
    };
    const res = await fetch("/movies", options);
    const data = await res.json();
    setMovies((prevMovie) => [...prevMovie, data]);

  }

  return [movies, err, handleDelete, handleAdd];
}
