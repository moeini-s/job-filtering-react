import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";

const Navbar = () => {
    const user=useContext(UserContext).user;
    return ( 
        <div className="navbar">
            <div className="navbar__content">
            <Link to="/" className="navbar__content--link">Home</Link>
            <Link to="/jobs" className="navbar__content--link">jobs</Link>
            {
                user!==null?
                <Link to="/profile" className="navbar__content--link">{user.username}</Link>
                :
                <Link to="/login" className="navbar__content--link">Login</Link>
            }
            <span className="navbar__content--logo">Find-Job!</span>
            </div>
            
        </div>

    );
}
 
export default Navbar;