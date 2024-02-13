import style from "./css/MovieListItem.module.css";
import Rating from "./Rating";
import { IMovie } from "../ts/interfaces/global_interface";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { 
CardActions,
IconButton,
} from "@mui/material";

interface Props {
  movie: IMovie;
  onDelete: (movie: IMovie) => Promise<void>;
}
interface Props {
  movie: {
    id: number;
    title: string;
    director: string;
    runtime: number;
    rating: number;
  };
}
export default function MovieListItem({ movie, onDelete }: Props) {
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Typography component="h2" variant="h5">
            Title: {movie.title}
          </Typography>
          <Typography variant="subtitle1" component="h5" sx={{ mb: 1 }}>
            Director: {movie.director}
          </Typography>
          <Typography variant="body1" component="span">
            Runtime: {movie.runtime}
          </Typography>
          <div>
            <Rating item={movie} />
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton 
          color="primary" 
          aria-label="delete-movie"
          onClick={() => onDelete(movie)}
          >
            <DeleteIcon />
            </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
