import  {useState } from "react";
import {auth} from "../firebase"
import {signInWithEmailAndPassword } from "firebase/auth";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

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
    return(<>
        {error != "" ?  <h1>Error is {error}</h1>:
            loader == true ? <h1>...Loading</h1>:
                user != null ? <h1>User is {user.uid}</h1>:
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