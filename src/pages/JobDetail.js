import axios from "axios";
import { useEffect, useState } from "react";

const JobDetail = (props) => {
    const {id} = props.match.params;
    const [job,setjob]= useState({});
    const [err,seterr]=useState("");
    const [loading,setloading]=useState(false);
    
    useEffect(()=>{
        setloading(true);
        axios.get(`https://fakejobapi.herokuapp.com/jobs?id=${id}`).then(res=>{
            setloading(false);
            setjob(res.data[0]);
        }).catch(err=>{
            setloading(false);
            seterr(err.message);
        });
    },[]);
    return (
        <div className="jobDetail">
            {loading? <div className="loader"><div className="loader__body"></div></div>
            :
            err!==""? <div>{err}</div>
            :
            <div className="jobDetail__body">
                <div className="jobDetail__body--title">{job.title}</div>
                <div className="jobDetail__body--propery">
                    <b>Category</b>
                    <span>{job.category}</span>
                </div>
                <div className="jobDetail__body--propery">
                    <b>Schedule</b>
                    <span>{job.schedule}</span>
                </div>
                <div className="jobDetail__body--propery">
                    <b>Location</b>
                    <span>{job.location}</span>
                </div>
                <div className="jobDetail__body--propery">
                    <b>experience</b>
                    <span>{job.experience}</span>
                </div>
                <div className="jobDetail__body--propery">
                    <b>Salary</b>
                    <span>{job.salary}</span>
                </div>
                <div className="jobDetail__body--propery">
                    <b>Remote</b>
                    <span>{job.remote}</span>
                </div>
                <div className="jobDetail__body--description">
                    <b>Description</b>
                    <span>{job.description}</span>
                </div>
            </div>
            }

        </div>
    );
}
 
export default JobDetail;