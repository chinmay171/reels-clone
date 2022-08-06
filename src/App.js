import './App.css';
import Feed from "./components/Feed"
import Login from "./components/Login"
import PageNotFound from "./components/PageNotFound"
import Profile from "./components/Profile"
import Signup from "./components/Signup"
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {AuthContext, AuthContextProvider} from "./context/authContext";
import { Component, useContext } from 'react';
import Forget from './components/Forget';
function App() {
  return (
    <AuthContextProvider>
    <BrowserRouter>
    <Switch>
      
      <Route path="/forget"><Forget/></Route>

      <PrivateRoute path="/feed" comp={Feed}></PrivateRoute>

      <RedirectToFeed path="/login" comp={Login}></RedirectToFeed>
      <RedirectToFeed path="/signup" comp={Signup}></RedirectToFeed>
      
      <PrivateRoute path="/profile" comp={Profile}></PrivateRoute>
      <Route>
       <PageNotFound></PageNotFound>
      </Route>
    </Switch>
    </BrowserRouter>
    </AuthContextProvider>
  );
}

function PrivateRoute(props){
  let Component = props.comp;
  let cUser = useContext(AuthContext);
  return(
    <Route
    {...props}
    render={
      (props)=>{
        return cUser!=null ? <Component {...props}></Component> : <Redirect {...props} to="/login"></Redirect>
      }
    }
    ></Route>
  )
}

function RedirectToFeed(props){
  let Component = props.comp;
  let cUser = useContext(AuthContext);
  return(
    <Route
    {...props}
    render={
      (props)=>{
        return cUser != null ? <Redirect {...props} to="/feed"></Redirect>:
        <Component {...props}></Component>
      }
    }></Route>
  )
}

export default App;
