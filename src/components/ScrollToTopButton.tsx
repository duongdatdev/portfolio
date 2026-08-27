import { useState, useEffect } from 'react'
import { ChevronUpIcon } from './Icons'

type ScrollToTopButtonProps = {
  motionEnabled?: boolean
}

export function ScrollToTopButton({ motionEnabled = true }: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: motionEnabled ? 'smooth' : 'instant' })
  }

  return (
    <button
      className={`scroll-to-top${visible ? ' visible' : ''}${!motionEnabled ? ' motion-disabled' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
      type="button"
    >
      <ChevronUpIcon />
    </button>
  )
}
