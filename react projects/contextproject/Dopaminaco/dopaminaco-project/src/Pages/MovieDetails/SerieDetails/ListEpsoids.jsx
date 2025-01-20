import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../Home/loader/loader";

function FetchEpisodes({ seasonNumber, id, seriesTitle }) {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodesWithVideos = async () => {
      try {
        console.log("Fetching episodes for Series ID:", id, "Season:", seasonNumber);
    
        // Fetch season episodes from TMDB
        const seasonResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=0be26cb6a74a47d1f0dbddb4f09f76d8&language=en-US`
        );
        const episodesData = seasonResponse.data.episodes || [];
        console.log("Episodes fetched:", episodesData);
    
        // Fetch videos related to the entire series from Dailymotion
        const seriesVideosResponse = await axios.get(
          `https://api.dailymotion.com/videos?search=${encodeURIComponent(seriesTitle + " full episode")}&fields=id,title,url`
        );
        const seriesVideos = seriesVideosResponse.data.list || [];
        console.log("Videos for Series:", seriesVideos);
    
        // Merge episodes with corresponding videos
        const episodesWithVideos = episodesData.map((episode) => {
          const matchingVideos = seriesVideos.filter(video =>
            video.title.toLowerCase().includes(episode.name.toLowerCase()) ||
            video.title.toLowerCase().includes(`episode ${episode.episode_number}`.toLowerCase())
          );
          return {
            ...episode,
            videos: matchingVideos.length > 0 ? matchingVideos : [], // Assign matching videos or empty array
          };
        });
    
        setEpisodes(episodesWithVideos);
      } catch (error) {
        console.error("Error fetching episodes or videos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEpisodesWithVideos();
  }, [id, seasonNumber, seriesTitle]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="episodes-list">
      <h3>Episodes</h3>
      {episodes.length > 0 ? (
        <ul>
          {episodes.map((episode) => (
            <li key={episode.id}>
              <strong>{episode.name || `Episode ${episode.episode_number}`}</strong>
              <p>{episode.overview || "No overview available."}</p>
              {episode.videos && episode.videos.length > 0 ? (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.dailymotion.com/embed/video/${episode.videos[0]?.id}`} // Correct Dailymotion embed URL
                  title={`Video for ${episode.name}`}
                  frameBorder="0"
                  allow="fullscreen"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>No video available for this episode.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No episodes found for this season.</p>
      )}
    </div>
  );
}

export default FetchEpisodes;
