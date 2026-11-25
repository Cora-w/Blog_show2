import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion as Motion, MotionConfig } from 'framer-motion';
import HomePage from './pages/HomePage';
import StuPage from './pages/StuPage';
import BlogPage from './pages/BlogPage';
import MusicDock from './components/MusicDock';
import { musicData } from './constants/musicData';
import { colors } from './constants/colors';
import './App.css';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: .35, ease: [.22, 1, .36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: .2 } }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [songIndex, setSongIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [available, setAvailable] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const audioRef = useRef(null);
  const launcherRef = useRef(null);
  const song = musicData[songIndex];

  useEffect(() => {
    const audio = audioRef.current;
    let cancelled = false;
    if (playing) audio.play().catch(problem => {
      if (!cancelled && problem.name !== 'AbortError') {
        setPlaying(false);
        setError('暂时无法播放，请重试或切换下一首。');
      }
    });
    else audio.pause();
    return () => { cancelled = true; };
  }, [songIndex, playing]);

  const openPlayer = () => {
    launcherRef.current = document.activeElement;
    setAvailable(true); setVisible(true);
  };
  const togglePlay = () => { setError(''); setPlaying(value => !value); };
  const step = direction => {
    setError(''); setElapsed(0); setDuration(0);
    setSongIndex(index => (index + direction + musicData.length) % musicData.length);
    setPlaying(true);
  };
  const playSong = index => {
    openPlayer();
    if (index === songIndex) togglePlay();
    else { setError(''); setElapsed(0); setDuration(0); setSongIndex(index); setPlaying(true); }
  };
  const collapse = () => {
    setVisible(false);
    requestAnimationFrame(() => {
      const trigger = document.querySelector('.music-peek') || launcherRef.current;
      trigger?.focus();
    });
  };
  const seek = value => {
    if (audioRef.current && duration > 0) { audioRef.current.currentTime = value; setElapsed(value); }
  };
  const musicProps = { onTogglePlayer: openPlayer, isPlaying: playing, currentSong: song, onPlaySpecificSong: playSong };

  return <MotionConfig reducedMotion="user"><div className={`app-container ${visible ? 'has-music-dock' : ''}`} style={{ '--player-accent': currentPage === 'blog' ? colors.blogAccent : colors.accent }}>
    <audio ref={audioRef} src={song.src} preload="metadata" onEnded={() => step(1)} onTimeUpdate={event => setElapsed(event.currentTarget.currentTime)} onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)} onError={() => { setPlaying(false); setError('这首音乐暂时无法加载，请切换下一首。'); }} />
    <AnimatePresence mode="wait"><Motion.div key={currentPage} variants={pageVariants} initial="initial" animate="enter" exit="exit" className="page-wrapper"><div className="page-content">
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'stu' && <StuPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'blog' && <BlogPage onBack={() => setCurrentPage('home')} {...musicProps} />}
    </div></Motion.div></AnimatePresence>
    <MusicDock song={song} playing={playing} visible={visible} available={available} onExpand={openPlayer} onCollapse={collapse} onPlay={togglePlay} onNext={() => step(1)} onPrev={() => step(-1)} elapsed={elapsed} duration={duration} onSeek={seek} error={error} />
  </div></MotionConfig>;
}
