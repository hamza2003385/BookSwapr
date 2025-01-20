import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import FilterByDate from "./Datefitler";

function FilterComponent({ genres }) {
  const [isDeleted, setIsDeleted] = useState(false);
  // const [showMoreGenres, setShowMoreGenres] = useState(false);

  // Gestion de l'état pour supprimer le composant
  const handleDeleteFilterComponent = () => {
    setIsDeleted(true);
  };

  // Afficher les genres supplémentaires
  // const handleShowMoreGenres = () => {
  //   setShowMoreGenres(true);
  //   console.log("list of genrs " , [...genres])
  // };

  // Composant pour afficher les genres principaux
  const GenreList = () => (
    <div className="GenreListContainer">
      {genres
      .map((genre) => (
        <button key={genre.id} className="btnGenre">
          {genre.name}
        </button>
      ))}
  
    </div>
  );

  // Composant pour afficher les genres supplémentaires
  // const MoreGenreList = () => {
  //   const restGenres = genres.slice(5,20);
  //   return (
        
  //   <div className="listofGenreContainre">
  //       <div className="otherGenrsTitle">
  //           <h5>other genres</h5>
  //       </div>
  //     <select
  //       className="SelectListGenre"
  //       name="SelectGenreFilm"
  //       id="selectFilmGenre"
  //     >
  //       {restGenres.map((genre) => (
  //         <option key={genre.id}>{genre.name}</option>
  //       ))}
  //     </select></div>
  //   );
  // };

  return (
    <>
      {!isDeleted && (
        <section className="filterComponentContainer">
          <div className="deleteIcon">
            <button
              className="Btn-Deleted"
              onClick={handleDeleteFilterComponent}
            >
              <FaTimes />
            </button>
          </div>
          <div className="titleContainer">
            <h4 className="GenderTitle">Genre</h4>
          </div>
          <div className="listofGenres">
            <GenreList />
          </div>
          {/* Date of publication */}
          <div className="dateFilterContainer">
            <h4 className="DateTitle">date of publication</h4>
            <FilterByDate />
          </div>

        </section>
      )}
    </>
  );
}

export default FilterComponent;
