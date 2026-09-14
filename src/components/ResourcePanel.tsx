import { motion, useReducedMotion } from "framer-motion"
import type { CloudResource } from "../types/resource"

interface ResourcePanelProps {
  resource: CloudResource
}

const metricLabels = [
  { key: "cpu", label: "CPU" },
  { key: "ram", label: "RAM" },
  { key: "gpu", label: "GPU" },
  { key: "storage", label: "Storage" },
  { key: "network", label: "Network" },
] as const

export function ResourcePanel({ resource }: ResourcePanelProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="resource-panel"
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 36,
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
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="resource-panel__header">
        <div>
          <span className="eyebrow">
            RESOURCE ANALYSIS
          </span>

          <h3>{resource.name}</h3>

          <p>
            {resource.provider} infrastructure
          </p>
        </div>

        <div
          className="efficiency"
          aria-label={`Efficiency ${resource.efficiency}%`}
        >
          <span>Efficiency</span>

          <strong>
            {resource.efficiency}%
          </strong>
        </div>
      </div>

      <div className="resource-panel__divider" />

      <div className="metrics">
        {metricLabels.map((metric, index) => {
          const value = resource.metrics[metric.key]

          return (
            <motion.div
              className="metric"
              key={metric.key}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 10,
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
              }}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion
                  ? 0
                  : index * 0.06,
              }}
            >
              <div className="metric__top">
                <span>{metric.label}</span>

                <span>{value}%</span>
              </div>

              <div
                className="metric__track"
                role="progressbar"
                aria-label={`${metric.label} utilization`}
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  className="metric__bar"
                  initial={
                    shouldReduceMotion
                      ? { width: `${value}%` }
                      : { width: 0 }
                  }
                  whileInView={{
                    width: `${value}%`,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: shouldReduceMotion
                      ? 0
                      : 0.15 + index * 0.08,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="resource-panel__footer">
        <span>
          LIVE RESOURCE SIGNAL
        </span>

        <span className="resource-panel__pulse">
          <span />
          Monitoring
        </span>
      </div>
    </motion.div>
  )
}