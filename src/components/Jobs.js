import { faMapMarkerAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import EditJob from "./EditJob";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddJob from "./AddJob";
import { useContext } from "react";
import UserContext from "../context/userContext";

const Jobs = ({jobs}) => {
    const [EditDialog,setEditDialog]=useState(false);
    const [AddDialog,setAddDialog]=useState(false);
    const [currentEditJob,setcurrentEditJob]=useState({});
    const context=useContext(UserContext);
    const token=localStorage.getItem("token");

    const deleteJob =(id)=>{
        if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.delete(`https://fakejobapi.herokuapp.com/jobs/${id}`)
        .then(res=>{
            toast.success("Job deleted successfully!");
            setTimeout(()=>window.location.reload(),2000);
        })
        .catch(err=>toast.error(err.message));
    }

    {
    EditDialog?
    document.body.style.overflow = "hidden"
    :
    document.body.style.overflow = "auto"
    }

    return ( 
        
        <div className="jobs">
            {context.user!==null &&
            <button className="jobs__add" onClick={()=>{setAddDialog(true);}}>
                Add Job
            </button>
            }
            <div className="jobs__count">{jobs.length} job positions found!</div>
            {jobs.map((job,i)=>
            <div key={i} className="jobs__job">
                <Link to={`/job/${job.id}`} className="jobs__job--title">{job.title}</Link>
                <div className="jobs__job--category"><b>Category:</b> {job.category}</div>
                <div className="jobs__job--location"><FontAwesomeIcon icon={faMapMarkerAlt} className="fa"/> {job.location}</div>
                <div className="jobs__job--schedule"><b>Schedule:</b> {job.schedule}</div>
                <div className="jobs__job--experience"><b>Experience:</b> {job.experience}</div>
                <div className="jobs__job--remote"><b>Remote:</b> {job.remote}</div>
                <br/>
                {context.user!==null &&
                <>
                    <FontAwesomeIcon icon={faTrash} onClick={()=>deleteJob(job.id)} className="faTrash"/>
                    <span className="jobs__edit" onClick={()=>{setEditDialog(true);setcurrentEditJob(job)}}>
                        Edit
                    </span>
                </>
                }
            </div>
            )}
            {EditDialog && 
            <EditJob handleClose={()=>setEditDialog(false)} job={currentEditJob}/>}

            {AddDialog && 
            <AddJob handleClose={()=>setAddDialog(false)} />}
        </div>
    );
}
export default Jobs;