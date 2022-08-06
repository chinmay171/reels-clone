import  {useState } from "react";
import {auth} from "../firebase"
import {signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
// import { async } from "@firebase/util";
import instaLogo from "../Assets/instaLogo.png"
import "./login.css";
import { Link } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    // const [mainLoader, setMainLoader] = useState(true);

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
            window.location.reload(false);
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError("");
            }, 2000);
        }
        setLoader(false)
    }

    // const logout = async function(){
    //     await signOut(auth);
    //     setUser(null);
    // }

    const refreshPage = async function() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 100)
      }

    useState(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
            // setMainLoader(false);
        })
    })

    return(
        <div className="loginWrapper">
            {
            error != "" ?  
            <>
                <div className="alert">
                    Invalid Input !!!
                </div>
            </>
            :
                <>
                    <div className="topBar">
                            <div className="topBarlogo">
                                <img src={instaLogo} alt="" />
                            </div>
                            <div className="topBarbtn">
                                <Link to="/login">
                                        <button type="button" className="linkto login" onClick={refreshPage}>Log In</button>
                                </Link>
                                <Link to="/signup">
                                        <button type="button" className="linkto signin" onClick={refreshPage}>Sign Up</button>
                                </Link>
                            </div>
                    </div>
                    <div className="loginCard">
                        <div className="logo">
                            <img src={instaLogo} alt="" />
                        </div>
                        <div className="loginDetails">
                            < input type="email" className="input" onChange={trackEmail} placeholder="Email" /> <br></br>
                            <input type="password" className="input" onChange={trackPassword} placeholder="Password" /><br></br>
                            <button type="click" className="loginButton" onClick={printDetails}>Log In</button>
                        </div>
                        <div className="secondCard">
                            <Link to="/signup">
                                <button type="button" className="linktologin Signup" onClick={refreshPage}>Don't have an account ?</button>
                            </Link>
                            <Link to="/forget">
                                <button type="button" className="linktologin Forget" onClick={refreshPage}>Forgot Password ?</button>
                            </Link>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Login;