import './App.css';
import Feed from "./components/Feed"
import Login from "./components/Login"
import PageNotFound from "./components/PageNotFound"
import Profile from "./components/Profile"
import Signup from "./components/Signup"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {AuthContextProvider} from "./context/authContext";
function App() {
  return (
    <AuthContextProvider>
    <BrowserRouter>
    <Switch>
      <Route path="/feed">
       <Feed></Feed>
      </Route>
      <Route path="/login">
       <Login></Login>
      </Route>
      <Route path="/signup">
       <Signup></Signup>
      </Route>
      <Route path="/profile">
       <Profile></Profile>
      </Route>
      <Route>
       <PageNotFound></PageNotFound>
      </Route>
    </Switch>
    </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
