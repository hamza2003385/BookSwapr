import React, { useState } from 'react';
import useFetchMovies from '../../../hooks/useFetchMovies';
import Header from '../../../Component/Header/header';
import NavBar from '../../../Component/Header/navbar/navbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "../../Home/loader/loader";
import { FaPlay, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SeeAllMoviesFunc({ pathname, genres }) {
  const [page, setPage] = useState(1);
  const { movies: comingSoonMovies, loading: loadingComingSoonMovies, error: errorComingSoonMovies, totalPages } = useFetchMovies('upcoming', '0be26cb6a74a47d1f0dbddb4f09f76d8', page);

  const fetchMoreData = () => {
    if (!loadingComingSoonMovies && page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const formattingTitle = (title) => {
    return title.length > 15 ? title.slice(0, 12) + "..." : title;
  };

  return (
    <>
      <Header />
      <NavBar />
      <div className='ContainerallMovies'>

   
      <div  style={{width: "80vw"}}>
                <h3 className='title'>Coming Soon Movies</h3>
                <InfiniteScroll
                  dataLength={comingSoonMovies.length}
                  next={fetchMoreData}
                  hasMore={page < totalPages}
                  loader={<Loader />}
                  endMessage={<p>No more movies to show.</p>}
                >
                  {comingSoonMovies
                    .filter((result) => result.backdrop_path !== null)
                    .map((movie) => (
                      <div
                        className="cart"
                        style={{
                          width: "250px",
                          height: "260px",
                          borderRadius: "16px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          position: "relative",
                          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          margin: "1em 1em 0.33em 1em",
                        }}
                        key={movie.id}
                      >
                        {/* Rate */}
                        <div className="RateMovie">
                          <h5>{parseFloat(movie.vote_average).toFixed(1)} ⭐</h5>
                        </div>
                        {/* Favorite */}
                        <div className="btn-FavoriteSerieHome">
                          <button className="btn-favoriteHomeSerie">
                            <FaRegHeart />
                          </button>
                        </div>
                        {/* Title */}
                        <div className="TitleSerieContainer">
                          <p className="TitleSerie">
                            {formattingTitle(movie.title)}
                          </p>
                        </div>
                        {/* Genre */}
                        <div className="genreSerieContainer">
                        
                        </div>
                        {/* Watch Details */}
                        <div className="btnWatchDetails">
                          <Link to={`/home/series/${movie.id}`}>
                            <div className="FaPlay">
                              <FaPlay />
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                </InfiniteScroll>
                {errorComingSoonMovies && <p>Error: {errorComingSoonMovies}</p>}
      </div>   </div>
    </>
  );
}

export default SeeAllMoviesFunc;
