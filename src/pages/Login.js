import axios from "axios";
import jwt  from "jsonwebtoken";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "../context/userContext";

const Login = ({history}) => {
    const {user,adduser}=useContext(UserContext);
    const[tab,settab]=useState("login");
    const[loading,setloading]=useState(false);
    const[username,setusername]=useState("");
    const[password,setpassword]=useState("");

    const [registerInfo,setRegisterInfo]=useState({});
    const [passwordError,setPasswordError]=useState("");

    if(user!==null){
        setTimeout(()=>history.replace("/"),1000);
    }
    
    const handleLogin= (e)=>{
        e.preventDefault();
        setloading(true);
        axios.post("https://fakejobapi.herokuapp.com/auth/login",{username,password})
        .then(res=>{
            let token=res.data.access_token;
            localStorage.setItem("token", token);
            adduser(jwt.decode(token, { complete:true}).payload);
            toast.success("User login successfuly!");
            setloading(false);
        })
        .catch(res=>{
            toast.error(`${res.message} username or password is incorrect!`);
            setloading(false);
        })
    }
    const handleRegister=(e)=>{
        console.log(registerInfo);
        e.preventDefault();
        if(passwordError==""){
            setloading(true);
            axios.post("https://fakejobapi.herokuapp.com/auth/register",registerInfo)
            .then(res=>{
                toast.success("User Registered successfuly!");
                setloading(false);
            })
            .catch(err=>{
                toast.error(`${err} `);
                setloading(false);
            })
        }
        
    }
    
    const checkPassword=(e)=>{
        setRegisterInfo({...registerInfo,"password":e.target.value});
        const letter = /[a-zA-Z]/;
        const psw=e.target.value;
        console.log(psw.length);
        if(letter.test(psw) && psw.length>5){
            setPasswordError("");
        }
        else{
            if(!letter.test(psw)){
                console.log("Password should containing letter!");
                setPasswordError("Password should containing letter!");
            }
            if(psw.length<6){
                console.log("6 characters!");
                setPasswordError("Password should be at least 6 characters!");
            }
        }
    }

    return ( 
        <div className="loginRegister">
            {loading && <div className="loader"><div className="loader__body"></div></div>}
            <div className="loginRegister__tabs">
                <span className={tab=='login'? 'loginRegister__tabs--tab active' : 'loginRegister__tabs--tab'}
                onClick={()=>settab("login")}>Login</span>
                <span className={tab=='register'? 'loginRegister__tabs--tab active' : 'loginRegister__tabs--tab'}
                onClick={()=>settab("register")}>Register</span>
            </div>
            {tab=="login"?

            <form onSubmit={handleLogin} className="loginRegister__form">
                <label>UserName:</label>
                <input type="text" onChange={(e)=>setusername(e.target.value)} value={username} required/>
                <label>Password:</label>
                <input type="password" onChange={(e)=>setpassword(e.target.value)} value={password} required/>               
                <input type="submit" value="Login"/>
            </form>
            :
            <form onSubmit={handleRegister} className="loginRegister__form">
                <label>FirstName:</label>
                <input type="text" onChange={(e)=>setRegisterInfo({...registerInfo,"firstname":e.target.value})} required/>
                
                <label>LastName:</label>
                <input type="text" onChange={(e)=>setRegisterInfo({...registerInfo,"lastname":e.target.value})} required/>

                <label>UserName:</label>
                <input type="text" onChange={(e)=>setRegisterInfo({...registerInfo,"username":e.target.value})} required/>
                
                <label>Password:</label><span className="error">{passwordError}</span>

                <input type="password" onChange={checkPassword} required/>               
               
                <input type="submit" value="Register"/>
            </form>
            }
            
        </div>
    );
}
 
export default Login;