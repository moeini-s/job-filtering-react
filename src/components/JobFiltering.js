import produce from "immer";
import { useState } from "react";
import { withRouter } from "react-router";
import InputRange from "react-input-range";
import 'react-input-range/lib/css/index.css';

const JobFiltering = (props) => {
    {/* Query Parameters in url------------------------------------ */}
    const paramsString=props.location.search;
    const searchParams=new URLSearchParams(paramsString);
    let category=searchParams.getAll("category_like");
    let location=searchParams.getAll("location_like");
    let keyword=searchParams.getAll("q");
    let experience=searchParams.getAll("experience_like");
    let remote=searchParams.get("remote_like") || false;;
    let schedule=searchParams.getAll("schedule_like");
    let minSalary=searchParams.get("salary_gte") || 0;
    let maxSalary=searchParams.get("salary_lte") || 20000000;

    const [filters,setFilters]=useState({
        experience:{
            "Senior":experience.indexOf("Senior")>-1? true : false,
            "Mid-Level":experience.indexOf("Mid-Level")>-1? true : false,
            "Junior":experience.indexOf("Junior")>-1? true : false
        },
        schedule:{
            "Full-Time":schedule.indexOf("Full-Time")>-1? true : false,
            "Part-Time":schedule.indexOf("Part-Time")>-1? true : false,
            "Flexible Schedule":schedule.indexOf("Flexible Schedule")>-1? true : false,
        },
        //remote:{"Yes":false,"No":true},
        remote:remote,
        salary:{
            min:minSalary==null? 0 : parseInt(minSalary),
            max:maxSalary==null? 20000000 : parseInt(maxSalary)
        },
    });
    
    const handleFiltering=(filters,e)=>{
        console.log("*********");
        e.preventDefault();
        let filterUrl="";
        for (let key in filters) {
            if(key=="remote"){
                if(filters[key]){
                    filterUrl+="&remote_like=Yes";
                }
            }
            else{
                // key="Experience"
                for (let k in filters[key]) {
                    // filters[key]={"Senior":false,"Mid-Level":false,"Junior":false} , k="Senior" , filters[key][k]=false
                    if(key=="salary"){
                        if(k=="min"){
                            filterUrl+=`&${key}_gte=${filters[key][k]}`;
                        }
                        if(k=="max"){
                            filterUrl+=`&${key}_lte=${filters[key][k]}`;
                        }
                    }
                    else{
                        if (filters[key][k]==true) {
                            filterUrl+=`&${key}_like=${k}`;
                        }
                    }
                    
                }
            } 
        }
        props.history.replace(`/jobs?location_like=${location}&category_like=${category}&q=${keyword}${filterUrl}`);
    }
    
    const handleChange=(group,e) =>{
        const name=e.target.name;
        if(e.target.checked == true){
            var newState = produce(filters, draft => {
                draft[group][[name]]=true;
            });
            setFilters(newState);
            handleFiltering(newState,e);
        }else{
            var newState = produce(filters, draft => {
                draft[group][[name]]=false;
            });
            setFilters(newState);
            handleFiltering(newState,e);
       }
       
    }
    const handleRadio=(e) =>{
        var newState;
        if(e.target.checked == true){
            newState = produce(filters, draft => {
                draft["remote"]=true;
            });
        }
        else{
            newState = produce(filters, draft => {
                draft["remote"]=false;
            });
        }
        setFilters(newState);   
        handleFiltering(newState,e);
        
    }
    const handleSalary = (salary) => {
        var newState = produce(filters, draft => {
            draft["salary"]=salary;
        });
        setFilters(newState);
    }

    return ( 
        <div className="JobFiltering">
            <div className="JobFiltering__filter">
                <div className="JobFiltering__filter--title">Experience:</div>
                <label>Senior</label>
                <input name="Senior" type="checkbox" onChange={(e)=>handleChange("experience",e)} checked={filters["experience"]["Senior"]}/><br/>
                <label>Mid-Level</label>
                <input name="Mid-Level" type="checkbox" onChange={(e)=>handleChange("experience",e)} checked={filters["experience"]["Mid-Level"]} /><br/>
                <label>Junior</label>
                <input name="Junior" type="checkbox" onChange={(e)=>handleChange("experience",e)} checked={filters["experience"]["Junior"]} />
            </div>

            <div className="JobFiltering__filter">
                <div className="JobFiltering__filter--title">Schedule:</div>
                <label>Full-Time</label>
                <input name="Full-Time" type="checkbox" onChange={(e)=>handleChange("schedule",e)} checked={filters["schedule"]["Full-Time"]}/><br/>
                <label>Part-Time</label>
                <input name="Part-Time" type="checkbox" onChange={(e)=>handleChange("schedule",e)} checked={filters["schedule"]["Part-Time"]} /><br/>
                <label>Flexible Schedule</label>
                <input name="Flexible Schedule" type="checkbox" onChange={(e)=>handleChange("schedule",e)} checked={filters["schedule"]["Flexible Schedule"]} />
            </div>

            <div className="JobFiltering__filter">
                <div className="JobFiltering__filter--title">Remote:</div>
                <label className="switch">
                <input type="checkbox" checked={filters["remote"]} onChange={handleRadio}/>
                <span className="slider round"></span>
                </label>
            </div>

            <div className="JobFiltering__filter">
                <div className="JobFiltering__filter--title">Salary:</div>
                <InputRange maxValue={20000000} minValue={0} value={filters["salary"]} onChange={handleSalary} /> 
                <button onClick={(e)=>handleFiltering(filters,e)}>Filter Salary</button>
            </div>

        </div>
    );
}
 
export default withRouter(JobFiltering);