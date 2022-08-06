import { useState } from "react"
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { db } from "../firebase";
import { useEffect } from "react";
import "./videoCard.css"

const VideoCard = (props) => {
    let user = useContext(AuthContext);
    let [playing, setPlaying] = useState(true);
    let [commentBoxOpen, setCommentBox] = useState(false);
    // console.log("props",props)
    let [currUserComment, setCurrUserComment] = useState("");
    let [comments, setComments] = useState([]);
    let [currUserLiked, setCurrUserLiked] = useState(false);
    useEffect(() => {
        async function setCommentsData() {
            let commentsIdArr = props.data.comments;
            let arr = [];
            for (let i = 0; i < commentsIdArr.length; i++) {
                const commentRef = doc(db, "comments", commentsIdArr[i]);
                const commentSnap = await getDoc(commentRef);
                arr.push(commentSnap.data())
            }
            console.log("Array ", arr)
            setComments(arr);
            if (user) {
                let a = props.data.likes.includes(user.uid);
                setCurrUserLiked(a);
            }
        }
        setCommentsData();
    }, [props])

    console.log("props", props)
    return (
        <div className="videoCardWrapper">
            <div className="video-card">
                <p className="video-card-username">Fake User</p>
                <span className="video-card-music">
                    <span>
                        music note
                    </span>
                </span>

                <video className="video-card-video" onClick={(e) => {
                    if (playing) {
                        e.currentTarget.pause();
                        setPlaying(false)
                    } else {
                        e.currentTarget.play();
                        setPlaying(true);
                    }
                }} src={props.data.url}
                    crossrigin="anonymous" ></video>

                <span className="VideoCardLikebtn" onClick={async () => {
                    let likesArr = props.data.likes;
                    if (currUserLiked) {
                        likesArr = likesArr.filter((el) => el != user.uid);
                    } else {
                        likesArr.push(user.uid);
                    }
                    const postsRef = doc(db, "posts", props.data.id);
                    await updateDoc(postsRef, {
                        likes: likesArr
                    });
                    let c = !currUserLiked;
                    setCurrUserLiked(c);
                }}
                >
                    {currUserLiked ? 
                    <i class="fa fa-heart" style={{color:"gray"}}></i>:
                    <i class="fa fa-heart" style={{color:"red"}}></i>}
                </span>

                <span onClick={(e) => {
                    if (commentBoxOpen) {
                        setCommentBox(false)
                    } else {
                        setCommentBox(true)
                    }
                }}>Comments</span>

                {commentBoxOpen ? (
                    <div className="video-card-comment-box">
                        {comments.map((comment) => {
                            return (
                                <div className="actual-comments">
                                    <h5>{comment.email}</h5>
                                    <p>{comment.comment}</p>
                                </div>
                            )
                        })}
                        <div className="actual-comments">
                            <h5>User name</h5>
                            <p>This is actual comment</p>
                        </div>
                        <div className="comment-form">
                            <div className="post-user-comment">
                                <input type="text" value={currUserComment} onChange={(e) => setCurrUserComment(e.currentTarget.value)} />
                                <button
                                    onClick={async () => {
                                        let commentId = user.uid + "$" + Date.now();
                                        await setDoc(doc(db, "comments", commentId), {
                                            email: user.email,
                                            comment: currUserComment,
                                        });
                                        setCurrUserComment("");
                                        let postCommentsArr = props.data.comments
                                        postCommentsArr.push(commentId)
                                        const postsRef = doc(db, "posts", props.data.id);
                                        await updateDoc(postsRef, {
                                            comments: postCommentsArr
                                        });
                                    }}
                                >post</button>
                            </div>
                        </div>
                    </div>
                ) : ("")}

            </div>
        </div>

    )
}

export default VideoCard