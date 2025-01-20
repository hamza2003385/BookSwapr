import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../Home/loader/loader";
import Header from "../../../Component/Header/header";
import NavBar from "../../../Component/Header/navbar/navbar";
// import { BiArrowFromRight } from "react-icons/bi";
import BtnReturn from "../../../Component/Header/Btns/btnReturn";
import TrailerSerie from "../../Home/Series/trailerSerie/trailerSerie";
// importation fichier style 
import "../../../Style/homePageStyle/serieDetails.css"
import "../../../Style/homePageStyle/MoviePopular.css"
import FetchEpsoids from "./ListEpsoids";
// import AvailableSeries from "./availableSeries";
// import Series from "../../Home/Series/Series";
function SerieDetails() {
  const [clickedSerie, setClickedSerie] = useState(null); // Changed from empty object to null for better conditional rendering
  const [error, setError] = useState(''); 
  const [casts , setcasts] = useState([])// Added error state
  // const [Epsoids ,setEpsoids] = useState([]) // list of epsoids for each seasons
  const { id } = useParams(); // Extract ID from URL params
  

  useEffect(() => {
    const fetchSerieClicked = async () => {
      try {
        // Add your API key here
        const API_KEY = "0be26cb6a74a47d1f0dbddb4f09f76d8"; // Replace with your actual TMDb API key
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
        );
        setClickedSerie(response.data);
      } catch (error) {
        console.error("Erreur de fetching de la série sélectionnée:", error);
        setError("Impossible de récupérer les détails de la série.");
      }
    };
    fetchSerieClicked();
  }, [id]); 

  // fetch the casts of serie 
  useEffect(()=>{
    const fetchCatsOfSerie = async()=>{
      const API_KEY = "0be26cb6a74a47d1f0dbddb4f09f76d8"; // Replace with your actual TMDb API key
      try {
        const response =await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`)
        setcasts(response.data.cast)
        
      } catch (error) {
        console.log("Erreur de fethching les acteurs de ce film " , error )
        
      }
    }
    fetchCatsOfSerie()

  } ,[id])

  //   fetch the epsoids of series 
  



  if (error) {
    return <p>{error}</p>;
  }

  if (!clickedSerie) {
    return <Loader />

  }

  console.log(clickedSerie)


  return (
      // ------------------------ JSX Rendering --------------------
    <>
    <Header />
    <NavBar/>
    {/* button de retour  */}
    <BtnReturn />
    {/* trailer of Serie  */}
    <TrailerSerie id={id} serie={clickedSerie} />

    { <section className="serieDetails">
      <h3 className=" SerieTitle"> {clickedSerie.original_name || "Non disponible"} </h3>
      <p className="SerieOverview">
        <strong>Overview</strong><br/>
       {clickedSerie.overview || "Description non disponible"}
       </p>
      <p >Date:
        {" " +clickedSerie.first_air_date || "Non disponible"}</p>
      {/* <p>Nombre des seasons : {clickedSerie.seasons.map(season=>season.season_number)}</p> */}
      <div><button className="genreBtn">{clickedSerie.genres.map(genre=> genre.name)}
        </button></div>

        {/* list of casts  */}
        <h4 className="castListTitle">Lists of actors</h4>
        <div className="castsList" >
          
          {casts
          .slice(0,6)
          .map((cast)=>{
            return(
              <>
              <div className="castProfile"  key={`${cast.id} -${cast.name}`}>
                {/* profile of authors  */}

                <div className="imgprofile">
                <img 
                    src={cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : 'fallback_image_url'}
                    alt={`Profile of ${cast.name}`}
                  />
                </div>
                <p>{cast.name}</p>
              </div>
              </>
            )
          })
          }


        </div>
        {/* list of Epsoids depending the seasons for each films */}
        <FetchEpsoids seasonNumber={clickedSerie.seasons.map(season => season.season_number)} id={id} seriesTitle={clickedSerie.original_name} /> 
      </section> 
      }

    </>
  );
}

export default SerieDetails;
