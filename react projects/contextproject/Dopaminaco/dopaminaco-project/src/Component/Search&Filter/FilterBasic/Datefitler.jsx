import {  useState } from "react"
// generate years
const generateYears= (startYear)=>{
    const yearActual = new Date().getFullYear()
    const years =[]
    for(let year=yearActual ; year>=startYear ; year--){
        years.push(year)
    }
    return years

}
const FilterByDate= ({onFilter})=>{ 
    const [selectedYear , setSelectedYear] = useState("")
    // generate years 
   const years = generateYears(1950)
   // onChange event for each 
   const handleChangeYear = (e)=>{
    const year = e.target.value
    setSelectedYear(year)
    onFilter(year)
   }
   return(
    <div style={{ margin: "20px 0" }}>
      <h3>Filtrer par année</h3>
      <select
        value={selectedYear}
        onChange={handleChangeYear}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      >
        <option value="">Sélectionnez une année</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}
export default FilterByDate