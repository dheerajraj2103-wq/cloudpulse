import { motion, useReducedMotion } from "framer-motion"
import type { CloudProvider } from "../types/resource"

interface CloudNodeProps {
  provider: CloudProvider
  index: number
}

const providerDetails: Record<
  CloudProvider,
  {
    label: string
    short: string
    description: string
  }
> = {
  AWS: {
    label: "Amazon Web Services",
    short: "AWS",
    description: "Cloud infrastructure",
  },
  Azure: {
    label: "Microsoft Azure",
    short: "AZ",
    description: "Cloud infrastructure",
  },
  GCP: {
    label: "Google Cloud",
    short: "GCP",
    description: "Cloud infrastructure",
  },
  "On-Premise": {
    label: "On-Premise",
    short: "ON",
    description: "Private infrastructure",
  },
}

export function CloudNode({ provider, index }: CloudNodeProps) {
  const details = providerDetails[provider]
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="cloud-node"
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.82,
              y: 24,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              scale: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.5,
      }}
      transition={{
        duration: 0.65,
        delay: shouldReduceMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
              transition: {
                duration: 0.2,
              },
            }
      }
      aria-label={`${details.label} - ${details.description}`}
    >
      <div className="cloud-node__icon" aria-hidden="true">
        {details.short}
      </div>

      <div className="cloud-node__content">
        <strong>{details.label}</strong>

        <span>{details.description}</span>

        <small>{provider}</small>
      </div>

      <div className="cloud-node__status" aria-hidden="true">
        <span />
        Connected
      </div>
    </motion.div>
  )
}