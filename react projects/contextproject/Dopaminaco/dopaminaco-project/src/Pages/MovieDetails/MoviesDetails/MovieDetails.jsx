import React, { useState, useEffect } from 'react';

const DailymotionVideos = ({ movieTitle }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les vidéos depuis Dailymotion
    const fetchVideos = async () => {
      const url = `https://api.dailymotion.com/videos?search=${encodeURIComponent(movieTitle + " full movie")}&fields=id,title,url,duration`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.list && data.list.length > 0) {
          // Filtrer les vidéos pour ne garder que celles avec une durée assez longue
          const fullMovies = data.list.filter(video => video.duration >= 3600); // 3600 secondes = 1 heure
          setVideos(fullMovies);
        } else {
          setError('Aucune vidéo trouvée pour ce film.');
        }
      } catch (error) {
        setError('Erreur lors de la récupération des vidéos Dailymotion.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [movieTitle]);

  if (loading) {
    return <div>Chargement des vidéos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Vidéos pour {movieTitle}</h2>
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id} style={{ marginBottom: '20px' }}>
            <h3>{video.title}</h3>
            <a href={`https://www.dailymotion.com/video/${video.id}`} target="_blank" rel="noopener noreferrer">
              Voir la vidéo
            </a>
            <br />
            <iframe
              width="560"
              height="315"
              src={`https://www.dailymotion.com/embed/video/${video.id}`}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        ))
      ) : (
        <p>Aucune vidéo complète trouvée pour ce film.</p>
      )}
    </div>
  );
};

export default DailymotionVideos;
