import { useState } from "react"

// generate years
const generateYears = (startYear) => {
  const yearActual = new Date().getFullYear()
  const years = []
  for (let year = yearActual; year >= startYear; year--) {
    years.push(year)
  }
  return years
}

const FilterByDate = ({ onFilter }) => {
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedType, setSelectedType] = useState("")

  // generate years
  const years = generateYears(1950)

  // onChange event for year
 const handleChangeYear =(e)=>{
  const year = e.target.value 
  setSelectedYear(year)
  onFilter({year, type: selectedType})
  
 }

  // onChange event for type
  const handleChangeType = (e) => {
    const type = e.target.value
    setSelectedType(type)
    onFilter({ year: selectedYear, type })
  }

  return (
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

      <h3>Filtrer par type</h3>
      <select
        value={selectedType}
        onChange={handleChangeType}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <option value="">Sélectionnez un type</option>
        <option value="series">Séries</option>
        <option value="movies">Films</option>
      </select>
    </div>
  )
}

export default FilterByDate