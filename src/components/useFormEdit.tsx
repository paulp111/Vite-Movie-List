import { useState, useEffect } from 'react';

interface MovieInput {
  title: string;
  director: string;
  runtime: number;
}

interface IMovie extends MovieInput {}

interface UseFormEditProps {
  editMovie?: IMovie;
  onSave: (movie: MovieInput) => void;
}

export function useFormEdit({ editMovie, onSave }: UseFormEditProps) {
  const [movie, setMovie] = useState<MovieInput>({
    title: '',
    director: '',
    runtime: 0,
  });

  useEffect(() => {
    if (editMovie) {
      setMovie(editMovie);
    }
  }, [editMovie]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(movie);
  };

  return {
    movie,
    handleChange,
    handleSubmit,
  };
}
