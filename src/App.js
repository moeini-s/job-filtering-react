import { HashRouter, Switch, Route ,Redirect} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import JobList from "./pages/JobList";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import jwt  from "jsonwebtoken";
import UserContext from "./context/userContext";

const App = () => {
    const [user,setUser]=useState(null);
    const clearuser=()=>{
        setUser(null);
    }
    const adduser=(user)=>{
        setUser(user);
    }
    useEffect(() => {
        console.log("App mount");
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken=jwt.decode(token, { complete:true});
            const {firstname, lastname, username, exp}=decodedToken.payload;
            const dateNow = Date.now() / 1000;
            if (exp < dateNow) {
                localStorage.removeItem("token");
                clearuser();
            } 
            else{
                adduser({username,firstname,lastname,exp})
            } 
        }
    }, []);
    console.log("App render!");
    return ( 
        <UserContext.Provider value={{user,clearuser,adduser}}>
        <HashRouter>
            <ToastContainer/>
            <Switch>
                <Route path="/profile">
                    <ProfileLayout>
                        <Route exact path="/profile" render={()=>user!=null ? <Profile/> : <Redirect to="/" />}/>
                    </ProfileLayout>
                </Route>
                <Route path="/">
                    <MainLayout>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/jobs" component={JobList} />
                            <Route exact path="/" component={Home} />
                            <Route exact path="/job/:id" component={JobDetail}></Route>
                        </Switch>
                    </MainLayout>
                </Route>
            </Switch>
        </HashRouter>
        </UserContext.Provider>
    );
}
 
export default App;