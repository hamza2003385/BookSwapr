import { FaRegEnvelope,FaRegHeart, FaList,FaCog,FaSignOutAlt as FaSignOutlineOutline} from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import "../../Style/headerStyle/header.css"
import { FaHouse, FaTableCellsLarge } from "react-icons/fa6"
function Header(){
    // add  a special style for current widonw
    const location =useLocation();
   
    const iSactualPath= (path)=> location.pathname === path ? "ActivePage" : "Link"
//  const styleHeader = `link-${iSactualPath(`/home/New`)}` ||
//                     `link-${iSactualPath(`home`)}`||
//                     `link-${iSactualPath(`/home/Series`)}`||
//                     `link-${iSactualPath(`/home/Movies`)}` ||
//                     `link-${iSactualPath(`/home/tvShows`)}`||
//                     `link-${iSactualPath(`/home/Animes`)}` ?"ActivePage" : "Link"
    return(
        <>
        <div className="ContainerHeader">
            <div className="Logo">
                <h2 className="LogoText"><span className="FirstLetter">D</span>opaminaco</h2>
            </div>
            <nav className="navBar">
                <div className="HomeLink">
                    
                    <Link to="/home" className={`link-${iSactualPath(`/home`)}`}>
                        <span className="iconLink"><FaHouse /></span>
                        <span className="HomeText">Home</span>
                    </Link>
                </div>
                <div className="HomeLink">
                    <Link to="/Categories" className={`link-${iSactualPath("/Categories")}`}>
                        <span className="iconLink">  <FaTableCellsLarge/></span>
                        <span className="HomeText">Categories </span>
                    </Link>
                </div>
                <div className="HomeLink">
                    <Link to="/WachList" className={`link-${iSactualPath("/WachList")}`}>
                        <span className="iconLink">  <FaList/></span>
                        <span className="HomeText">Wach List</span>
                    </Link>
                </div>
                <div className="HomeLink">
                    <Link to="/favorites" className={`link-${iSactualPath("/favorites")}`}>
                        <span className="iconLink">  <FaRegHeart/></span>
                        <span className="HomeText">Favorites</span>
                    </Link>
                </div>
                <div className="HomeLink">
                    <Link to="/contactUs" className={`link-${iSactualPath("/contactUs")}`}>
                        <span className="iconLink">  <FaRegEnvelope/></span>
                        <span className="HomeText">Contact Us</span>
                    </Link>
                </div>
                <div className="suppLinks">
                    <div className="HomeLink">
                        <Link to="/settings" className={`link-${iSactualPath("/settings")}`}>
                        <span className="iconLink"> < FaCog/></span>
                        <span className="HomeText">Settings</span>
                        </Link>
                    </div>
                    <div className="HomeLink">
                        <Link to="/" className="link-Link">
                        <span className="iconLink"> <FaSignOutlineOutline /></span>
                        <span className="HomeText">Log Out</span>
                        </Link>
                    </div>
                    </div>

            </nav>
        </div>
        </>
    )
}
export default Header