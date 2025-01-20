import { useCallback, useEffect, useState } from "react";
import Header from "../../../Component/Header/header";
import NavBar from "../../../Component/Header/navbar/navbar";
import "../../../Style/homePageStyle/Series.css";
import InputSearch from "../Search/InputSearch";
import axios from "axios";
import Loader from "../loader/loader";
import { FaPlay, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import FilterComponent from "../../../Component/Search&Filter/FilterBasic/filterBasic";

function Series() {
    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [genres, setGenres] = useState([]);
    const [showFilterComponent, setshowFilterComponent] = useState(false); // State for showing filter component
    const [searchedValue ,setsearchedValue] = useState("")
    const [searchedResults , setsearcheedResults]= useState([])
     // ----- search bar 
    // fetch searched serie
    
    // appel function with delay using settimeout
    useEffect(()=>{
        const SearchingResults = async ()=>{
            const API_KEY = "0be26cb6a74a47d1f0dbddb4f09f76d8";
            const url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchedValue}`;
            
            try {
                const response = await fetch(url)
                const data = await response.json()
                setsearcheedResults(data.results || [])
              
            } catch (error) {
                console.log("erreur de de trouver les searchd queries" , error)
                
            }
    
        }
   
            SearchingResults()
            
       
    },[searchedValue])
    const handleSearch = useCallback((value)=>{
        setsearchedValue(value)

    },[])
    // Function to toggle the filter component
    const ShowingFilterComponent = () => {
        setshowFilterComponent((prevState) => !prevState);
    };

    // Effect to observe showFilterComponent state
    useEffect(() => {
        if (showFilterComponent) {
            console.log("Filter component is now visible");
        } else {
            console.log("Filter component is hidden");
        }
    }, [showFilterComponent]);

    // Fetch genres
    useEffect(() => {
        const API_KEY = "0be26cb6a74a47d1f0dbddb4f09f76d8";
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
                );
                setGenres(response.data.genres);
            } catch (error) {
                console.log("Erreur lors du fetch des genres: ", error);
            }
        };
        fetchGenres();
    }, []);

    // Fetch series data
    useEffect(() => {
        const API_KEY = "0be26cb6a74a47d1f0dbddb4f09f76d8";
        const fetchSeries = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${page}`
                );
                setSeries((prevSeries) => [...prevSeries, ...response.data.results]);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.log("Erreur lors du fetch des séries: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSeries();
    }, [page]);

    // Load more series
    const loadMoreSeries = (e) => {
        const container = e.target;
        if (container.scrollHeight - container.scrollTop <= container.clientHeight + 100) {
            if (page < totalPages && !isLoading) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    // Format the title
    const formattingTitle = (title) => {
        return title.length > 15 ? title.slice(0, 12) + "..." : title;
    };
   
    return (
        <>
            <Header />
            <NavBar className = "ActivePage"/>
            {/* search input  */}
            <InputSearch value={searchedValue}  onChange={handleSearch}/>
            {/* Filter button */}
            <button 
                className="showMoreOptions"
                onClick={ShowingFilterComponent}
            >
                ...
            </button>

            {/* Conditionally show filter component */}
            {showFilterComponent && <FilterComponent  genres={genres}/>}

          
            <section
                className="Container-Series"
                onScroll={loadMoreSeries}
                style={{ overflowY: "auto", height: "100vh", width: "80vw" }} // Ensure scrollable container
            >
                {/* Title */}
                <div className="Title-Container">
                    <h2 className="title">{"Home < "}Series</h2>
                </div>
                {/* Description */}
                <div className="descriptionContainer">
                    <p className="Description">
                        Dive into the world of captivating stories and unforgettable characters.
                        Our Series page brings you an ever-growing collection of TV shows from
                        across genres and eras. Whether you crave thrilling mysteries,
                        heartwarming dramas, or epic adventures,
                        there's always something new to discover.
                        Start scrolling and let your next binge-worthy obsession find you!
                    </p>
                </div>
                {/* Series List */}
                <div className="ListSeries-Container">
                    {/* Si une recherche est en cours, afficher les résultats correspondants */}
                    {searchedValue
                        ? searchedResults
                        .filter((result)=> result.backdrop_path !== null) 
                        .map((result) => (
                            <div
                            className="cart"
                            style={{
                                width: "250px",
                                height: "260px",
                                borderRadius: "16px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                position: "relative",
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${result.backdrop_path})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                margin: "1em 1em 0.33em 1em",

                               
                            }}
                            key={`${result.id + 1}-${result.name}`}
                            >
                            {/* Rate */}
                            <div className="RateMovie">
                                <h5>{parseFloat(result.vote_average).toFixed(1)} ⭐</h5>
                            </div>
                            {/* Favorite */}
                            <div className="btn-FavoriteSerieHome">
                                <button className="btn-favoriteHomeSerie">
                                <FaRegHeart />
                                </button>
                            </div>
                            {/* Title */}
                            <div className="TitleSerieContainer">
                                <p key={result.id} className="TitleSerie">
                                {formattingTitle(result.original_name)}
                                </p>
                            </div>
                            {/* Genre */}
                            <div className="genreSerieContainer">
                                {genres
                                .filter((genre) => result.genre_ids.includes(genre.id))
                                .slice(0, 2)
                                .map((genre) => (
                                    <p key={genre.id} className="genreSerie">
                                    {genre.name}
                                    </p>
                                ))}
                            </div>
                            {/* Watch Details */}
                            <div className="btnWatchDetails">
                                <Link to={`/home/Series/${result.id}`}>
                                <div className="FaPlay">
                                    <FaPlay />
                                </div>
                                </Link>
                            </div>
                            </div>
                        ))
                        : series
                        .filter((result)=> result.backdrop_path !== null) 
                        .map((serie) => (
                            <div
                            className="cart"
                            style={{
                                width: "250px",
                                height: "260px",
                                borderRadius: "16px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                position: "relative",
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${serie.backdrop_path})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                margin: "1em 1em 0.33em 1em",
                            }}
                            key={`${serie.id + 1}-${serie.name}`}
                            >
                            {/* Rate */}
                            <div className="RateMovie">
                                <h5>{parseFloat(serie.vote_average).toFixed(1)} ⭐</h5>
                            </div>
                            {/* Favorite */}
                            <div className="btn-FavoriteSerieHome">
                                <button className="btn-favoriteHomeSerie">
                                <FaRegHeart />
                                </button>
                            </div>
                            {/* Title */}
                            <div className="TitleSerieContainer">
                                <p key={serie.id} className="TitleSerie">
                                {formattingTitle(serie.original_name)}
                                </p>
                            </div>
                            {/* Genre */}
                            <div className="genreSerieContainer">
                                {genres
                                .filter((genre) => serie.genre_ids.includes(genre.id))
                                .slice(0, 2)
                                .map((genre) => (
                                    <p key={genre.id} className="genreSerie">
                                    {genre.name}
                                    </p>
                                ))}
                            </div>
                            {/* Watch Details */}
                            <div className="btnWatchDetails">
                                <Link to={`/home/series/${serie.id}`}>
                                <div className="FaPlay">
                                    <FaPlay />
                                </div>
                                </Link>
                            </div>
                            </div>
                        ))}
                    {isLoading && <Loader />}
                    </div>
                    </section>
               
        
        </>
    );
}

export default Series;
