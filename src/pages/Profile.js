import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import UserContext from "../context/userContext";


const Profile = () => {
    const {user}=useContext(UserContext);
    return ( 
        <div className="profile">
        {
            user==null? <div className="loader"><div className="loader__body"></div></div>
            :
            <div className="profile__body">
                <FontAwesomeIcon icon={faUser} className="fa"/>
                <div>
                    <b>First Name:</b> {user.firstname} <br/><br/>
                    <b>Last Name:</b> {user.lastname} 
                </div>
                
            </div>
        }
        </div>
    );
}
 
export default Profile;