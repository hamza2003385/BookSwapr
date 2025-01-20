import { BiArrowFromRight } from "react-icons/bi"
import { Link } from "react-router-dom"

function BtnReturn(){
   
    return(<>
     <div className="btn-returnContainer" style={{
        position: "absolute" , 
        top: "10vh",
        left: "20vw"
     }}>
      <Link to={"/home/Series"}>
        <button className="btn-return" style={{
            fontSize : "12pt" ,
            display : "flex" ,
            justifyContent : "center" , 
            alignItems : "center" , 
            textAlign : "center" , 
            width : "30px" , 
            height : "30px" , 
            borderRadius : "50%", 
            border : "1px solid #9191918f" ,
            backgroundColor : "white" ,
            color : "#8B5DFF" , 
            fontWeight: "900", 
            cursor : "pointer"
        }}> <BiArrowFromRight /></button>
      </Link>

    </div>
    </>)
}
export default BtnReturn