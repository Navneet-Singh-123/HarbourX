import React,{useState} from "react";
import "../../resources/css/index.css";

export default function Login() {
   
    const [log,setlog] = useState({email:"",password:""});

    function handleChange(event){
        const {name,value}=event.target;
        setlog(prev=>{
          return{
             ...prev,
             [name] : value,
          };
        })
      }

      function submitlogin(event){
        setlog({email:"",password:""});
        event.preventDefault();
     }

    return (
      <div className="auth-back">
      <div className="auth">
        <h1>Login</h1>
        <form className="login-form">
          <div>
          <input onChange={handleChange} name="email" value={log.email} placeholder="Email"></input>
          </div>
          <div>
          <input onChange={handleChange} name="password" value={log.password} placeholder="Password"></input> 
          </div>
          <div >
          <button className="form-butt" onClick={submitlogin}>Login</button>
          </div>
        </form>
      </div>
      </div>
    )
  }
  
 