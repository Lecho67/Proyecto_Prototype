import React from 'react';

const MovieTrailer = ({ videoKey }) => {
    const videoUrl = `https://www.youtube.com/embed/${videoKey}`;

    return (
        <div className="TrailerContainer">
            <iframe
                className="YouTubePlayer"
                title="movie-trailer"
                src={videoUrl}
                allowFullScreen
            />
        </div>
    );
};

export default MovieTrailer;
