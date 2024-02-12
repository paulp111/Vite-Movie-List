import style from "./css/MovieList.module.css";
import MovieListItem from "./MovieListItem";
import useMovies from "./useMovies";

import { IMovie } from "../ts/interfaces/global_interface";

export default function MovieList() {
  const [movies, err] = useMovies();
  {
    if (err !== null) {
      return <div>{(err as Error).message}</div>;
    } else {
      return (
        <div className={style.moviesContainer}>
          {" "}
          {(movies as IMovie[]).map((movie): JSX.Element => {
            return <MovieListItem key={movie.id} movie={movie} />;
          })}
        </div>
      );
    }
  }
}

// old Version without MovieList.container.tsx

// export default function MovieList() {
//   const [movies, setMovies] = useState<IMovie[]>([]);
//   const [err, setErr] = useState<Error | null>(null);
//   const options = {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   };
//   useEffect(() => {
//     const connect = async () => {
//       try {
//         const data = await fetch(`/movies`, options);
//         if (!data.ok) {
//           throw new Error("Sorry, we couldn't connect to our server!");
//         }
//         setMovies((await data.json()) as IMovie[]);
//       } catch (error) {
//         setErr(error as Error);
//       }
//     };
//     connect();
//   }, []);
//   const handleRating = (id: number, rating: number): void => {
//     setMovies((prevMovie) => {
//       return prevMovie.filter((movie) => {
//         if (movie.id === id) movie.rating = rating;
//         return movie;
//       });
//     });
//   };
//   if (err !== null) {
//     return <div>{err?.message}</div>;
//   } else {
//     return (
//       <div className="container">
//         {" "}
//         {movies.map((movie): JSX.Element => {
//           return (
//             <MovieListItem
//               key={movie.id}
//               movie={movie}
//               onRating={handleRating}
//             />
//           );
//         })}
//       </div>
//     );
//   }
// }
