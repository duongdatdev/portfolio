import { useEffect, useRef } from 'react'

interface StarfieldBackgroundProps {
  isWarping?: boolean
  motionEnabled?: boolean
}

export function StarfieldBackground({
  isWarping = false,
  motionEnabled = true,
}: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isWarpingRef = useRef(isWarping)

  useEffect(() => {
    isWarpingRef.current = isWarping
  }, [isWarping])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let targetCenterX = width / 2
    let targetCenterY = height / 2
    let currentCenterX = width / 2
    let currentCenterY = height / 2

    // Adapt particle count: reduced on mobile (<600px) and tablets (<900px), full on desktop
    const getStarCount = (screenWidth: number) => {
      if (screenWidth <= 600) return 180 // Fewer stars on mobile so background is clean and text stands out
      if (screenWidth <= 900) return 380
      return 800 // Full cosmic starfield on desktop
    }

    let numStars = getStarCount(width)
    let stars: {
      x: number
      y: number
      z: number
      size: number
      speed: number
    }[] = []

    const initStars = (count: number) => {
      stars = []
      for (let i = 0; i < count; i++) {
        const z = Math.random() * width
        stars.push({
          x: (Math.random() * width - width / 2) * (z / 128.0),
          y: (Math.random() * height - height / 2) * (z / 128.0),
          z: z,
          size: Math.random() * 1.5 + 0.8,
          speed: Math.random() * 1.2 + 0.3,
        })
      }
    }

    initStars(numStars)

    let currentSpeedMultiplier = 1.0

    const draw = () => {
      if (motionEnabled) {
        // Smoothly interpolate center point for mouse parallax
        currentCenterX += (targetCenterX - currentCenterX) * 0.08
        currentCenterY += (targetCenterY - currentCenterY) * 0.08

        // Smoothly interpolate speed multiplier for warp transition
        const targetSpeedMultiplier = isWarpingRef.current ? 22.0 : 1.0
        currentSpeedMultiplier +=
          (targetSpeedMultiplier - currentSpeedMultiplier) * 0.08
      } else {
        currentCenterX = width / 2
        currentCenterY = height / 2
        currentSpeedMultiplier = 1.0
      }

      ctx.fillStyle = '#10130f' // matching var(--bg)
      ctx.fillRect(0, 0, width, height)

      // Add a subtle radial gradient glow in the center
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.1,
      )
      gradient.addColorStop(0, 'rgba(180, 231, 173, 0.05)')
      gradient.addColorStop(1, 'rgba(16, 19, 15, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw stars
      const isMobile = width <= 600
      const maxStarSize = isMobile ? 3.0 : 4.5

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]

        if (motionEnabled) {
          star.z -= star.speed * currentSpeedMultiplier

          if (star.z <= 0) {
            star.z = width
            star.x = (Math.random() * width - width / 2) * (width / 128.0)
            star.y = (Math.random() * height - height / 2) * (width / 128.0)
          }
        }

        // Project 3d coordinates onto 2d screen
        const k = 128.0 / star.z
        const px = star.x * k + currentCenterX
        const py = star.y * k + currentCenterY

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          // Scale star size
          const size = Math.min(star.size * k + 0.6, maxStarSize)

          // Smoothly fade in when born (far away) and fade out when passing by (close)
          let alpha = 1.0
          if (star.z < 80) {
            alpha = star.z / 80
          } else if (star.z > width - 150) {
            alpha = (width - star.z) / 150
          }
          alpha = Math.max(0, Math.min(1, alpha))

          if (isMobile) {
            alpha *= 0.85 // slightly softer star opacity on mobile
          }

          if (currentSpeedMultiplier > 1.2) {
            // Draw as a streak during warp transition
            const prevZ = star.z + star.speed * currentSpeedMultiplier
            const prevK = 128.0 / prevZ
            const ppx = star.x * prevK + currentCenterX
            const ppy = star.y * prevK + currentCenterY

            ctx.beginPath()
            ctx.moveTo(ppx, ppy)
            ctx.lineTo(px, py)
            ctx.lineWidth = size * 0.8
            ctx.lineCap = 'round'
            ctx.strokeStyle = `rgba(180, 231, 173, ${alpha})`
            ctx.stroke()
          } else {
            ctx.beginPath()
            ctx.arc(px, py, size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(180, 231, 173, ${alpha})`
            ctx.fill()
          }
        }
      }

      if (motionEnabled) {
        animationFrameId = requestAnimationFrame(draw)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - width / 2
      const dy = e.clientY - height / 2
      targetCenterX = width / 2 - dx * 0.08
      targetCenterY = height / 2 - dy * 0.08
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      targetCenterX = width / 2
      targetCenterY = height / 2
      currentCenterX = width / 2
      currentCenterY = height / 2

      const newCount = getStarCount(width)
      if (newCount !== numStars) {
        numStars = newCount
        initStars(numStars)
      }

      if (!motionEnabled) {
        draw()
      }
    }

    window.addEventListener('resize', handleResize)
    if (motionEnabled) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [motionEnabled])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
