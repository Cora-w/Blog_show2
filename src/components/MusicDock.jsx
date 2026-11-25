import { AnimatePresence, motion as Motion } from 'framer-motion';
const time = value => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`;
function TransportIcon({ type }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">{type === 'pause' ? <path d="M9 5v14M15 5v14" stroke="currentColor" strokeWidth="2" /> : type === 'play' ? <path d="m9 5 10 7-10 7Z" fill="currentColor" /> : <><path d={type === 'prev' ? 'm17 5-10 7 10 7Z' : 'm7 5 10 7-10 7Z'} fill="currentColor" /><path d={type === 'prev' ? 'M5 5v14' : 'M19 5v14'} stroke="currentColor" strokeWidth="1.5" /></>}</svg>;
}
export default function MusicDock({ song, playing, visible, available, onExpand, onCollapse, onPlay, onNext, onPrev, elapsed, duration, onSeek, error }) {
  return <AnimatePresence initial={false}>
    {visible ? <Motion.aside key="dock" className="music-dock" aria-label="迷你音乐播放器" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: .22 }}>
      <div className="dock-top"><div className={`dock-record ${playing ? 'is-spinning' : ''}`}><img src={song.cover} alt="" /><span /></div>
        <div className="dock-track"><small>{playing ? 'NOW PLAYING' : 'PAUSED'}</small><strong>{song.title}</strong><span>{song.artist}</span></div>
        <div className="dock-controls"><button onClick={onPrev} aria-label="上一首"><TransportIcon type="prev" /></button><button className="dock-play" onClick={onPlay} aria-label={playing ? '暂停音乐' : '播放音乐'}><TransportIcon type={playing ? 'pause' : 'play'} /></button><button onClick={onNext} aria-label="下一首"><TransportIcon type="next" /></button></div>
        <button className="dock-collapse" onClick={onCollapse} aria-label="收起播放器，保留播放状态" title="收起"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" /></svg></button>
      </div>
      <div className="dock-timeline"><span>{time(elapsed)}</span><input type="range" min="0" max={duration || 1} step="0.1" value={Math.min(elapsed, duration || 1)} disabled={!duration} onChange={event => onSeek(Number(event.target.value))} aria-label="播放进度" aria-valuetext={`${time(elapsed)} / ${time(duration)}`} /><span>{time(duration)}</span></div>
      {error && <p className="dock-error" role="status">{error}</p>}
    </Motion.aside> : available && <Motion.button key="launcher" className="music-peek" onClick={onExpand} aria-label="展开音乐播放器" title={`${song.title} · 展开播放器`} initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><img src={song.cover} alt="" /><span className={playing ? 'peek-bars is-playing' : 'peek-bars'} aria-hidden="true"><i /><i /><i /></span></Motion.button>}
  </AnimatePresence>;
}
