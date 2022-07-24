import { useState } from "react";

const VideoCard = ()=>{
    const[playing, setPlaying] = useState(false);

    return(
        <div className="VideoCard">
            <p>Fake User</p>
            <span>
                Song Name
            </span>
            <video onClick={(e)=>{
                if(playing){
                    e.currentTarget.pause();
                    setPlaying(false);
                }else{
                    e.currentTarget.play();
                    setPlaying(true);
                }
            }} src=""></video>
        </div>
    )
}

export default VideoCard;