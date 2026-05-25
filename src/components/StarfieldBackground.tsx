import { useEffect, useRef } from 'react'

interface StarfieldBackgroundProps {
  isWarping?: boolean
  motionEnabled?: boolean
}

export function StarfieldBackground({ isWarping = false, motionEnabled = true }: StarfieldBackgroundProps) {
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

    // Star properties
    const numStars = 800
    const stars: { x: number; y: number; z: number; size: number; speed: number }[] = []

    for (let i = 0; i < numStars; i++) {
      const z = Math.random() * width
      stars.push({
        x: (Math.random() * width - width / 2) * (z / 128.0),
        y: (Math.random() * height - height / 2) * (z / 128.0),
        z: z,
        size: Math.random() * 1.5 + 0.8,
        speed: Math.random() * 1.2 + 0.3,
      })
    }

    let currentSpeedMultiplier = 1.0

    const draw = () => {
      if (motionEnabled) {
        // Smoothly interpolate center point for mouse parallax
        currentCenterX += (targetCenterX - currentCenterX) * 0.08
        currentCenterY += (targetCenterY - currentCenterY) * 0.08

        // Smoothly interpolate speed multiplier for warp transition
        const targetSpeedMultiplier = isWarpingRef.current ? 22.0 : 1.0
        currentSpeedMultiplier += (targetSpeedMultiplier - currentSpeedMultiplier) * 0.08
      } else {
        currentCenterX = width / 2
        currentCenterY = height / 2
        currentSpeedMultiplier = 1.0
      }

      ctx.fillStyle = '#10130f' // matching var(--bg)
      ctx.fillRect(0, 0, width, height)

      // Add a very subtle gradient overlay
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.1
      )
      gradient.addColorStop(0, 'rgba(180, 231, 173, 0.05)') // subtle mint
      gradient.addColorStop(1, 'rgba(16, 19, 15, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw stars
      for (let i = 0; i < numStars; i++) {
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
          // Scale star size: add a base size so far-away stars are visible, and clamp max size
          const size = Math.min(star.size * k + 0.6, 4.5)

          // Smoothly fade in when born (far away) and fade out when passing by (close)
          let alpha = 1.0
          if (star.z < 80) {
            alpha = star.z / 80 // fade out as it gets very close
          } else if (star.z > width - 150) {
            alpha = (width - star.z) / 150 // fade in when spawning far away
          }
          alpha = Math.max(0, Math.min(1, alpha))

          if (!motionEnabled) {
            // Only draw a subset of stars (approx 40%) and make them much dimmer (35% alpha)
            if (i % 5 !== 0 && i % 5 !== 2) {
              continue
            }
            alpha *= 0.35
          }

          if (currentSpeedMultiplier > 1.2) {
            // Draw as a streak from previous position
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
            ctx.fillStyle = `rgba(180, 231, 173, ${alpha})` // mint color '#b4e7ad'
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
