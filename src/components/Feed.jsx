import "./feed.css"
import { auth, storage, db } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { setDoc, doc, } from "firebase/firestore"
import React, { useContext, useEffect } from "react"
import { AuthContext } from "../context/authContext"
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import instaLogo from "../Assets/instaLogo.png"

import VideoCard from "./VideoCard"
import { useState } from "react"
function Feed() {
    let user = useContext(AuthContext);
    let [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPostsData() {
            const querySnapshot = await getDocs(collection(db, "posts"));
            let arr = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                arr.push({ id: doc.id, ...doc.data() })
            });
            setPosts(arr);
            console.log(posts);
        }
        fetchPostsData();
    }, [])
    const refreshPage = async function () {
        setTimeout(() => {
            window.location.reload(false);
        }, 100)
    }
    const handleCreatePost = event => {
        hiddenPostInput.current.click();
    }

    const hiddenPostInput = React.useRef(null);
    return (
        <>
            <div className="feedWrapper">
                <div className="topBarFeed">

                    <img src={instaLogo} alt="" />

                    <div className="topBarFeedbtn">

                        <div className="FeedProfilebtn">
                            <Link to="/profile">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                    className="topBarFeedProfile " onClick={refreshPage}></img>
                            </Link>
                        </div>


                        <button className="topBarFeedHome" onClick={refreshPage}>Home</button>

                        <div className="AddPostFeed">
                            <button className="topBarFeedAddPost" onClick={() => handleCreatePost()}>
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


                        <button onClick={() => { auth.signOut() }} className="topBarFeedLogout">Logout</button>
                    </div>
                </div>
                <div className="main_container">

                    <div className="reels_container">
                        {posts.map((post) => {
                            return <VideoCard key={post.id} data={post} />
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed