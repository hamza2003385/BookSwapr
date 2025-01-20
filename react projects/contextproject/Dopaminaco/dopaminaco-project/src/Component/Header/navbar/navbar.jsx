import { Link, useLocation } from "react-router-dom";
import "../../../Style/headerStyle/Navbar.css";
import "../../../Style/headerStyle/header.css";
function NavBar(){
    const acutalWindow = useLocation();
    const isActive= (path)=>{
        return path === acutalWindow.pathname ? "ActivePage" : ""
    }
    return(
        <>
        <nav className="navBarHome">
            <ul className="navBarLinks">
                <li className="link">
                    <Link to="/home/New" className={`link-${isActive("/home/New")}`} >New</Link>
                </li>
                <li className="link">
                    <Link to="/home/Series" className={`link-${isActive("/home/Series")}`}>Series</Link>
                </li>
                <li className="link">
                    <Link to="/home/Movies" className={`link-${isActive("/home/Movies")}`}>Movies</Link>
                </li>
                <li className="link">
                    <Link to="/home/tvShows" className={`link-${isActive("/home/tvShows")}`}>tv shows</Link>
                </li>
                <li className="link">
                    <Link to="/home/Animes" className={`link-${isActive("/home/Animes")}`}>Animes</Link>
                </li>

            </ul>

        </nav>
        </>
    )
}
export default NavBar;