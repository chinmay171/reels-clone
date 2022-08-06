import { useState} from "react";
import {auth, db} from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import "./SignUp.css";
import instaLogo from "../Assets/instaLogo.png";
import { Link } from "react-router-dom";
import React from "react";

function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState("");

    const processSignUp = async function(){
        try {
            setLoader(true);
            let userCred = await createUserWithEmailAndPassword(auth,email,password);
             await setDoc(doc(db, "users", userCred.user.uid), {
                email,
                name,
                reelsIds:[],
                profileImageURL:"",
                userID:userCred.user.uid
            });
            setUser(userCred.user);
            window.location.reload(false);
        } catch (error) {
            setError(error.message);
            setTimeout(()=>{
                setError("");
            }, 2000);
        }
        setLoader(false);
    }
    const refreshPage = async function() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 100)
      }

      const handleProfileInput = event =>{
        hiddenFileInput.current.click();
      }

      const hiddenFileInput = React.useRef(null);

      const handleProfileChange = event => {
        const fileUploaded = event.target.files[0];
        console.log(fileUploaded);
      };

    return(
        <div className="signUpWrapper">
                {error!=null?
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
                        <div className="signUpCard">
                            <div className="logo">
                                <img src={instaLogo} alt="" />
                            </div>
                            <div className="signUpDetails">
                                <input type="email" className="signUpInput" onChange={(e)=>{setEmail(e.target.value)}}  value={email} placeholder="Email"></input><br></br>
                                <input type="password" className="signUpInput" onChange={(e)=>{setPassword(e.target.value)}} value ={password} placeholder="Password"></input><br></br>
                                <input type="text" className="signUpInput" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder="Full Name"></input><br></br>
                                <div className="profileInputTab">
                                    <button  onClick={handleProfileInput} className="profilePicButton"
                                    >Upload Profile Pic</button>
                                    <input type="file" name="file" id="file" className="profilePicButton" ref={hiddenFileInput} onChange={handleProfileChange} style={{display:'none'}} /> 
                                </div>
                                <button type="click" className="signUpButton" onClick={processSignUp}>Sign up</button>
                            </div>
                            <div className="secondCard">
                                <Link to="/login">
                                    <button type="button" className="linktosignup login" onClick={refreshPage}>Already have an account ?</button>
                                </Link>
                                <Link to="/forget">
                                    <button type="button" className="linktosignup Forget" onClick={refreshPage}>Forgot Password ?</button>
                                </Link>
                            </div>
                        </div>
                    </>
                }
        </div>
    )
}

export default Signup;