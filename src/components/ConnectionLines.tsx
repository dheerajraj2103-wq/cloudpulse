import { motion } from "framer-motion"

export function ConnectionLines() {
  const paths = [
    "M 140 105 C 260 105, 350 220, 500 300",
    "M 860 105 C 740 105, 650 220, 500 300",
    "M 140 495 C 260 495, 350 380, 500 300",
    "M 860 495 C 740 495, 650 380, 500 300",
  ]

  return (
    <svg
      className="connection-lines"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          whileInView={{
            pathLength: 1,
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 1.2,
            delay: 0.35 + index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  )
}