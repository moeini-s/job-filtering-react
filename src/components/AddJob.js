import axios from "axios";
import { useState } from "react/cjs/react.development";
import SearchDropDown from "./SearchDropDown";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddJob = ({handleClose}) => {
    const token=localStorage.getItem("token");
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const today = year + "/" + month + "/" + day;
    const [jobValue,setjobValue]=useState({"date":today});
    const [jobError,setjobError]=useState({});
    // category------------------------------------------------------
    const allCategory=["Computer-IT","Writing","Graphic Design","Marketing","Accounting & Finance",
    "Medical & Health","Translation","Education & Teaching","Art & Creative"];

    // location------------------------------------------------------
    const allLocation=["Fars","Esfahan","Tehran","Yazd","Kerman","Gom","Ilam","Khorasan",
    "Boushehr","Alborz","Hamedan","Markazi","Golestan","Kermanshah","Semnan","Zanjan"];
    const objFields=["title","description","category","schedule","location","salary","experience","remote"];

    const addJob =(e)=>{
        e.preventDefault();
        if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        var flag=true;
        var error={};
        objFields.forEach(item=>{
            if(!jobValue[item]){
                error={...error,[item]:`${item} require`};
                flag=false;
            }
            else{
                error={...error,[item]:null};
            }
        });

        flag?
        axios.post(`https://fakejobapi.herokuapp.com/jobs/`,jobValue)
        .then(res=>{
            toast.success("Job added successfully!");
            setTimeout(()=>window.location.reload(),2000);
        }
        )
        .catch(err=>toast.error(err.message))
        :
        setjobError({...error});
    }
    return (  
        <div className="editJob">
            <form>
                <span onClick={handleClose} className="closeBtn">&times;</span>
                <label>Title:</label> <span className="error">{jobError["title"]}</span>
                <input type="text" onChange={(e)=>{setjobValue({...jobValue,"title":e.target.value})}} />

                <label>Category:</label> <span className="error">{jobError["category"]}</span>
                <SearchDropDown handleSelect={(val)=>setjobValue({...jobValue,"category":val})} allList={allCategory} name="Category" val={jobValue["category"]}/>
                <br/>
                <label>Location:</label>  <span className="error">{jobError["location"]}</span>
                <SearchDropDown handleSelect={(val)=>setjobValue({...jobValue,"location":val})} allList={allLocation} name="Location" val={jobValue["location"]}/>
                <br/>

                <label>Description:</label> <span className="error">{jobError["description"]}</span>
                <textarea  rows="5" onChange={(e)=>{setjobValue({...jobValue,"description":e.target.value})}}>
                </textarea>

                <label>Experience:</label> <span className="error">{jobError["experience"]}</span>
                <select onChange={(e)=>{setjobValue({...jobValue,"experience":e.target.value})}} value="Select experience...">
                    <option value="Select experience..." disabled>Select experience...</option>
                    <option value="Senior">Senior</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Junior">Junior</option>
                </select>

                <label>Schedule:</label> <span className="error">{jobError["schedule"]}</span>
                <select onChange={(e)=>{setjobValue({...jobValue,"schedule":e.target.value})}} value="Select schedule...">
                    <option disabled value="Select schedule...">Select schedule...</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Flexible Schedule">Flexible Schedule</option>
                    <option value="Part-Time">Part-Time</option>
                </select>

                <label>Remote:  { } </label> <span className="error">{jobError["remote"]}</span>
                <br/>
                <label>Yes</label>
                <input type="radio" name="remote" value="Yes" onChange={(e)=>{setjobValue({...jobValue,"remote":e.target.value})}} />
                <label>No</label>
                <input type="radio" name="remote" value="No" onChange={(e)=>{setjobValue({...jobValue,"remote":e.target.value})}} />
                <br/><br/>

                <label>Salary:</label> <span className="error">{jobError["salary"]}</span>
                <input type="number" onChange={(e)=>{setjobValue({...jobValue,"salary":parseInt(e.target.value)})}} />
                
                <input type="submit" value="Add" onClick={(e)=>addJob(e)}/>

            </form>
        </div>
    );
}
 
export default AddJob;