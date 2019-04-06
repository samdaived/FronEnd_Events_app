import React, {useState,useEffect} from 'react';
import NavBar from './components/naveBar/navBar';
import {Switch,Route} from 'react-router-dom';
import Login from './pages/login/login';
import AllEvent from './pages/allEvent/allevents';
import {restorAuth} from './helpers/stroeAuth';

const App=()=>{
  const [token,tokenEditor]=useState("");
  const [expiredIn,expiredInEditor]=useState("");
  const [userId,userIdEditor]=useState("");

  useEffect(()=>{
    const Auth=restorAuth();
    tokenEditor(Auth.token);
    userIdEditor(Auth.userId);
    expiredInEditor(Auth.expiredIn);

  },[expiredIn]);

    return(
          <React.Fragment>
              {<NavBar signout={expiredInEditor} auth={token}/>}
            <Switch>
              {token?null:<Route path={"/login"} render={()=><Login authHandler={expiredInEditor} />} exact />}
              <Route path={"/"} exact render={()=><AllEvent auth={token}/>} />
            </Switch> 
          </React.Fragment>
          );
}

export default App;
