import axios from "axios";
import { useState, useEffect } from "react";

function AvailableSeries() {
  const [seriesWithVideos, setSeriesWithVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const API_KEY = "0be26cb6a74a47d1f0dbddb4f09f76d8";

    const fetchSeriesWithVideos = async () => {
      try {
        // Fetch popular series
        const popularSeriesResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const seriesList = popularSeriesResponse.data.results;

        const filteredSeries = [];

        // Check each series for episodes with videos
        for (const series of seriesList) {
          const seasonNumber = 1; // Start with season 1 for simplicity
          const seasonResponse = await axios.get(
            `https://api.themoviedb.org/3/tv/${series.id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
          );
          const episodes = seasonResponse.data.episodes || [];

          for (const episode of episodes) {
            const videoResponse = await axios.get(
              `https://api.themoviedb.org/3/tv/${series.id}/season/${seasonNumber}/episode/${episode.episode_number}/videos?api_key=${API_KEY}&language=en-US`
            );

            const videoResults = videoResponse.data.results;

            if (videoResults.length > 0) {
              // Add series, episode, and video data
              filteredSeries.push({
                seriesName: series.name,
                episodeName: episode.name,
                videoKey: videoResults[0]?.key, // Use the first video key
              });
              break; // Stop checking further episodes for this series
            }
          }
        }

        setSeriesWithVideos(filteredSeries);
      } catch (error) {
        console.error("Error fetching series or videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeriesWithVideos();
  }, []);

  return (
    <div>
      <h3>Series with Available Videos</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : seriesWithVideos.length > 0 ? (
        <ul>
          {seriesWithVideos.map((item, index) => (
            <li key={index}>
              <strong>Series:</strong> {item.seriesName} <br />
              <strong>Episode:</strong> {item.episodeName} <br />
              <strong>Video:</strong>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${item.videoKey}`}
                title={`${item.seriesName} - ${item.episodeName}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
          ))}
        </ul>
      ) : (
        <p>No series with available videos found.</p>
      )}
    </div>
  );
}

export default AvailableSeries;
