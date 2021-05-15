import React, { useEffect, useState } from "react";
import Video from "./Video.js";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log('Up and running');
    const requestOptions = {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      };
    fetch('http://localhost:3000/api', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVideos(data);});
  }, [videos]);

  return (
    <div className="app">
      {/* <h1>Hello</h1> */}
      <div className="app__videos">
        {videos.map(
          ({ url, channel, description, song, likes, messages, shares }) => (
            <Video
              url={url}
              channel={channel}
              song={song}
              likes={likes}
              messages={messages}
              description={description}
              shares={shares}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
