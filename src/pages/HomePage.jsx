import { useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { colors } from '../constants/colors';

const createLines = () => {
    const lines = [];
    if (typeof window !== 'undefined') {
        for (let i = 0; i < 50; i++) {
            const colorPalette = [colors.line1, colors.line2, colors.line3, colors.line4, colors.line5, colors.line6];
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const length = 100 + Math.random() * 300;
            const angle = Math.random() * Math.PI * 2;
            const endX = startX + Math.cos(angle) * length;
            const endY = startY + Math.sin(angle) * length;

            const duration = 10 + Math.random() * 15;
            const delay = Math.random() * 5;
            const opacity = 0.15 + Math.random() * 0.25;

            lines.push({ color, startX, startY, endX, endY, duration, delay, opacity });
        }
    }

    return lines;
};

const DynamicLine = ({ line, index, reduced }) => (
        <Motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            animate={reduced ? { opacity: line.opacity, scale: 1 } : {
                opacity: [line.opacity * 0.5, line.opacity, line.opacity * 0.5],
                scale: [1, 1.05, 1]
            }}
            transition={{
                duration: line.duration,
                repeat: Infinity,
                repeatType: "reverse",
                delay: line.delay,
                ease: "easeInOut"
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        >
            <svg width="100%" height="100%" style={{ position: 'absolute', overflow: 'visible' }}>
                <defs>
                    <filter id={`glow-${index}`}>
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <line
                    x1={line.startX} y1={line.startY}
                    x2={line.endX} y2={line.endY}
                    stroke={line.color}
                    strokeWidth="1.5"
                    opacity={line.opacity}
                    strokeLinecap="round"
                    filter={`url(#glow-${index})`}
                />
            </svg>
        </Motion.div>
    );


function HomePage({ onNavigate }) {
    const [lines] = useState(createLines);
    const layer = useRef(null);
    const reduced = useReducedMotion();
    const handlePointerMove = event => {
        if (reduced || event.pointerType === 'touch') return;
        layer.current.style.transform = `translate(${(event.clientX / window.innerWidth - 0.5) * 16}px, ${(event.clientY / window.innerHeight - 0.5) * 16}px)`;
    };

    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-original"
            onPointerMove={handlePointerMove}
            onPointerLeave={() => { layer.current.style.transform = 'translate(0, 0)'; }}
            style={{ width: '100%', height: '100%', backgroundColor: colors.bg, position: 'relative', overflow: 'hidden' }}
        >
            <div ref={layer} className="home-line-layer">{lines.map((line, i) => (
                <DynamicLine key={i} line={line} index={i} reduced={reduced} />
            ))}</div>

            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                <Motion.h1
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        color: colors.line3,
                        margin: 0,
                        fontWeight: 700,
                        letterSpacing: -2,
                        textShadow: 'none'
                    }}
                >
                    Lovin Myself
                </Motion.h1>

                <Motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: colors.line3, marginTop: '1.5rem', maxWidth: '600px', lineHeight: 1.6 }}
                >
                    I've allowed myself to drift.
                </Motion.p>

                <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', pointerEvents: 'auto' }}>
                    <Motion.button
                        style={{
                            backgroundColor: colors.accent,
                            color: '#fff',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            padding: '14px 32px',
                            border: 'none',
                            borderRadius: '4px',
                            backdropFilter: 'blur(5px)',
                            boxShadow: '0 2px 6px rgba(32, 35, 42, 0.10)'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
                        whileHover={{ scale: 1.05, backgroundColor: '#294AB9' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate('stu')}
                    >
                        STU
                    </Motion.button>

                    <Motion.button
                        style={{
                            padding: '14px 32px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: colors.blogAccent,
                            color: '#fff',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            backdropFilter: 'blur(5px)',
                            boxShadow: '0 2px 6px rgba(32, 35, 42, 0.10)'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, type: 'spring', stiffness: 100 }}
                        whileHover={{ scale: 1.05, backgroundColor: '#644F6C' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate('blog')}
                    >
                        BLOG
                    </Motion.button>
                </div>
            </div>
        </Motion.div>
    );
}

export default HomePage;
