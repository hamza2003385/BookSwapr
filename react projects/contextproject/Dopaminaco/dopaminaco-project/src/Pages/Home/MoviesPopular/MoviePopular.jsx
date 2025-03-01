import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlay, FaRegHeart } from "react-icons/fa";
import "../../../Style/homePageStyle/MoviePopular.css"

function MoviePopular() {
    const [moviePopular, setMoviePopular] = useState([]);
    const [genres, setgenres] = useState([]);
    
    // Fetch the popular movies
    useEffect(() => {
        const fetchPopularMovie = async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=0be26cb6a74a47d1f0dbddb4f09f76d8&page=3");
                setMoviePopular(() => {
                    const Movie = response.data.results.filter((movie) => {
                        const newMovie = [];
                        const dateActual = new Date();
                        movie.release_date >= dateActual ? newMovie.push(newMovie) : newMovie.push(null);
                        return newMovie;
                    });
                    return Movie;
                });
            } catch (error) {
                console.log("Error loading data", error);
            }
        };
        fetchPopularMovie();
        console.log(moviePopular);
    }, [moviePopular]);

    // Fetch genres
    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=0be26cb6a74a47d1f0dbddb4f09f76d8&language=en-US");
                setgenres(response.data.genres); // Assuming response contains a `genres` array
            } catch (error) {
                console.log("Error loading genres", error);
            }
        };
        fetchGenre();
    }, [moviePopular]); // Depend only on moviePopular
    console.log(genres);
    
    return (
        <>
            <div className="MoviePopularContainer">
                <div className="CartMoviePopular">
                    {moviePopular.slice(0, 1).map((movie) => {
                        return (
                            <>
                                <div
                                    className="CartCover"
                                    style={{
                                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize :"cover" ,
                                        height:"auto"
                                    }}
                                    key={movie.id}
                                >
                                   <div className="genreContainer">
   
                                    {movie.genre_ids.map((id) => {
                                        const genre = genres.find((genre) => genre.id === id); // Match genre ID
                                        return genre ? <div><button key={id} className="genreBtn" style={{border: "1 solid white"}}>
                                            {genre.name}
                                            </button> </div>: null; // Render button if genre exists
                                    })}
                                    </div>
                                    <div className="titleContainer">
                                        <h2 className="titlePopular">{movie.title}</h2>
                                    </div>
                                    <div className="description">
                                        <p>{movie.overview}</p>
                                    </div>
                                    <div className="RateMoviePopular">
                                        <h5>{parseFloat(movie.vote_average).toFixed(1)} ⭐</h5>
                                    </div>
                                    <div className="WatchDetails">
                                        <div className="btn-watchContainer">
                                            <button className="btn-watch">
                                                <FaPlay /> watch
                                            </button>
                                        </div>
                                        <div className="btn-FavoriteContainers">
                                            <button className="btn-favorite">
                                                <FaRegHeart />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
export default MoviePopular;
