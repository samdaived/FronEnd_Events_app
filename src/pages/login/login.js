import React,{useState} from 'react';
import './login.css';
import * as queries from '../../queries/queries';
import {storeAuth} from '../../helpers/stroeAuth';
import {withRouter} from 'react-router-dom';
import {notEmpty} from '../../helpers/validator';


const Login=(props)=>{
    const [email,emailEditor]=useState("");
    const [password,passwordEditor]=useState("");

    const ChangeHandler=(e,v)=>{
        e.preventDefault();
        v==="email"&&emailEditor(e.target.value);
        v==="password"&&passwordEditor(e.target.value);
    };
    
    const signup=()=>{
        if(notEmpty(email)&& notEmpty(password)){
            return queries.apolloFetch({query:queries.signup(email,password,["userId,token,expiredIn"])})
            .then(res=>{
                storeAuth(res,"createUser");
                props.authHandler(localStorage.getItem('expiredIn'));
                return props.history.push("/")
            })
            .catch(er=>console.log(er))
         }
    };
    
    const login=()=>{
        if(notEmpty(email)&& notEmpty(password)){
            return queries.apolloFetch({query:queries.login(email,password,["userId,token,expiredIn"])})
            .then(res=>{
                storeAuth(res,"login");
                props.authHandler(localStorage.getItem('expiredIn'));
                return props.history.push("/")
            })
            .catch(er=>console.log(er))
        }
    };

    return <form className="login_form" onSubmit={ChangeHandler}>
            <div >
                <label>Email address</label>
                <input type="email" autoComplete="off" required value={email} onChange={(v)=>ChangeHandler(v,"email")}/>
                <small>We'll never share your email with anyone else.</small>
            </div>

            <div >
                <label>Password</label>
                <input type="password" value={password} required minLength="6" onChange={(v)=>ChangeHandler(v,"password")}/>
                <small>6 digits min</small>
            </div>
            <div className="btn_div">
                <button type="submit" className="btn" onClick={()=>login()}>login</button>
                <button type="submit" className="btn" onClick={()=>signup()}>Sign up</button>
            </div>            
        </form>
}

export default withRouter(Login);