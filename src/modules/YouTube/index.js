import { useCallback, useState } from "react";
import deleteButtonImage from "../../assets/images/delete-button.png";
import fetchMock from "../../helpers/fetchMock";
import "./index.css";
import mockData from "./youTubeApiSearchMockData";

const INITIAL_RESULTS_MAX_NUMBER = 5;

const delayTime = Math.floor(Math.random() * 1000 * 10);

const baseUrl = "https://www.googleapis.com/youtube/v3";

const apiKey = process.env.REACT_APP_API_KEY;
const isFetchMock = process.env.REACT_APP_MOCK_API;

const formatVideosFromServer = (data) =>
  data.items.map((item) => ({
    image: item.snippet.thumbnails.default.url,
    title: item.snippet.title,
    videoId: item.id.videoId,
    isLiked: null,
  }));

const fetchVideos = ({ limit, query }) => {
  const fetchMockFunc = isFetchMock
    ? fetchMock({
        delay: delayTime,
        limit,
        data: mockData,
        isError: query.includes("error"),
      })
    : fetch(
        `${baseUrl}/search?part=snippet&maxResults=${limit}&q=${query}&type=video&key=${apiKey}`
      );

  return fetchMockFunc.then((res) => res.json()).then(formatVideosFromServer);
};

const YouTubeApiHandler = () => {
  const [videos, setVideos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [resultsMaxNumber, setResultsMaxNumber] = useState(
    INITIAL_RESULTS_MAX_NUMBER
  );
  const [likedVideos, setLikedVideos] = useState([]);

  const onVideoSearch = async () => {
    let data;

    try {
      data = await fetchVideos({
        limit: resultsMaxNumber,
        query: inputValue,
      });
    } catch (e) {
      console.log(data);
      data = [];
    }

    setVideos(data);

    // const mappedPromises = data.map((element) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: JSON.stringify(data) }), // or map per element
    };
    return fetch("http://localhost:3000/localDb", requestOptions).then((res) =>
      res.json()
    );
    // });

    // const resolvedPromises = await Promise.all(mappedPromises);
    // console.log(resolvedPromises);
  };

  const onVideoUpdate = useCallback((updatedVideo) => {
    setVideos((videos) => {
      return videos.map((video) => {
        return video.videoId === updatedVideo.videoId ? updatedVideo : video;
      });
    });
  }, []);

  const handleUpdatedSkillFeedback = useCallback(
    ({ video, isLikedValue }) => {
      const updatedVideo = { ...video, isLiked: isLikedValue };
      onVideoUpdate(updatedVideo);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video: video }),
      };
      fetch("http://localhost:3000/localDb", requestOptions).then((response) =>
        response.json()
      );
    },
    [onVideoUpdate]
  );

  const onYouTubeVideoRedirect = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  const onVideoLike = useCallback(
    (video) => {
      handleUpdatedSkillFeedback({ video, isLikedValue: true });
      setLikedVideos((likedVideos) => [...likedVideos, video.videoId]);
    },
    [handleUpdatedSkillFeedback]
  );

  const onThumbsToggle = (iconIndex, video) => {
    const element = document.getElementById(`thumbs-icon-${iconIndex}`);
    element.classList.toggle("fa-thumbs-down");

    if (element.classList.value === "fa fa-thumbs-up") {
      handleUpdatedSkillFeedback({ video, isLikedValue: true });
      return;
    }
    handleUpdatedSkillFeedback({ video, isLikedValue: false });
  };

  const onFeedbackDelete = useCallback(
    (video) => {
      setLikedVideos(likedVideos.filter((id) => id !== video.videoId));
      handleUpdatedSkillFeedback({ video, isLikedValue: null });
    },
    [likedVideos, handleUpdatedSkillFeedback]
  );

  console.log(videos);

  return (
    <div className="youTubeHandlerContent">
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
            <div className="videoFeedbackContainer">
              {likedVideos.includes(video.videoId) && (
                <>
                  <i
                    id={`thumbs-icon-${index}`}
                    onClick={() => onThumbsToggle(index, video)}
                    className="fa fa-thumbs-up"
                  ></i>
                  <img
                    onClick={() => onFeedbackDelete(video)}
                    className="deleteFeedbackIcon"
                    src={deleteButtonImage}
                    alt=""
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
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

export default YouTubeApiHandler;
