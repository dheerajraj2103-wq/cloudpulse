import {
  motion,
  useReducedMotion,
} from "framer-motion"

import type { CloudResource } from "../types/resource"

interface OptimizationResultProps {
  resource: CloudResource
}

const metricLabels = {
  cpu: "CPU",
  ram: "RAM",
  gpu: "GPU",
  storage: "Storage",
  network: "Network",
} as const

const recommendations = {
  cpu: {
    title: "Right-size compute capacity",
    description:
      "CPU utilization is elevated. Consider resizing the workload or adjusting compute capacity to better match demand.",
  },
  ram: {
    title: "Review memory allocation",
    description:
      "Memory utilization is high. Review workload requirements and consider reallocating or scaling memory resources.",
  },
  gpu: {
    title: "Review GPU allocation",
    description:
      "GPU utilization is elevated. Check workload demand and consider resizing or scheduling GPU resources more efficiently.",
  },
  storage: {
    title: "Optimize storage capacity",
    description:
      "Storage utilization is high. Review retained data, lifecycle policies, and allocated capacity.",
  },
  network: {
    title: "Optimize network usage",
    description:
      "Network utilization is elevated. Review traffic patterns, data movement, and workload placement.",
  },
} as const

export function OptimizationResult({
  resource,
}: OptimizationResultProps) {
  const shouldReduceMotion = useReducedMotion()

  const entries = Object.entries(
    resource.metrics,
  ) as Array<
    [
      keyof typeof metricLabels,
      number,
    ]
  >

  const [metricKey, metricValue] = entries.reduce(
    (highest, current) =>
      current[1] > highest[1]
        ? current
        : highest,
  )

  const metricName = metricLabels[metricKey]
  const recommendation = recommendations[metricKey]

  return (
    <motion.section
      className="optimization-result"
      aria-labelledby="optimization-result-heading"
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 40,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="optimization-result__header">
        <div>
          <span className="eyebrow">
            OPTIMIZATION ENGINE
          </span>

          <h2 id="optimization-result-heading">
            An opportunity was detected.
          </h2>

          <p>
            CloudPulse identified{" "}
            <strong>{metricName}</strong> as the
            highest-utilized resource in this workload.
          </p>
        </div>

        <div
          className="optimization-result__score"
          aria-label={`${metricName} utilization ${metricValue}%`}
        >
          <span>{metricName}</span>
          <strong>{metricValue}%</strong>
          <small>utilization</small>
        </div>
      </div>

      <div className="optimization-result__body">
        <div className="optimization-result__signal">
          <div className="signal-ring">
            <span />
          </div>

          <div>
            <span className="signal-label">
              DETECTED SIGNAL
            </span>

            <strong>
              {metricName} utilization
            </strong>

            <div className="signal-meter">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? {
                        width: `${metricValue}%`,
                      }
                    : {
                        width: 0,
                      }
                }
                whileInView={{
                  width: `${metricValue}%`,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1,
                  delay: 0.25,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        </div>

        <div className="optimization-result__arrow">
          →
        </div>

        <div className="optimization-result__recommendation">
          <span className="signal-label">
            RECOMMENDED ACTION
          </span>

          <h3>
            {recommendation.title}
          </h3>

          <p>
            {recommendation.description}
          </p>
        </div>
      </div>

      <div className="optimization-result__footer">
        <span>
          WORKLOAD: {resource.name.toUpperCase()}
        </span>

        <span>
          PROVIDER: {resource.provider}
        </span>

        <span className="optimization-result__status">
          <span />
          OPTIMIZATION READY
        </span>
      </div>
    </motion.section>
  )
}