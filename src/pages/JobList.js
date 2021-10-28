import Jobs from "../components/Jobs";
import axios from "axios";
import { useEffect, useState } from "react";
import JobFiltering from "../components/JobFiltering";

const JobList = (props) => {
    {/* Query Parameters in url------------------------------------ */}
    const paramsString=props.location.search;
    const[loading,setloading]=useState(false);
    const [jobs,setjobs]=useState([]);
    const[error,setError]=useState("");

    useEffect(()=>{
        const url=`https://fakejobapi.herokuapp.com/jobs${paramsString}`;
        setloading(true);
        axios.get(url)
        .then(res=>{
            setjobs(res.data);
            setloading(false);
        })
        .catch(err=>{
            setError(err.message);
            setloading(false);
        })

    },[JSON.stringify(paramsString)]);
    return ( 
        <>
            <div className="jobList">
                <JobFiltering/>
                {            
                loading? <div className="loader"><div className="loader__body"></div></div>
                :
                error? <div className="error">{error}</div>
                :
                <Jobs jobs={jobs}/>
                }
                
            </div>
        </>
    );
}
 
export default JobList;