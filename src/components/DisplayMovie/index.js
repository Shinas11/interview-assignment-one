import { Link } from "react-router-dom";
import "./index.css";

const DisplayMovie = (props) => {
  const { each } = props;
  const { movieTitle, description, genres, uuid } = each;

  return (
    <Link to={`/title/${uuid}`}>
      <div className="movie">
        <img
          src={` https://ui-avatars.com/api/?rounded=true&&name=${movieTitle}`}
          alt={uuid}
          className="movie-image"
        />
        <h1 className="display-title">{movieTitle}</h1>

        <p className="display-description">{description} </p>

        <p className="display-genres">{genres}</p>
      </div>
    </Link>
  );
};

export default DisplayMovie;
