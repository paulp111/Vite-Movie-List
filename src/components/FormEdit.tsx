import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MovieInput } from "../ts/interfaces/global_interface";
import style from "./css/FormEdit.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const movieSchema = yup
  .object({
    title: yup
      .string()
      .required("title is required")
      .min(2, "The title must have min. 2 chars.")
      .max(30, "The title must have max. 30 chars"),
    director: yup.string().required("director is required"),
    runtime: yup.number().required("runtime is required"),
  })
  .required();

/* interface MovieInput {
  title: string;
  director: string;
  runtime: number;
} */

interface Props {
  onSave: (movie: MovieInput) => void;
  editMovie?: MovieInput;
}

export default function FormEdit({ onSave, editMovie }: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieInput>({ resolver: yupResolver(movieSchema) });

  useEffect(() => {
    reset(editMovie);
  }, [editMovie, reset]);

  const onSubmit = (data: MovieInput) => {
    onSave(data);
  };

  return (
    <form className={style.inputmMovieForm} onSubmit={handleSubmit(onSave)}>
      <label htmlFor="title">
        Title:
        <input
          type="text"
          placeholder="name a cool movie"
          {...register("title")}
          className={errors.title && style.error}
      />
      </label>
      {errors.title && <div className={style.error}>{errors.title.message}</div>}

      <label htmlFor="director">
        Director:
        <input
          type="text"
          placeholder="directed by..."
          {...register("director")}
          className={errors.director && style.error}
      />
      </label>
      {errors.director && <div className={style.error}>{errors.director.message}</div>}

      <label htmlFor="runtime">
        Runtime:
        <input
          type="number"
          placeholder="0"
          {...register("runtime")}
          className={errors.runtime && style.error}
      />
      </label>
      {errors.runtime && <div className={style.error}>{errors.runtime.message}</div>}
      <button type="submit" className={style.saveBtn}>
        Save
        </button>
    </form>
  );
}
