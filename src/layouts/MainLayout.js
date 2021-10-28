import { withRouter } from "react-router";
import JobSearch from "../components/JobSearch";
import Navbar from "../components/Navbar";
const MainLayout = (props) => { 
    return ( 
        <>
        <Navbar/>
        <JobSearch/>
        {props.children}
        </>
    );
}
 
export default withRouter(MainLayout);