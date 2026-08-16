'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Layered background system, rendered once at the root, fixed behind all
// public-site content:
//   1. Dark base + blueprint grid  — always on, static, cheap (CSS only)
//   2. Two slow-drifting glow orbs — desktop/tablet only, frozen under
//      prefers-reduced-motion
//   3. An abstract node/circuit network — desktop only, hidden on mobile
//      entirely rather than simplified, since a cramped version adds
//      visual noise without the depth the full version has room for
//
// Nothing here uses canvas/WebGL — plain SVG + CSS/Framer Motion, per the
// "prefer CSS animation, avoid WebGL without a real reason" constraint.

const NODES = [
  { x: 80, y: 120 }, { x: 340, y: 60 }, { x: 620, y: 180 },
  { x: 220, y: 320 }, { x: 520, y: 380 }, { x: 780, y: 260 },
  { x: 120, y: 480 }, { x: 660, y: 500 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [2, 5], [3, 4], [4, 5], [3, 6], [4, 7],
];

export function AmbientBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [showNetwork, setShowNetwork] = useState(false);

  useEffect(() => {
    setShowNetwork(window.innerWidth >= 1024);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg bg-blueprint-grid">
      <motion.div
        className="absolute -top-32 left-[15%] h-[520px] w-[520px] rounded-full bg-signal/10 blur-[130px]"
        animate={shouldReduceMotion ? undefined : { x: [0, 50, -20, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[10%] h-[460px] w-[460px] rounded-full bg-blueprint/10 blur-[140px]"
        animate={shouldReduceMotion ? undefined : { x: [0, -40, 25, 0], y: [0, 30, -25, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
      />

      {showNetwork && (
        <svg
          viewBox="0 0 860 560"
          className="absolute right-[-6%] top-[8%] h-[560px] w-[860px] opacity-[0.14]"
          fill="none"
        >
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y}
              stroke="currentColor" strokeWidth="1" className="text-blueprint"
              initial={{ pathLength: 0 }}
              animate={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 1 }}
              transition={{ duration: 1.6, delay: i * 0.15, ease: 'easeOut' }}
            />
          ))}
          {NODES.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x} cy={n.y} r={3.5}
              className="fill-signal"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { opacity: [0.4, 1, 0.4] }
              }
              transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            />
          ))}
        </svg>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
    </div>
  );
}
