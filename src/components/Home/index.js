import Cookies from "js-cookie";
import { Redirect, withRouter } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaCreativeCommonsSa } from "react-icons/fa";
import { Component } from "react";
import DisplayMovie from "../DisplayMovie";
import "./index.css";

class Home extends Component {
  state = { moviesDatas: [], search: "", pageNo: 1 };

  componentDidMount() {
    this.getMovieDataFromServer();
  }

  searchMovie = (event) => {
    this.setState({ search: event.target.value });
  };
  logOut = () => {
    const { history } = this.props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  incrementPage = () => {
    const { pageNo } = this.state;
    if (pageNo < 3) {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
    }
  };
  decrementPage = () => {
    const { pageNo } = this.state;
    if (pageNo > 1) {
      this.setState((prevState) => ({ pageNo: prevState.pageNo - 1 }));
    }
  };
  getMovieDataFromServer = async () => {
    const { pageNo } = this.state;
    const url = `https://demo.credy.in/api/v1/maya/movies/?page=${pageNo}`;
    const autherisation_Token = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${autherisation_Token}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const movieDetails = data.results.map((each) => ({
      description: each.description,
      genres: each.genres,
      movieTitle: each.title,
      uuid: each.uuid,
    }));
    console.log(url);
    this.setState({ moviesDatas: movieDetails });
  };

  render() {
    const { moviesDatas, search } = this.state;
    const filteredMovie = moviesDatas.filter((each) =>
      each.movieTitle.toLowerCase().includes(search.toLowerCase())
    );
    const token = Cookies.get("jwt_token");
    if (token === undefined) {
      <Redirect to="/login" />;
    }

    return (
      <div className="home-container">
        <div className="header-section">
          <img
            src="https://res.cloudinary.com/desgftwin/image/upload/v1627916531/samples/React%20Movies/Group_7399_amgxeg.png"
            className="header-image"
            alt="header"
          />
          <div>
            <input
              type="search"
              className="search"
              onChange={this.searchMovie}
            />
            <button
              onClick={this.logOut}
              type="button"
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="movie-section">
          {filteredMovie.map((each) => (
            <DisplayMovie each={each} key={each.uuid} />
          ))}
        </div>
        <div className="bottom-section">
          <button type="button" onClick={this.decrementPage}>
            <FaArrowLeft />
          </button>
          <button type="button" onClick={this.getMovieDataFromServer}>
            <FaCreativeCommonsSa />
          </button>
          <button type="button" onClick={this.incrementPage}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
