import { createContext } from "react";

const UserContext =createContext({
    user:{},
    adduser:()=>{},
    clearuser:()=>{},
})
 
export default UserContext;