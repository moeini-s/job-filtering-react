import { useState } from "react/cjs/react.development";

const SearchDropDown = ({allList,name,val,handleSelect}) => {
    const [dropdown,setdropdown]=useState(false);
    const [filteredList,setfilteredList]=useState([...allList]);

    const select=(e)=>{
        setdropdown(false);
        setfilteredList([...allList]);
        handleSelect(e.currentTarget.textContent);
    }
    const search=(e)=>{
        const inputval=e.target.value.toLowerCase();
        let filters=allList.filter(loc=>loc.toLowerCase().indexOf(inputval)>-1);
        setfilteredList(filters);
    }
    return (
        <div className="searchDropDown">
            <span className="searchDropDown__title" onClick={()=>setdropdown(!dropdown)}>{name} { } {val}</span>
            {dropdown?
            <div className="searchDropDown__dropdown">
                <input onChange={search} placeholder="search"/>
                {filteredList.map((opt,i)=>
                <div className="searchDropDown__dropdown--filter" key={i} onClick={select}>{opt}</div>
                )}
            </div>
            :
            null
            } 
        </div>
    );
}
 
export default SearchDropDown;