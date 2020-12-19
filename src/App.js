import { useCallback, useState } from "react";
import "./index.css";

const baseUrl = "https://www.googleapis.com/youtube/v3";
const apiKey = "AIzaSyCvCEh7UqPqWwXuXdnwxuIWlTVB0wJHW48";

const INITIAL_RESULTS_MAX_NUMBER = 5;

const videosFromServerFormat = (data) =>
  data.items.map((item) => ({
    image: item.snippet.thumbnails.default.url,
    title: item.snippet.title,
    videoId: item.id.videoId,
    isLiked: false,
  }));

const fetchVideos = ({ limit, query }) =>
  fetch(
    `${baseUrl}/search?part=snippet&maxResults=${limit}&q=${query}&type=video&key=${apiKey}`
  )
    .then((res) => res.json())
    .then(videosFromServerFormat);

const onThumbsToggle = (iconIndex) => {
  const elem = document.getElementById(`thumbs-icon-${iconIndex}`);
  elem.classList.toggle("fa-thumbs-down");
};

const App = () => {
  const [videos, setVideos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [resultsMaxNumber, setResultsMaxNumber] = useState(
    INITIAL_RESULTS_MAX_NUMBER
  );
  const [likedVideos, setLikedVideos] = useState([]);

  const onVideoSearch = () => {
    fetchVideos({ limit: resultsMaxNumber, query: inputValue }).then(setVideos);
  };

  const onYouTubeVideoRedirect = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  const onVideoUpdate = useCallback((updatedVideo) => {
    setVideos((videos) => {
      return videos.map((video) => {
        return video.videoId === updatedVideo.videoId ? updatedVideo : video;
      });
    });
  }, []);

  const onVideoLike = useCallback(
    (video) => {
      setLikedVideos((likedVideos) => [...likedVideos, video.videoId]);
      const updatedVideo = { ...video, isLiked: true };

      onVideoUpdate(updatedVideo);
    },
    [onVideoUpdate]
  );

  return (
    <div className="content">
      <div className="searchArea">
        <input onChange={(e) => setInputValue(e.target.value)} />

        <button onClick={onVideoSearch}>Show results</button>

        <label htmlFor="resultsMaxNumber">Results max number:</label>
        <select
          name="resultsMaxNumber"
          id="resultsMaxNumber"
          onChange={(e) => setResultsMaxNumber(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div className="videosWrapper">
        {videos.map((video, index) => (
          <div key={index} className="videoContainer">
            <div
              key={video.videoId}
              className="video"
              onClick={() => onYouTubeVideoRedirect(video.videoId)}
            >
              <img key={video.image} alt="" src={video.image} />
              <div className="videoTitle">{video.title}</div>
            </div>
            {!likedVideos.includes(video.videoId) && (
              <button onClick={() => onVideoLike(video)}>♥</button>
            )}
            <div>
              {likedVideos.includes(video.videoId) && (
                <i
                  id={`thumbs-icon-${index}`}
                  onClick={() => onThumbsToggle(index)}
                  className="fa fa-thumbs-up"
                ></i>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* <div>Liked videos:{JSON.stringify(likedVideos)}</div> */}
      <pre>
        Liked videos:{JSON.stringify(likedVideos)}
        <br />
        <br />
        <br />
        {JSON.stringify(videos, null, 2)}
      </pre>
    </div>
  );
};

export default App;
