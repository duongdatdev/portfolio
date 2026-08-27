import { useState, useEffect, useRef } from 'react'

type ProjectMediaProps = {
  imageSrc: string
  videoSrc?: string
  alt: string
  className?: string
  playOnHover?: boolean
  autoPlayOnce?: boolean
  motionEnabled?: boolean
}

export function ProjectMedia({
  imageSrc,
  videoSrc,
  alt,
  className = 'project-image screenshot-scene',
  playOnHover = true,
  autoPlayOnce = false,
  motionEnabled = true,
}: ProjectMediaProps) {
  const [failedVideoSrc, setFailedVideoSrc] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canPlayVideo = Boolean(
    motionEnabled && videoSrc && failedVideoSrc !== videoSrc,
  )

  useEffect(() => {
    if (!autoPlayOnce || !canPlayVideo) return

    const video = videoRef.current
    if (!video) return

    video.play().catch((err) => {
      console.log('Autoplay once failed:', err)
    })

    const timer = setTimeout(() => {
      video.pause()
    }, 2000)

    return () => clearTimeout(timer)
  }, [autoPlayOnce, canPlayVideo, videoSrc])

  useEffect(() => {
    if (!playOnHover || !canPlayVideo) return

    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const hoverTarget = container.closest('.project-card') || container

    const handleMouseEnter = () => {
      video.play().catch((err) => {
        console.log('Play interrupted or failed:', err)
      })
    }

    const handleMouseLeave = () => {
      video.pause()
      video.currentTime = 0
    }

    hoverTarget.addEventListener('mouseenter', handleMouseEnter)
    hoverTarget.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      hoverTarget.removeEventListener('mouseenter', handleMouseEnter)
      hoverTarget.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [canPlayVideo, videoSrc, playOnHover])

  return (
    <div className={className} ref={containerRef}>
      {canPlayVideo && videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={imageSrc}
          autoPlay={!playOnHover}
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={alt}
          onError={() => setFailedVideoSrc(videoSrc)}
        />
      ) : (
        <img src={imageSrc} alt={alt} />
      )}
    </div>
  )
}
