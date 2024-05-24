import React from 'react';

const MovieTrailer = ({ videoKey }) => {
    const videoUrl = `https://www.youtube.com/embed/${videoKey}`;

    return (
        <div className="TrailerContainer">
            <iframe
                title="movie-trailer"
                width="560"
                height="315"
                src={videoUrl}
                frameBorder="0"
                allowFullScreen
            />
        </div>
    );
};

export default MovieTrailer;
