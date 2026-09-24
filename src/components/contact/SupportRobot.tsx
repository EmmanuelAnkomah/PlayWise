import { motion, useReducedMotion } from 'framer-motion';

export function SupportRobot() {
  const reducedMotion = useReducedMotion();
  const robotAnimation = reducedMotion
    ? { x: '82vw', rotate: 0, y: 0, scale: 1 }
    : {
        x: ['-8vw', '56vw', '56vw', '56vw', '56vw', '84vw', '84vw', '84vw', '-8vw'],
        rotate: [0, 0, -7, -7, -7, 0, 0, 0, 0],
        scaleX: [1, 1, 1, 1, -1, -1, -1, -1, 1],
        y: [0, 0, 0, 2, 2, 0, 4, -18, 0],
        scale: [1, 1, 1, 1, 1, 1, .94, 1.1, 1],
      };

  return (
    <section className="support-robot-section" aria-label="Playwise support is on the way">
      <div className="support-robot-copy"><p className="eyebrow">SUPPORT IS ON THE WAY</p><p>Every player gets stuck sometimes.</p></div>
      <motion.div className="support-robot-destination" animate={reducedMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: [0, 0, 1, 1, 0], scale: [.92, .92, 1, 1.04, .92], y: [8, 8, 0, 0, 8] }} transition={reducedMotion ? { duration: .2 } : { duration: 22, times: [0, .31, .39, .82, 1], repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true"><img src="/favicon.svg" alt="" /><span>PLAYWISE</span></motion.div>
      <motion.div className="support-robot" animate={robotAnimation} transition={reducedMotion ? { duration: .2 } : { duration: 22, times: [0, .29, .36, .43, .48, .67, .72, .82, 1], repeat: Infinity, ease: 'linear' }} aria-hidden="true">
        <motion.div className="support-robot-body" animate={reducedMotion ? undefined : { y: [0, -2, 0, 2, 0, -2, 0, -12, 0], rotate: [0, 0, 0, -8, -8, 0, -12, 12, 0], scale: [1, 1, 1, 1, 1, 1, .92, 1.12, 1] }} transition={reducedMotion ? undefined : { duration: 22, times: [0, .29, .36, .43, .48, .67, .72, .82, 1], repeat: Infinity, ease: 'easeInOut' }}>
          <span className="robot-antenna" /><span className="robot-head"><i /><i /></span><span className="robot-arm robot-arm-left"><i className="robot-hand" /></span><span className="robot-arm robot-arm-right"><i className="robot-hand" /></span><span className="robot-core"><b /><b /></span><span className="robot-leg robot-leg-left" /><span className="robot-leg robot-leg-right" />
        </motion.div>
      </motion.div>
    </section>
  );
}
