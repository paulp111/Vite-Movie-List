import style from "./css/MovieList.module.css";
import MovieListItem from "./MovieListItem";
import useMovies from "./useMovies";
import DeleteDialog from "./DeleteDialog";
import { Container, Grid, TextField, Fab } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { IMovie, MovieInput } from "../ts/interfaces/global_interface";
import { useState } from "react";
import FormEdit from "./FormEdit";

export default function MovieList() {
  const [movies, err, handleDelete, handleAdd] = useMovies();
  const [filter, setFilter] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    movie: IMovie | null;
  }>({ open: false, movie: null });

  const [formDialog, setFormDialog] = useState<{
    open: boolean;
    edited?: boolean;
    movie?: IMovie;
  }>({ open: false });

  const handleDialog = (open: boolean, movie: IMovie) => {
    if (open) {
      setDeleteDialog({ open: true, movie });
    } else {
      setDeleteDialog({ open: false, movie: null });
    }
  };
  const handleEditDialog = (open: boolean, movie: IMovie) => {
    if (open) {
      setFormDialog({ open: true, movie });
    } else {
      setFormDialog({ open: false, movie: undefined });
    }
  };
  {
    if (err !== null) {
      return <Container>{(err as Error).message}</Container>;
    } else {
      return (
        <Container sx={{ backgroundColor: "#EBEBEB", p: 10 }}>
          <TextField
            id="filter-input"
            label="Liste Filtern"
            variant="outlined"
            sx={{ mb: 3 }}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <Grid container spacing={2}>
            {(movies as IMovie[])
              .filter((movie: IMovie) => {
                return movie.title.toLowerCase().includes(filter.toLowerCase());
              })
              .map((movie): JSX.Element => {
                return (
                  <MovieListItem
                    key={movie.id}
                    movie={movie}
                    onDialog={handleDialog}
                    onEdit={handleEditDialog}
                  />
                );
              })}
          </Grid>
          <DeleteDialog
            title="Delete Element"
            text={`Do you really want to delete the movie "${deleteDialog.movie?.title}"`}
            open={deleteDialog.open}
            onConfirm={(isConfirmed) => {
              if (isConfirmed && deleteDialog.movie) {
                (handleDelete as (movie: IMovie) => Promise<void>)(
                  deleteDialog.movie
                );
              }
              setDeleteDialog({ open: false, movie: null });
            }}
          ></DeleteDialog>
          <FormEdit
            onSave={(movie: MovieInput) => {
              setFormDialog({ open: false, movie: undefined, edited: true });
              (
                handleAdd as (
                  movie: MovieInput,
                  edited: boolean
                ) => Promise<void>
              )(movie, formDialog.edited!);
            }}
            open={formDialog.open}
            onClose={() => setFormDialog({ open: false, movie: undefined })}
            movie={formDialog.movie}
          />
          <Fab
            color="primary"
            onClick={() =>
              setFormDialog({ open: true, movie: undefined, edited: false })
            }
            sx={{
              position: "fixed",
              right: "50%",
              bottom: "1&%",
              transform: "translateX(-50%)",
            }}
          >
            <Add />
          </Fab>
        </Container>
      );
    }
  }
}