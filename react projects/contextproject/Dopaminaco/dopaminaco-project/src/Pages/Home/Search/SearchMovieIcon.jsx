// import { useState } from "react";
import {FaSearch} from "react-icons/fa";
function SearchMovie({onClick}){
    // const [searchedValue, setsearchedValue]= useState("");
    // const handlerSearch = (e) =>{
    //     const newValue= e.target.value
    //     setsearchedValue(newValue)
    //     onChange(newValue)
    // }
    // const SearchResult = ()=>{
    //     return(<p>{searchedValue}</p>)
    // }
    return(
        <>
        <div className="Input-search">
            <button className="input-searchIcon" onClick={()=>onClick()}><FaSearch style={{color: "#525252",fontWeight : "200"} }  className="iconSearch"/></button>
        </div>
        </>
    )
}
export default SearchMovie