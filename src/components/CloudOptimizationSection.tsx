import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { useRef } from "react"

import { useResourceData } from "../hooks/useResourceData"
import { CloudNode } from "./CloudNode"
import { ConnectionLines } from "./ConnectionLines"
import { OptimizationResult } from "./OptimizationResult"
import { ResourcePanel } from "./ResourcePanel"

const providers = [
  "AWS",
  "Azure",
  "GCP",
  "On-Premise",
] as const

export function CloudOptimizationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const analysisRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, isError } = useResourceData()
  const shouldReduceMotion = useReducedMotion()

  const featuredResource = data?.[0]

  /*
   * Track the analysis stage as it moves through
   * the viewport. This creates a real scroll-driven
   * transition instead of relying only on entrance
   * animations.
   */
  const { scrollYProgress } = useScroll({
    target: analysisRef,
    offset: ["start 85%", "center 45%"],
  })

  const analysisOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    [0.35, 1, 1],
  )

  const analysisY = useTransform(
    scrollYProgress,
    [0, 1],
    [60, 0],
  )

  const analysisScale = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [0.96, 1, 1],
  )

  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"],
  )

  return (
    <section
      ref={sectionRef}
      className="optimization-section"
      aria-labelledby="cloudpulse-heading"
    >
      <div className="section-container">

        {/* =========================================
            STAGE 1 — INTRO
        ========================================== */}

        <motion.div
          className="section-intro"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="eyebrow">
            CLOUDPULSE / INTELLIGENCE
          </span>

          <h1 id="cloudpulse-heading">
            See where your
            <span> cloud resources </span>
            are going.
          </h1>

          <p>
            Bring distributed infrastructure into one
            clear view, identify inefficient resources,
            and uncover optimization opportunities.
          </p>
        </motion.div>

        {/* =========================================
            STAGE 1 — INFRASTRUCTURE MAP
        ========================================== */}

        <motion.div
          className="cloud-map"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 35,
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="cloud-grid"
            aria-hidden="true"
          />

          <ConnectionLines />

          <div className="provider-nodes">
            {providers.map((provider, index) => (
              <CloudNode
                key={provider}
                provider={provider}
                index={index}
              />
            ))}
          </div>

          <motion.div
            className="analysis-core"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.7,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.8,
              delay: shouldReduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span>RESOURCE</span>
            <strong>ANALYSIS</strong>
            <small>LIVE INTELLIGENCE</small>
          </motion.div>

          <motion.div
            className="map-status"
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
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : 1.1,
            }}
          >
            <span
              className="status-dot"
              aria-hidden="true"
            />

            Infrastructure connected
          </motion.div>
        </motion.div>

        {/* =========================================
            STAGE 2 — RESOURCE ANALYSIS
        ========================================== */}

        <div
          ref={analysisRef}
          className="analysis-stage"
        >
          <div className="analysis-stage__heading">
            <div>
              <span className="eyebrow">
                STAGE 02 / RESOURCE INTELLIGENCE
              </span>

              <h2>
                One view.
                <span> Every resource signal.</span>
              </h2>

              <p>
                CloudPulse aggregates infrastructure signals
                into a single workload profile so inefficient
                resource usage becomes easier to identify.
              </p>
            </div>

            <div
              className="analysis-stage__indicator"
              aria-hidden="true"
            >
              <span>ANALYSIS PROGRESS</span>

              <div className="analysis-stage__track">
                <motion.div
                  className="analysis-stage__progress"
                  style={{
                    width: shouldReduceMotion
                      ? "100%"
                      : progressWidth,
                  }}
                />
              </div>
            </div>
          </div>

          {isLoading && (
            <motion.div
              className="status-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span
                className="loading-dot"
                aria-hidden="true"
              />

              Loading resource intelligence...
            </motion.div>
          )}

          {isError && (
            <motion.div
              className="status-card status-card--error"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              We couldn't load the resource data.
              Please refresh and try again.
            </motion.div>
          )}

          {featuredResource && (
            <motion.div
              className="analysis-stage__content"
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: analysisOpacity,
                      y: analysisY,
                      scale: analysisScale,
                    }
              }
            >
              <div className="analysis-stage__label">
                <span>SELECTED WORKLOAD</span>

                <span className="analysis-stage__live">
                  <span />
                  LIVE SIGNAL
                </span>
              </div>

              <ResourcePanel
                resource={featuredResource}
              />

              {/* =====================================
                  STAGE 3 — OPTIMIZATION
              ====================================== */}

              <motion.div
                className="optimization-transition"
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 25,
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
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="optimization-transition__line" />

                <span className="optimization-transition__text">
                  ANALYSIS COMPLETE
                </span>

                <span className="optimization-transition__line" />
              </motion.div>

              <OptimizationResult
                resource={featuredResource}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}