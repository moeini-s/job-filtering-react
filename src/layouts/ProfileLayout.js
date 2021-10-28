import ProfileNav from "../components/ProfileNav";

const ProfileLayout = (props) => { 
    return ( 
        <>
            <ProfileNav/>
            {props.children}
        </>
    );
}
 
export default ProfileLayout;