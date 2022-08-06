import React, { useEffect, useState } from "react"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import "./profile.css"
import { auth, storage, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { setDoc } from "firebase/firestore"
import { Link } from "react-router-dom";
import instaLogo from "../Assets/instaLogo.png"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

const refreshPage = async function () {
    setTimeout(() => {
        window.location.reload(false);
    }, 100)
}

function Profile() {
    let cUser = useContext(AuthContext);
    let [loading, setLoading] = useState(true);
    let [user, setUser] = useState(null);

    useEffect(function fn() {
        (async function () {
            if (cUser) {
                //read from dabase
                const docRef = doc(db, "users", cUser.uid);
                const userObj = await getDoc(docRef);
                console.log("Document Data: ", userObj.data())
                setUser(userObj.data());
                setLoading(false);
            }
        })()
    }, [])

    const hiddenFileInput = React.useRef(null);

    const addPostChange = function(e) {
        let videoObj = e.currentTarget.files[0];
        console.log(videoObj)
        let { name, size, type } = videoObj
        console.log(size);
        type = type.split("/")[0];
        if (type !== "video") {
            alert("Please upload a video");
        } else {
            let storageRef = ref(storage, `${name}`)
            const uploadTask = uploadBytesResumable(storageRef, videoObj);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        console.log(user);
                        await setDoc(doc(db, "posts", user.uid + `${name}`), {
                            email: user.email,
                            url: downloadURL,
                            likes: [],
                            comments: []
                        });
                    });
                }
            );
        }
    }

    return (
        <>
            {loading == true ? <></> :
                <>
                    <div className="profileWrapper">

                        <div className="topBarlogged">

                            <div className="topBarloggedLogo">
                                <img src={instaLogo} alt="" onClick={refreshPage} />

                            </div>
                            <div className="topBarloggedbtn">

                                <Link to="/feed">
                                    <button className="topBarLoggedHome" onClick={refreshPage}>Home</button>
                                </Link>

                                <div className="AddPostFeed">
                            <button className="topBarFeedAddPost">
                                Create Post

                                <input type="file"
                                    onClick={(e) => {
                                        console.log(e)
                                    }}

                                    onChange={(e) => {
                                        let videoObj = e.currentTarget.files[0];
                                        console.log(videoObj)
                                        let { name, size, type } = videoObj
                                        console.log(size);
                                        type = type.split("/")[0];
                                        if (type !== "video") {
                                            alert("Please upload a video");
                                        } else {
                                            let storageRef = ref(storage, `${name}`)
                                            const uploadTask = uploadBytesResumable(storageRef, videoObj);
                                            uploadTask.on('state_changed',
                                                (snapshot) => {
                                                    // Observe state change events such as progress, pause, and resume
                                                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                                    console.log('Upload is ' + progress + '% done');
                                                    switch (snapshot.state) {
                                                        case 'paused':
                                                            console.log('Upload is paused');
                                                            break;
                                                        case 'running':
                                                            console.log('Upload is running');
                                                            break;
                                                    }
                                                },
                                                (error) => {
                                                    // Handle unsuccessful uploads
                                                },
                                                () => {
                                                    // Handle successful uploads on complete
                                                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                                        console.log('File available at', downloadURL);
                                                        console.log(user);
                                                        await setDoc(doc(db, "posts", user.uid + `${name}`), {
                                                            email: user.email,
                                                            url: downloadURL,
                                                            likes: [],
                                                            comments: []
                                                        });
                                                    });
                                                }
                                            );
                                        }
                                    }}

                                // style={{display:'none'}}
                                accept="video/*"
                                ></input>

                            </button>
                        </div>

                                <button onClick={() => { auth.signOut() }} className="topBarLogout">Logout</button>
                            </div>
                        </div>

                        <div className="main">
                            <div className="profileCont">
                                <div className="pimg_container">
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className="profileImg" />
                                </div>
                                <div className="details">
                                    <div className="content">{user.name}</div>
                                    <div className="content">{user.email}</div>
                                    <div className="content"><span className="bold_text">{user.reelsIds.length}</span> Posts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default Profile;