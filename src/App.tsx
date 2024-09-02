import React, { useState, useRef } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import ReactPlayer from 'react-player';
import './VideoUpload.css';

const VideoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [is2xSpeed, setIs2xSpeed] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [cinemaMode, setCinemaMode] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Yeni state değişkeni
  const playerRef = useRef<ReactPlayer | null>(null);

  const accept: Accept = {
    'video/*': []
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const newFile = acceptedFiles[0];
        setFile(newFile);

        const url = URL.createObjectURL(newFile);
        setVideoUrl(url);

        return () => URL.revokeObjectURL(url);
      }
    }
  });

  const handleSpeedToggle = () => {
    setIs2xSpeed((prev) => !prev);
  };

  const handleCinemaModeToggle = () => {
    setCinemaMode((prev) => !prev);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className={`video-upload-container ${isDarkTheme ? 'dark-theme' : 'light-theme'} ${cinemaMode ? 'cinema-mode' : ''}`}>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="dropzone"
      >
        <input {...getInputProps()} />
        {file ? (
          <p>Yüklendi: {file.name}</p>
        ) : (
          <p>Dosyayı buraya sürükleyin veya tıklayın.</p>
        )}
      </div>
      {videoUrl && (
        <div className="video-container">
          <ReactPlayer
            url={videoUrl}
            ref={playerRef}
            playing={isPlaying}
            controls
            playbackRate={is2xSpeed ? 2 : 1}
            width="100%"
            height="100%"
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
          {!isPlaying && (
            <div className="play-button" onClick={handlePlayPause}>
              ▶
            </div>
          )}
          <div className="video-controls">
            <button onClick={handleSpeedToggle}>
              {is2xSpeed ? 'Normal Hız' : '2x Hız'}
            </button>
            <button onClick={handleCinemaModeToggle}>
              {cinemaMode ? 'Normal Mod' : 'Sinema Modu'}
            </button>
            <button onClick={handleThemeToggle}>
              {isDarkTheme ? 'Açık Tema' : 'Koyu Tema'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
