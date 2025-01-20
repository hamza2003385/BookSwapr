import { useEffect, useState } from "react";
import Loader from "../../loader/loader";
import axios from "axios";
import "../../../../Style/homePageStyle/trailerStyle.css"
function TrailerSerie({ id, serie }) {
  const [trailerSerie, setTrailerSerie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = "0be26cb6a74a47d1f0dbddb4f09f76d8";

  useEffect(() => {
    const fetchTrailerSerie = async () => {
      try {
        const newTrailer = {};
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const trailer = response.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        
        if (trailer) {
          newTrailer[serie.id] = `https://www.youtube.com/embed/${trailer.key}`;
          setTrailerSerie(newTrailer); // Use the newTrailer object
        }
      } catch (error) {
        console.log("Erreur de fetch le trailer de cette série", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrailerSerie();
  },[id, serie.id]); // Add id to the dependency array to trigger useEffect only when id changes
    console.log(trailerSerie)
  return (
    <>
      {isLoading ? <Loader /> : null}
      {trailerSerie[serie.id] ? (
        <div className="TrailerIframe" 
        style={{borderRadius : "8px"}}>
          <iframe
            className="trailer"
            width="80%"
            height="300px"
            src={trailerSerie[serie.id]}
            title={`${serie.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>No trailer available</p>
      )}
    </>
  );
}

export default TrailerSerie;
