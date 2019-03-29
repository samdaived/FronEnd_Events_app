import React from 'react';
import NavBar from './components/naveBar/navBar';
import {Switch,Route} from 'react-router-dom';
import Login from './pages/login/login';

const App=()=>{
  
    return(
          <React.Fragment>
            <NavBar/>
          <Switch>
            <Route path={"/login"} render={()=><Login/>} exact />
          </Switch>
          </React.Fragment>
          );
}

export default App;
