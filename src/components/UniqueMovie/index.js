import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { Component } from "react";

import "./index.css";

class UniqueMovie extends Component {
  state = { movieData: {}, loading: true };

  componentDidMount() {
    this.getMovieItemData();
  }

  getMovieItemData = async () => {
    const { match } = this.props;
    const { params } = match;
    const { uuid } = params;
    const autherisation_Token = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${autherisation_Token}`,
      },
    };

    const response = await fetch(
      "https://demo.credy.in/api/v1/maya/movies/",
      options
    );
    const data = await response.json();
    const movieDetails = data.results.map((each) => ({
      description: each.description,
      genres: each.genres,
      movieTitle: each.title,
      uuid: each.uuid,
    }));
    console.log(movieDetails);
    const newData = movieDetails.filter((each) => each.uuid === uuid);
    console.log(uuid);
    console.log(newData);
    this.setState({ movieData: newData[0], loading: false });
  };

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderMovieData = () => {
    const { movieData } = this.state;
    const { description, genres, movieTitle, uuid } = movieData;

    return (
      <div className="unique-movie-container">
        <div className="movie-card">
          <img
            src={` https://ui-avatars.com/api/?name=${movieTitle}`}
            alt={uuid}
            className="movie-image"
          />
          <h1 className="unique-title">{movieTitle}</h1>

          <p className="unique-description">{description} </p>

          <p className="unique-genres">{genres}</p>
        </div>
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    return loading ? this.renderLoader() : this.renderMovieData();
  }
}

export default UniqueMovie;
