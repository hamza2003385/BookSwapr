import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import Header from "../../Component/Header/header";
import NavBar from "../../Component/Header/navbar/navbar";
import InputSearch from "./Search/InputSearch";
import MoviePopular from "./MoviesPopular/MoviePopular";
// import TrailerMovies from "./TrailerMovies/trailerMovies";
// import RecomendedCard from "../../Component/MovieCard/recomndedCard";

function Home() {
    const [movies, setMovies] = useState([]); // All movies loaded incrementally
    const [genres, setGenres] = useState([]);
    const [page, setPage] = useState(1); // Current page for pagination
    const [totalPages, setTotalPages] = useState(1);
    const [searchedValue, setSearchedValue] = useState(""); // Search input value
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false); // Toggle for search mode
    const [comingSoonMovies, setComingSoonMovies] = useState([]); // Upcoming movies
    // recomonded movies
    const [recomendMovies, setrecomendedMovies] = useState([])
    //trailer Movies 
    
    const API_KEY = "0be26cb6a74a47d1f0dbddb4f09f76d8";

    // Fetch genres once
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
                );
                setGenres(response.data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
    }, []);

    // Fetch popular movies
    useEffect(() => {
        if (!isSearching) {
            const fetchMovies = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
                    );
                    setMovies((prevMovies) => {
                        const newMovies = response.data.results.filter(
                            (movie) => !prevMovies.some((m) => m.id === movie.id)
                        );
                        return [...prevMovies, ...newMovies];
                    });
                    setTotalPages(response.data.total_pages);
                } catch (error) {
                    console.error("Error fetching movie data:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchMovies();
        }
    }, [page, isSearching]);

    // Fetch upcoming movies
    useEffect(() => {
        const fetchComingSoonMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`
                
                );
                response.status(200)
                setComingSoonMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching coming soon movies:", error);
            }
        };
        fetchComingSoonMovies();
    }, []);

    // Search movies
    useEffect(() => {
        if (searchedValue.trim() === "") {
            // Reset search mode when the input is cleared
            setIsSearching(false);
            setPage(1);
        } else {
            const searchMovies = async () => {
                setIsSearching(true);
                setIsLoading(true);
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
                            searchedValue
                        )}&page=${page}`
                    );
                    setMovies(response.data.results); // Replace movies with search results
                    setTotalPages(response.data.total_pages); // Update total pages for search results
                } catch (error) {
                    console.error("Error fetching search results:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            searchMovies();
        }
    }, [searchedValue,page]);
    // fetch the recomonded movies 
    useEffect(() => {
        const fetchRecomendedMovies = async () => {
            try {
                setIsLoading(true);
        
                const movieId = 12345; // Replace with an actual valid movie ID
                // const tvId = 67890;    // Replace with an actual valid TV show ID
        
                const responseMovies = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`
                );
        
                // const responseSeries = await axios.get(
                    // `https://api.themoviedb.org/3/tv/${tvId}/recommendations?api_key=${API_KEY}`
                // );
        
                console.log("Movie Recommendations Response:", responseMovies.data);
    
                if (!responseMovies.data.results.length ) {
                    console.warn("No recommendations found for the provided movie and TV show IDs.");
                }
                setrecomendedMovies([
                    ...responseMovies.data.results
                ]);
            } catch (error) {
                console.error("Erreur de chargement des recommandations:", error.response ? error.response.data : error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
    
        fetchRecomendedMovies();
    }, [recomendMovies]); // Empty dependency array to avoid infinite re-renders
    
    console.log(recomendMovies);
    
    // Handle infinite scroll
    const handleScroll = (e) => {
        const container = e.target;
        if (
            container.scrollHeight - container.scrollTop <=
            container.clientHeight + 50 // Trigger when close to the bottom
        ) {
            if (page < totalPages && !isLoading && !isSearching) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    // Handle search input
    const handleSearchChange = useCallback((value) => {
        setSearchedValue(value);
    }, []);

    // Component for "See All Movies"
    const SeeAllMovies = ({ pathName ,className}) => {
        return (
            <Link
                to={`/home/New/${pathName}`}
                style={{ textDecoration: "none" }}
                className={className}
            >
                See All
            </Link>
        );
    };

    return (
        <main className="Main">
            <Header />
            <NavBar />
            <MoviePopular />

            {/* Trending Movies Section */}
            <div className="infoSection">
                <h2 className="Title">Trending now 🔥</h2>
                <SeeAllMovies pathName="trendingMoviesList" className="btn-seeALl"/>
            </div>

            {/* Search Section */}
            <section className="Search">
                <div className="containerSearch">
                    <InputSearch value={searchedValue} onChange={handleSearchChange} />
                </div>
            </section>

            {/* Movies Display Section */}
            <section className="container" onScroll={handleScroll}>
                {movies.slice(0, 3).map((movie) => (
                    <div
                        key={movie.id}
                        className="carts"
                        style={{
                            width: "250px",
                            height: "290px",
                            borderRadius: "16px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            position: "relative",
                            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="CartsMovies">
                            <div className="details">
                                <div className="RateMovie">
                                    <h5>{parseFloat(movie.vote_average).toFixed(1)} ⭐</h5>
                                </div>
                                <div className="btn-FavoriteContainerHome">
                                    <button className="btn-favoriteHome">
                                        <FaRegHeart />
                                    </button>
                                </div>
                                <div className="TitleMovies" style={{ textAlign: "start", width: "100%" }}>
                                    <h4>{movie.title}</h4>
                                </div>
                                <div className="genreMovieContainer">
                                    {genres
                                        .filter((genre) => movie.genre_ids.includes(genre.id))
                                        .slice(0, 2)
                                        .map((genre) => (
                                            <p key={genre.id} className="genre">
                                                {genre.name}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Coming Soon Section */}
            <h2 className="TitleComingSoon">Coming Soon</h2>
            <SeeAllMovies pathName="trendingMoviesList" className= "btnComingSeeALl" />
            <section className="containerComingSoon">
                {comingSoonMovies.slice(5, 8).map((movie) => (
                    <div
                        key={movie.id}
                        className="cartsComingSoon"
                        style={{
                            width: "250px",
                            height: "290px",
                            borderRadius: "16px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            backgroundImage: movie.backdrop_path
                                ? `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
                                : "url(/path/to/placeholder/image.jpg)",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            margin: "1em",
                        }}
                    >
                
                        <div className="details">
                                <div className="RateMovieComingSoon">
                                    <h5>{parseFloat(movie.vote_average).toFixed(1)} ⭐</h5>
                                </div>
                                <div className=".btn-FavoriteContainerCMSHome">
                                    <button className="btn-favoriteHome">
                                        <FaRegHeart />
                                    </button>
                                </div>
                                    <div className="TitleMovies" style={{textAlign: "start"  ,width:"100%" ,display : "block"}}>
                                        <h4 className="titleFilm" style={{textAlign: "start" ,width: "100%" ,marginBottom: "10px"}}>{movie.title}</h4>
                                    </div>
                                    <div className="genreMovieContainer">
                                       {genres.filter((genre) => movie.genre_ids.includes(genre.id))
                                                    .slice(0,2)
                                                    .map((genre) => (
                                                        <div key={genre.id} className="genreFilm">
                                                      <p className="genre" style={{marginTop : "1em"}}>
                                                        { genre.name.concat(", " , " ")}
                                                        </p>


                                                        </div>
                                                    ))}
                    </div>
                    </div>
            
               
           </div> 
                ))}
               
           </section> 
        </main>
    );
}

export default Home;
