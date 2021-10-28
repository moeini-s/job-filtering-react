import axios from "axios";

import SearchDropDown from "./SearchDropDown";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const EditJob = ({job,handleClose}) => {
    const [jobValue,setjobValue]=useState(job);
    const token=localStorage.getItem("token");
    
    // category------------------------------------------------------
    const allCategory=["Computer-IT","Writing","Graphic Design","Marketing","Accounting & Finance",
    "Medical & Health","Translation","Education & Teaching","Art & Creative"];

    // location------------------------------------------------------
    const allLocation=["Fars","Esfahan","Tehran","Yazd","Kerman","Gom","Ilam","Khorasan",
    "Boushehr","Alborz","Hamedan","Markazi","Golestan","Kermanshah","Semnan","Zanjan"];

    const editJob =(id,e)=>{
        e.preventDefault();
        if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.put(`https://fakejobapi.herokuapp.com/jobs/${id}`,jobValue)
        .then(res=>{
            toast.success("Job edit successfully!");
            setTimeout(()=>window.location.reload(),2000);
        }
        )
        .catch(err=>toast.error(err.message));
    }
    return (  
        <div className="editJob">
            <form>
                <span onClick={handleClose} className="closeBtn">&times;</span>
                <label>Title:</label>
                <input type="text" value={jobValue.title}
                onChange={(e)=>{setjobValue({...jobValue,"title":e.target.value})}} />

                <label>Category:</label>
                <SearchDropDown handleSelect={(val)=>setjobValue({...jobValue,"category":val})} allList={allCategory} name="Category" val={jobValue["category"]}/>
                <br/>
                <label>Location:</label>
                <SearchDropDown handleSelect={(val)=>setjobValue({...jobValue,"location":val})} allList={allLocation} name="Location" val={jobValue["location"]}/>
                <br/>

                <label>Description:</label>
                <textarea  rows="5" value={jobValue.description}
                onChange={(e)=>{setjobValue({...jobValue,"description":e.target.value})}}>
                </textarea>

                <label>Experience:</label>
                <select onChange={(e)=>{setjobValue({...jobValue,"experience":e.target.value})}} value={jobValue.experience}>
                    <option value="Senior">Senior</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Junior">Junior</option>
                </select>

                <label>Schedule:</label>
                <select onChange={(e)=>{setjobValue({...jobValue,"schedule":e.target.value})}} value={jobValue.schedule}>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Flexible Schedule">Flexible Schedule</option>
                    <option value="Part-Time">Part-Time</option>
                </select>

                <label>Remote:  { } </label>
                <br/>
                <label>Yes</label>
                <input type="radio" name="remote" value="Yes" onChange={(e)=>{setjobValue({...jobValue,"remote":e.target.value})}} checked={jobValue.remote=="Yes"&& true}/>
                <label>No</label>
                <input type="radio" name="remote" value="No" onChange={(e)=>{setjobValue({...jobValue,"remote":e.target.value})}} checked={jobValue.remote=="No"&& true}/>
                <br/><br/>

                <label>Salary:</label>
                <input type="number" onChange={(e)=>{setjobValue({...jobValue,"salary":parseInt(e.target.value)})}} value={jobValue.salary}/>
                
                <input type="submit" value="Edit" onClick={(e)=>editJob(job.id,e)}/>

            </form>
        </div>
    );
}
 
export default EditJob;