import React,{useState} from 'react';
import './login.css';
import * as queries from '../../queries/queries';


const Login=()=>{
    const [email,emailEditor]=useState("");
    const [password,passwordEditor]=useState("");

    const ChangeHandler=(e,v)=>{
        v==="email"&&emailEditor(e.target.value);
        v==="password"&&passwordEditor(e.target.value);
    };
    
    const signup=()=>{
        if(email.trim().length!==0&&password.trim().length>=0)
        return queries.apolloFetch({query:queries.signup(email,password,["userId,token,expiredIn"])})
        .then(res=>console.log(res.data))
    };
    
    const login=()=>{
        if(email.trim().length!==0&&password.trim().length>=0)
        return queries.apolloFetch({query:queries.login(email,password,["userId,token,expiredIn"])})
        .then(res=>console.log(res.data.login.token))
    };

    return <form className="login_form">
            <div >
                <label>Email address</label>
                <input type="email" autoComplete="off" value={email} onChange={(v)=>ChangeHandler(v,"email")}/>
                <small>We'll never share your email with anyone else.</small>
            </div>

            <div >
                <label>Password</label>
                <input type="password" value={password} onChange={(v)=>ChangeHandler(v,"password")}/>
                <small>6 digits min</small>
            </div>
            <div className="btn_div">
                <button type="button" className="btn" onClick={()=>login()}>login</button>
                <button type="button" className="btn" onClick={()=>signup()}>Sign up</button>
            </div>            
        </form>

    
}

export default Login;