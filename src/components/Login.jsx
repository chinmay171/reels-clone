import  {useState } from "react";
import {auth} from "../firebase"
import {signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
// import { async } from "@firebase/util";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const [mainLoader, setMainLoader] = useState(true);

    const trackEmail = function(e){
        setEmail(e.target.value);
    }
    const trackPassword = function(e){
        setPassword(e.target.value);
    }

    const printDetails = async function(){
        // alert(email + " " + password)
        // console.log(userCred.user);
        try {
            setLoader(true);
            let userCred = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCred.user);
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError("");
            }, 2000);
        }
        setLoader(false)
    }

    const logout = async function(){
        await signOut(auth);
        setUser(null);
    }

    useState(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
            setMainLoader(false);
        })
    })

    return(<>
        {mainLoader == true?<h1>Page is Loading...</h1>:
        error != "" ?  <h1>Error is {error}</h1>:
            loader == true ? <h1>...Loading</h1>:
                user != null ? <><h1>User is {user.uid}</h1> <button onClick={logout}>Log out</button></>:
            <>
                < input type="email" onChange={trackEmail} placeholder="E-mail" />
                <br></br>
                <input type="password" onChange={trackPassword} placeholder="Password" />
                <br></br>
                <button type="click" onClick={printDetails}>Create Account</button>
            </>
        }
        </>
    )
}

export default Login;