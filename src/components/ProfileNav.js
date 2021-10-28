import { useContext } from "react";
import { Link , withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/userContext";

const ProfileNav = ({history}) => {
    const clearuser=useContext(UserContext).clearuser;
    const logout = () => {
        localStorage.removeItem("token");
        clearuser();
        toast.success("user logout successfully!");
        setTimeout(history.push("/"),2000);
    }
    return ( 
        <div className="profileNav">
            <div className="profileNav__body">
                <Link to="/" className="profileNav__body--link">Home</Link>
                <Link to="/jobs" className="profileNav__body--link">jobs</Link>
                <span onClick={logout} className="profileNav__body--link">Logout</span>
                <span className="profileNav__body--profile">User Profile</span>
            </div>
        </div>
    );
}
 
export default withRouter(ProfileNav);