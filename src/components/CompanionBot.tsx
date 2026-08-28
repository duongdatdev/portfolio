import React, { useState, useEffect, useRef, useCallback } from 'react'
import './CompanionBot.css'
import type { BotMessage } from '../data/botMessages'
import {
  GREETING_MESSAGES,
  PROJECT_TIPS,
  FEATURE_TIPS,
  CLICK_REACTIONS,
  SWOOP_MESSAGES,
  STARTLED_MESSAGES,
} from '../data/botMessages'

interface CompanionBotProps {
  motionEnabled?: boolean
}

type BotMood = 'normal' | 'happy' | 'curious' | 'flying' | 'sleep' | 'startled'

export function CompanionBot({ motionEnabled = true }: CompanionBotProps) {
  const [isSleeping, setIsSleeping] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_bot_sleep') === 'true'
  })

  // Viewport-based dock position (bottom-right)
  const getDockPosition = useCallback(() => {
    const isMobile = window.innerWidth <= 600
    const marginX = isMobile ? 18 : 32
    const marginY = isMobile ? 90 : 115
    return {
      x: Math.max(20, window.innerWidth - marginX - (isMobile ? 52 : 64)),
      y: Math.max(60, window.innerHeight - marginY),
    }
  }, [])

  const [position, setPosition] = useState<{ x: number; y: number }>(getDockPosition)
  const [movementMode, setMovementMode] = useState<'docked' | 'flying' | 'snappy' | 'instant'>('instant')
  const [isSpinning, setIsSpinning] = useState(false)
  const [isBoosting, setIsBoosting] = useState(false)
  const [isStartled, setIsStartled] = useState(false)
  const [sparkActive, setSparkActive] = useState(false)
  const [mood, setMood] = useState<BotMood>('normal')
  const [currentMessage, setCurrentMessage] = useState<BotMessage | null>(null)
  const [isBubbleVisible, setIsBubbleVisible] = useState(false)

  // Tracking refs for state machine & latest values
  const positionRef = useRef(position)
  positionRef.current = position

  const mousePosRef = useRef({ x: -1, y: -1, hasEntered: false })
  const isInteractingRef = useRef(false)
  const isAtCursorRef = useRef(false)
  const isPatrollingRef = useRef(false)
  const bubbleTimerRef = useRef<number | null>(null)
  const idleTimerRef = useRef<number | null>(null)
  const patrolTimerRef = useRef<number | null>(null)
  const gentleReturnTimerRef = useRef<number | null>(null)

  // Calculate bubble alignment to stay strictly within viewport
  const getBubbleAlignmentClasses = () => {
    const isNearTop = position.y < 190
    const isNearLeft = position.x < 160
    const isNearRight = position.x > window.innerWidth - 190

    const classes = []
    if (isNearTop) classes.push('align-bottom')
    if (isNearLeft) classes.push('align-left')
    else if (isNearRight) classes.push('align-right')

    return classes.join(' ')
  }

  // Show a message in speech bubble
  const showMessage = useCallback((msg: BotMessage, duration = 6500) => {
    setCurrentMessage(msg)
    setMood(msg.mood)
    setIsBubbleVisible(true)

    if (bubbleTimerRef.current) {
      window.clearTimeout(bubbleTimerRef.current)
    }

    bubbleTimerRef.current = window.setTimeout(() => {
      setIsBubbleVisible(false)
    }, duration)
  }, [])

  // Hide message immediately
  const dismissMessage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsBubbleVisible(false)
    if (bubbleTimerRef.current) {
      window.clearTimeout(bubbleTimerRef.current)
    }
  }

  // Toggle sleep mode
  const toggleSleepMode = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsSleeping((prev) => {
      const next = !prev
      localStorage.setItem('portfolio_bot_sleep', String(next))
      if (next) {
        setIsBubbleVisible(false)
        isAtCursorRef.current = false
        isPatrollingRef.current = false
        if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current)
        if (gentleReturnTimerRef.current) window.clearTimeout(gentleReturnTimerRef.current)
        setPosition(getDockPosition())
      }
      return next
    })
  }

  // Handle retreat back to dock when startled by approaching cursor
  const triggerStartledRetreat = useCallback(() => {
    if (isSleeping) return

    // Clear gentle return timer
    if (gentleReturnTimerRef.current) {
      window.clearTimeout(gentleReturnTimerRef.current)
    }

    // Mark states
    isAtCursorRef.current = false
    isPatrollingRef.current = false

    // Startled animation & mood
    setIsStartled(true)
    setMood('startled')

    // Show quick startled exclamation
    const startledMsg = STARTLED_MESSAGES[Math.floor(Math.random() * STARTLED_MESSAGES.length)]
    showMessage(startledMsg, 1600)

    // Fast snappy retreat back to dock position
    setTimeout(() => {
      setMovementMode('flying')
      setIsBoosting(true)
      setPosition(getDockPosition())

      setTimeout(() => {
        setIsStartled(false)
        setIsBoosting(false)
        setMovementMode('docked')
        setMood('normal')
      }, 1100)
    }, 250)
  }, [isSleeping, getDockPosition, showMessage])

  // Handle gentle return to dock when cursor moves away calmly
  const triggerGentleReturn = useCallback(() => {
    if (isSleeping || !isAtCursorRef.current) return

    if (gentleReturnTimerRef.current) {
      window.clearTimeout(gentleReturnTimerRef.current)
    }

    // Give user 2.2 seconds before floating back to dock
    gentleReturnTimerRef.current = window.setTimeout(() => {
      if (isAtCursorRef.current) {
        isAtCursorRef.current = false
        setIsBubbleVisible(false)
        setMovementMode('flying')
        setPosition(getDockPosition())

        setTimeout(() => {
          setMovementMode('docked')
          setMood('normal')
        }, 1800)
      }
    }, 2400)
  }, [isSleeping, getDockPosition])

  // Update dock position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (movementMode === 'docked' || movementMode === 'instant' || isSleeping) {
        setMovementMode('instant')
        setPosition(getDockPosition())
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getDockPosition, movementMode, isSleeping])

  // Initial welcome greeting on page load
  useEffect(() => {
    if (isSleeping) return
    const initialTimer = setTimeout(() => {
      const welcomeMsg = GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)]
      showMessage(welcomeMsg, 6000)
    }, 1800)

    return () => clearTimeout(initialTimer)
  }, [isSleeping, showMessage])

  // Periodic Patrol / Swoop: every 5 - 8 seconds
  useEffect(() => {
    if (isSleeping || !motionEnabled) return

    let isMounted = true

    const scheduleNextPatrol = () => {
      if (!isMounted) return
      // Random patrol interval: 5 to 8 seconds
      const delay = 5000 + Math.random() * 3000

      patrolTimerRef.current = window.setTimeout(() => {
        // Only patrol if bot is currently idle at dock and not interacting or approaching cursor
        if (
          !isInteractingRef.current &&
          !isAtCursorRef.current &&
          !isPatrollingRef.current &&
          !isBubbleVisible
        ) {
          isPatrollingRef.current = true
          const width = window.innerWidth
          const height = window.innerHeight

          // Target a patrol point in the upper or middle screen area
          const targetX = Math.max(60, Math.min(width - 120, Math.random() * (width - 200) + 80))
          const targetY = Math.max(80, Math.min(height - 180, Math.random() * (height * 0.45) + 80))

          setMovementMode('flying')
          setIsBoosting(true)
          setMood('flying')
          setPosition({ x: targetX, y: targetY })

          // After reaching patrol waypoint
          window.setTimeout(() => {
            if (!isMounted || !isPatrollingRef.current) return
            setIsBoosting(false)

            // Randomly say a patrol quote or tip
            const tipsPool = Math.random() < 0.6 ? SWOOP_MESSAGES : PROJECT_TIPS
            const msg = tipsPool[Math.floor(Math.random() * tipsPool.length)]
            showMessage(msg, 3800)

            // Return to dock
            window.setTimeout(() => {
              if (!isMounted || isAtCursorRef.current) return
              setMovementMode('flying')
              setPosition(getDockPosition())

              window.setTimeout(() => {
                if (!isMounted) return
                isPatrollingRef.current = false
                setMovementMode('docked')
                setMood('normal')
                scheduleNextPatrol()
              }, 1400)
            }, 3600)
          }, 1800)
        } else {
          // Re-schedule check if busy
          scheduleNextPatrol()
        }
      }, delay)
    }

    scheduleNextPatrol()

    return () => {
      isMounted = false
      if (patrolTimerRef.current) window.clearTimeout(patrolTimerRef.current)
    }
  }, [isSleeping, motionEnabled, isBubbleVisible, getDockPosition, showMessage])

  // Mouse idle detection (2 seconds) & Mouse distance check (Startled if moving close, Gentle return if moving far)
  useEffect(() => {
    if (isSleeping || !motionEnabled) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY, hasEntered: true }

      // Check distance between mouse and bot
      const isMobile = window.innerWidth <= 600
      const botCenterX = positionRef.current.x + (isMobile ? 26 : 32)
      const botCenterY = positionRef.current.y + (isMobile ? 26 : 32)
      const dx = e.clientX - botCenterX
      const dy = e.clientY - botCenterY
      const distance = Math.sqrt(dx * dx + dy * dy)

      // If bot is currently at cursor or greeting:
      if (isAtCursorRef.current) {
        if (distance < 90) {
          // Di chuyển lại gần nó -> Giật mình và phóng về góc!
          triggerStartledRetreat()
        } else {
          // Di chuyển xa -> Sau một lúc tự về góc!
          triggerGentleReturn()
        }
      }

      // Reset 3-second idle timer
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current)
      }

      // If user stays still for 3 seconds (3000ms), bot flies over and greets!
      idleTimerRef.current = window.setTimeout(() => {
        if (
          !isInteractingRef.current &&
          !isSleeping &&
          mousePosRef.current.hasEntered &&
          !isAtCursorRef.current
        ) {
          if (gentleReturnTimerRef.current) {
            window.clearTimeout(gentleReturnTimerRef.current)
          }

          isAtCursorRef.current = true
          isPatrollingRef.current = false

          // Calculate destination near cursor
          const mx = mousePosRef.current.x
          const my = mousePosRef.current.y
          const targetX = Math.min(window.innerWidth - 80, Math.max(25, mx + 50))
          const targetY = Math.min(window.innerHeight - 90, Math.max(35, my - 50))

          setMovementMode('flying')
          setIsBoosting(true)
          setMood('curious')
          setPosition({ x: targetX, y: targetY })

          // After reaching near cursor, say greeting / tips
          window.setTimeout(() => {
            if (!isAtCursorRef.current) return
            setIsBoosting(false)
            setMood('happy')

            const greetingsPool = [...GREETING_MESSAGES, ...PROJECT_TIPS, ...FEATURE_TIPS]
            const greetMsg = greetingsPool[Math.floor(Math.random() * greetingsPool.length)]
            showMessage(greetMsg, 6000)
          }, 1200)
        }
      }, 3000)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current)
      if (gentleReturnTimerRef.current) window.clearTimeout(gentleReturnTimerRef.current)
    }
  }, [isSleeping, motionEnabled, showMessage, triggerStartledRetreat, triggerGentleReturn])

  // Handle manual click on Bot
  const handleBotClick = () => {
    isInteractingRef.current = true

    // Trigger spin & spark
    setIsSpinning(true)
    setSparkActive(true)
    setMood('happy')

    setTimeout(() => setIsSpinning(false), 750)
    setTimeout(() => setSparkActive(false), 500)

    // Select a click reaction or cycling tip
    const allReactions = [...CLICK_REACTIONS, ...PROJECT_TIPS, ...FEATURE_TIPS]
    const randomReaction = allReactions[Math.floor(Math.random() * allReactions.length)]
    showMessage(randomReaction, 6500)

    setTimeout(() => {
      isInteractingRef.current = false
    }, 1500)
  }

  // If user has minimized / put bot to sleep, show minimal wake-up badge
  if (isSleeping) {
    return (
      <button
        type="button"
        className="bot-minimized-badge"
        onClick={toggleSleepMode}
        title="Gọi AERO-01 thức dậy"
        aria-label="Wake companion bot"
      >
        <svg className="mini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" stroke="var(--mint, #b4e7ad)" fill="rgba(16, 19, 15, 0.9)" />
          <path d="M9 10h.01M15 10h.01M9 14c1 1.5 5 1.5 6 0" stroke="var(--lime, #a7df6f)" strokeLinecap="round" />
        </svg>
        <span>AERO-01 (Nghỉ ngơi)</span>
      </button>
    )
  }

  return (
    <div className="companion-bot-container" aria-hidden="false">
      <div
        className={`companion-bot-wrapper ${
          movementMode === 'flying' ? 'is-flying' : ''
        } ${movementMode === 'snappy' ? 'is-snappy' : ''} ${
          movementMode === 'instant' ? 'is-instant' : ''
        } ${!motionEnabled ? 'motion-disabled' : ''}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
        onClick={handleBotClick}
        role="button"
        tabIndex={0}
        aria-label="AERO-01 Companion Drone. Click to interact."
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleBotClick()
          }
        }}
      >
        {/* Spark particle burst effect */}
        {sparkActive && <div className="click-spark-burst" />}

        {/* Floating Drone Body */}
        <div
          className={`bot-body-container ${isSpinning ? 'is-spinning' : ''} ${
            isBoosting ? 'is-boosting' : ''
          } ${isStartled ? 'is-startled' : ''}`}
        >
          <svg
            className="bot-svg"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs & Gradients */}
            <defs>
              <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#253521" />
                <stop offset="50%" stopColor="#151e13" />
                <stop offset="100%" stopColor="#0c110a" />
              </linearGradient>
              <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#101c12" />
                <stop offset="100%" stopColor="#050a06" />
              </linearGradient>
              <linearGradient id="thrusterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b4e7ad" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#a7df6f" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#b8f7a4" stopOpacity="0" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Antenna with Pulsing Beacon */}
            <line x1="36" y1="14" x2="36" y2="4" stroke="#a7df6f" strokeWidth="2.2" strokeLinecap="round" />
            <circle
              className="antenna-beacon"
              cx="36"
              cy="4"
              r="3.5"
              fill={mood === 'startled' ? '#ffdf70' : '#ddff9f'}
              filter="url(#neonGlow)"
            />

            {/* Left & Right Wing Thrusters */}
            <path
              d="M10 32 L4 37 L7 44 L14 41 Z"
              fill="#182316"
              stroke="#b4e7ad"
              strokeWidth="1.2"
            />
            <path
              d="M62 32 L68 37 L65 44 L58 41 Z"
              fill="#182316"
              stroke="#b4e7ad"
              strokeWidth="1.2"
            />

            {/* Bottom Thruster Jet Flames */}
            <g className="thruster-glow">
              <ellipse cx="26" cy="59" rx="3.5" ry="8" fill="url(#thrusterGrad)" />
              <ellipse cx="46" cy="59" rx="3.5" ry="8" fill="url(#thrusterGrad)" />
            </g>

            {/* Main Spherical Hull */}
            <circle
              cx="36"
              cy="36"
              r="24"
              fill="url(#armorGrad)"
              stroke={mood === 'startled' ? '#ffdf70' : '#b4e7ad'}
              strokeWidth="2.2"
            />

            {/* Inner Tech Ring Accents */}
            <circle
              cx="36"
              cy="36"
              r="20.5"
              stroke="#a7df6f"
              strokeWidth="0.8"
              strokeDasharray="4 2"
              opacity="0.6"
            />

            {/* Dark LED Visor Screen */}
            <rect
              x="20"
              y="27"
              width="32"
              height="18"
              rx="9"
              fill="url(#visorGrad)"
              stroke={mood === 'startled' ? '#ffdf70' : '#b4e7ad'}
              strokeWidth="1.2"
            />

            {/* Visor Glare / Reflection */}
            <path
              d="M23 30 Q36 26 49 30"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />

            {/* LED Visor Eyes (Dynamic Mood Expressions) */}
            {mood === 'startled' && (
              <g filter="url(#neonGlow)">
                {/* ⊙ ⊙ Startled wide shock eyes */}
                <circle cx="28" cy="35" r="4.2" fill="#ffdf70" />
                <circle cx="28" cy="35" r="2.2" fill="#10130f" />
                <circle cx="44" cy="35" r="4.2" fill="#ffdf70" />
                <circle cx="44" cy="35" r="2.2" fill="#10130f" />
                {/* Little exclamation sweat / shock mark */}
                <path d="M53 23 L55 17 M55 25 L55 26" stroke="#ffdf70" strokeWidth="1.8" strokeLinecap="round" />
              </g>
            )}

            {mood === 'happy' && (
              <g stroke="#ddff9f" strokeWidth="2.4" strokeLinecap="round" fill="none" filter="url(#neonGlow)">
                {/* ^ ^ happy eyes */}
                <path d="M26 37 L29 33 L32 37" />
                <path d="M40 37 L43 33 L46 37" />
              </g>
            )}

            {mood === 'curious' && (
              <g filter="url(#neonGlow)">
                {/* ◉ ◉ curious wide eyes */}
                <circle cx="29" cy="35" r="3.5" fill="#ddff9f" />
                <circle cx="29" cy="35" r="1.5" fill="#10130f" />
                <circle cx="43" cy="35" r="3.5" fill="#ddff9f" />
                <circle cx="43" cy="35" r="1.5" fill="#10130f" />
              </g>
            )}

            {mood === 'flying' && (
              <g stroke="#b8f7a4" strokeWidth="2.2" strokeLinecap="round" fill="none" filter="url(#neonGlow)">
                {/* > < focus speed eyes */}
                <line x1="26" y1="33" x2="32" y2="37" />
                <line x1="46" y1="33" x2="40" y2="37" />
              </g>
            )}

            {mood === 'sleep' && (
              <g stroke="#a7df6f" strokeWidth="2" strokeLinecap="round" fill="none">
                {/* - - sleep eyes */}
                <line x1="26" y1="36" x2="32" y2="36" />
                <line x1="40" y1="36" x2="46" y2="36" />
              </g>
            )}

            {mood === 'normal' && (
              <g className="bot-eye-blink" filter="url(#neonGlow)">
                {/* • • friendly pill eyes */}
                <ellipse className="bot-eye" cx="29" cy="35" rx="2.8" ry="4" fill="#b8f7a4" />
                <ellipse className="bot-eye" cx="43" cy="35" rx="2.8" ry="4" fill="#b8f7a4" />
                {/* Tiny shine dot */}
                <circle cx="30" cy="33.5" r="1" fill="#ffffff" />
                <circle cx="44" cy="33.5" r="1" fill="#ffffff" />
              </g>
            )}
          </svg>
        </div>

        {/* Holographic Speech Bubble */}
        <div
          className={`bot-speech-bubble ${
            isBubbleVisible ? 'bubble-visible' : ''
          } ${getBubbleAlignmentClasses()}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bubble-header">
            <div className="bot-identity">
              <span className="status-dot" />
              <span>AERO-01 // COMPANION</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                type="button"
                className="bubble-close-btn"
                onClick={toggleSleepMode}
                title="Tạm nghỉ bot"
                aria-label="Put bot to sleep"
              >
                💤
              </button>
              <button
                type="button"
                className="bubble-close-btn"
                onClick={dismissMessage}
                title="Đóng tin nhắn"
                aria-label="Dismiss message"
              >
                ✕
              </button>
            </div>
          </div>

          <p className="bubble-text">{currentMessage?.text}</p>

          {currentMessage?.link && (
            <a
              href={currentMessage.link}
              className="bubble-action-btn"
              target={currentMessage.link.startsWith('http') || currentMessage.link.endsWith('.pdf') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              onClick={() => {
                setIsBubbleVisible(false)
              }}
            >
              <span>{currentMessage.actionHint || 'Khám phá ngay'}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}

          <div className="bubble-tail" />
        </div>
      </div>
    </div>
  )
}
