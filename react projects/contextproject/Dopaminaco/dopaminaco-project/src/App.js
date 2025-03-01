import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Categories from "./Pages/Categories/categories.jsx";
import Movies from "./Pages/wachlist/movies/movies.jsx";
import SeeAllMoviesFunc from "./Pages/Home/SeeALl/SeeALlMovieFunc.jsx";
import Series from "./Pages/Home/Series/Series.jsx";
import SerieDetails from "./Pages/MovieDetails/SerieDetails/serieDetail.jsx";
import DailymotionVideos from "./Pages/MovieDetails/MoviesDetails/MovieDetails.jsx";
//import MovieDetails from "./pages/MovieDetails";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route  path="/Categories" element={<Categories />} />
        {/* route des navbar items  */}
        <Route path="/home/New" element={<Home/>}/>
        <Route path="/home/Series" element={<Series />}/>
        <Route path="/home/Movies" element={<Movies/>}/>
        <Route path="/home/New/trendingMoviesList" element={<SeeAllMoviesFunc  pathname={"trending"}/>}/>
        <Route path="/home/tvShows"/>
        <Route path="/home/Animes"/>
        <Route path="/home/Documentaries" element={}/> 
        {/* <Route path = "/" element ={<DailymotionVideos  movieTitle ="siyah kalp"/>}/> */}
        {/* specific serie  */}
        <Route path="/home/Series/:id" element={<SerieDetails />}/>
      </Routes>
    </Router>
  );
}
export default App