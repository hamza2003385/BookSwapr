import React, { forwardRef } from "react";
import "../../../Style/homePageStyle/homePageStyle.css";
import SearchMovie from "./SearchMovieIcon";

// Use React.forwardRef to properly handle the ref
const InputSearch = forwardRef(({ value, onChange = () => {} }, ref) => {
  return (
    <div className="Input">
      <input
        className="Input-Text"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={ref} // Pass the ref
      />
      <SearchMovie onClick={() => console.log("clicked")} />
    </div>
  );
});

export default InputSearch;
