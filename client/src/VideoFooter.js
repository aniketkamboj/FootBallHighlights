import React from 'react'
import './VideoFooter.css'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
// import Ticker from 'react-ticker';
function VideoFooter({channel,description,song}) {
    return (
        <div className="videoFooter">
            <div className="videoFooter__text">
                <h1>{channel}</h1>
                <p>{description}</p>
                {/* <div className="videoFooter__ticker">
                    <MusicNoteIcon 
                        className="videoFooter__icon"/>
                    
                            <p>{song}</p>
                           
                </div> */}
            </div>
            <img 
                className="videoFooter__record"
                src="https://static.thenounproject.com/png/934821-200.png"
                alt=""
            />
        </div>
    )
}

export default VideoFooter
