import { useEffect, useRef } from 'react'

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Star properties
    const numStars = 120
    const stars: { x: number; y: number; z: number; size: number; speed: number }[] = []

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.2 + 0.4,
        speed: Math.random() * 1.2 + 0.3,
      })
    }

    const draw = () => {
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
      ctx.fillStyle = '#b4e7ad' // var(--mint) color
      for (let i = 0; i < numStars; i++) {
        const star = stars[i]
        star.z -= star.speed

        if (star.z <= 0) {
          star.z = width
          star.x = Math.random() * width - width / 2
          star.y = Math.random() * height - height / 2
        }

        // Project 3d coordinates onto 2d screen
        const k = 128.0 / star.z
        const px = star.x * k + width / 2
        const py = star.y * k + height / 2

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = star.size * k
          ctx.beginPath()
          ctx.arc(px, py, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

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
