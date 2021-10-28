import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { withRouter } from "react-router";
import SearchDropDown from "./SearchDropDown";

const JobSearh = (props) => {
    {/* Query Parameters in url------------------------------------ */}
    const paramsString=props.location.search;
    const searchParams=new URLSearchParams(paramsString);
    let category=searchParams.getAll("category_like");
    let location=searchParams.getAll("location_like");
    let keyword=searchParams.getAll("q");
    let experience=searchParams.getAll("experience_like");
    let remote=searchParams.getAll("remote_like");
    let schedule=searchParams.getAll("schedule_like");
    let minSalary=searchParams.get("salary_gte") || 0;
    let maxSalary=searchParams.get("salary_lte") || 20000000;

    // category------------------------------------------------------
    const [selectedCategory,setselectedCategory]=useState(category);
    const allCategory=["all","Computer-IT","Writing","Graphic Design","Marketing","Accounting & Finance",
    "Medical & Health","Translation","Education & Teaching","Art & Creative"];

    // location------------------------------------------------------
    const [selectedLocation,setselectedLocation]=useState(location);
    const allLocation=["all","Fars","Esfahan","Tehran","Yazd","Kerman","Gom","Ilam","Khorasan",
    "Boushehr","Alborz","Hamedan","Markazi","Golestan","Kermanshah","Semnan","Zanjan"];

    // keyword------------------------------------------------------
    const [selectedkeyword,setselectedkeyword]=useState(keyword);

    const creatUrl=(name,group)=>{
        var url="";
        group.forEach(val => {
            if(val=="all"){
                url="";
            }
            else{
                url+=`&${name}=${val}`;
            } 
        });
        return url;
    }

    const handleFiltering=(selectedLocation_,selectedCategory_,selectedkeyword_,e)=>{
        e.preventDefault();
        var filterUrl="";
        filterUrl=creatUrl("remote_like",remote)+filterUrl;
        filterUrl=creatUrl("schedule_like",schedule)+filterUrl;
        filterUrl=creatUrl("experience_like",experience)+filterUrl;
        filterUrl=creatUrl("location_like",[selectedLocation_])+filterUrl;
        filterUrl=creatUrl("category_like",[selectedCategory_])+filterUrl;
        filterUrl=creatUrl("q",[selectedkeyword_])+filterUrl;
        filterUrl=`salary_gte=${minSalary}&salary_lte=${maxSalary}`+filterUrl;
        props.history.replace(`/jobs?${filterUrl}`)
    }

    return (  
        <div className="jobSearch">
            <form className="jobSearch__form" 
            onSubmit={(e)=>handleFiltering(selectedLocation,selectedCategory,selectedkeyword,e)}>
                {/* job Keyword---------------------------------------------*/}
                <div className="jobSearch__form--input">
                    <FontAwesomeIcon icon={faSearch} className="fa"/>
                    <input type="text" placeholder="search job title, keyword, etc."
                    onChange={(e)=>setselectedkeyword(e.target.value)} value={selectedkeyword}/>
                </div>
                
                <div className="jobSearch__form--input">
                    <FontAwesomeIcon icon={faSearch} className="fa"/>
                    <SearchDropDown handleSelect={(val)=>setselectedCategory(val)} allList={allCategory} name="Category" val={selectedCategory}/>
                </div>
                <div className="jobSearch__form--input">
                    <FontAwesomeIcon icon={faSearch} className="fa"/>
                    <SearchDropDown handleSelect={(val)=>setselectedLocation(val)} allList={allLocation} name="Location" val={selectedLocation}/>
                </div>

                <input type="submit" value="search" />
            </form>
        </div>
    );
}
export default withRouter(JobSearh);