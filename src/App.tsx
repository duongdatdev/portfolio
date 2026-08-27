import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import './App.css'
import { StarfieldBackground } from './components/StarfieldBackground'
import { ContactSection } from './components/ContactSection'
import { ScrollToTopButton } from './components/ScrollToTopButton'
import { HomePage } from './components/HomePage'
import { ProjectPage } from './components/ProjectPage'
import {
  LinkedinIcon,
  GithubIcon,
  ItchIcon,
  ResumeIcon,
  PlayIcon,
  PauseIcon,
} from './components/Icons'
import { slugToTitle, titleToSlug } from './data/projects'

const DEFAULT_PAGE_TITLE = 'Duong Bao Dat | Game Developer Portfolio'

const getProjectFromHash = () => {
  const hash = window.location.hash.replace('#', '')
  return slugToTitle(hash)
}

const getInitialMotionPreference = () => {
  const saved = localStorage.getItem('portfolio_motion')
  if (saved !== null) {
    return saved !== 'false'
  }

  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function App() {
  const [selectedProject, setSelectedProject] = useState<string | null>(getProjectFromHash)
  const [isWarping, setIsWarping] = useState(false)
  const [motionEnabled, setMotionEnabled] = useState(getInitialMotionPreference)
  const [initialWarp, setInitialWarp] = useState(motionEnabled)
  const selectedProjectRef = useRef(selectedProject)
  const homeScrollPositionRef = useRef(0)
  const projectOriginSlugRef = useRef<string | null>(null)
  const shouldRestoreHomeRef = useRef(false)
  const canReturnWithHistoryRef = useRef(false)

  useEffect(() => {
    const handleHashChange = () => {
      const nextProject = getProjectFromHash()
      shouldRestoreHomeRef.current = Boolean(selectedProjectRef.current && !nextProject)
      selectedProjectRef.current = nextProject
      setSelectedProject(nextProject)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useLayoutEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    if (!shouldRestoreHomeRef.current) return

    shouldRestoreHomeRef.current = false
    window.scrollTo({
      top: homeScrollPositionRef.current,
      left: 0,
      behavior: 'instant',
    })

    const originSlug = projectOriginSlugRef.current
    if (originSlug) {
      requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>(`[data-project-slug="${originSlug}"]`)
          ?.focus({ preventScroll: true })
      })
    }
  }, [selectedProject])

  useEffect(() => {
    document.title = selectedProject
      ? `${selectedProject} | Duong Bao Dat`
      : DEFAULT_PAGE_TITLE
  }, [selectedProject])

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handlePreferenceChange = () => {
      if (localStorage.getItem('portfolio_motion') === null) {
        setMotionEnabled(!reducedMotionQuery.matches)
      }
    }

    reducedMotionQuery.addEventListener('change', handlePreferenceChange)
    return () => reducedMotionQuery.removeEventListener('change', handlePreferenceChange)
  }, [])

  useEffect(() => {
    if (!motionEnabled) return
    const timer = setTimeout(() => {
      setInitialWarp(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [motionEnabled])

  const toggleMotion = () => {
    setMotionEnabled((prev) => {
      const next = !prev
      localStorage.setItem('portfolio_motion', String(next))
      return next
    })
  }

  const handleSelectProject = (title: string, slug: string) => {
    homeScrollPositionRef.current = window.scrollY
    projectOriginSlugRef.current = slug
    canReturnWithHistoryRef.current = true

    if (motionEnabled) {
      setIsWarping(true)
      setTimeout(() => {
        const projectSlug = titleToSlug(title)
        if (projectSlug) {
          window.location.hash = projectSlug
        }
        setIsWarping(false)
      }, 800)
    } else {
      const slug = titleToSlug(title)
      if (slug) {
        window.location.hash = slug
      }
    }
  }

  const handleBack = () => {
    const navigateHome = () => {
      if (canReturnWithHistoryRef.current) {
        canReturnWithHistoryRef.current = false
        window.history.back()
      } else {
        window.history.replaceState(
          window.history.state,
          '',
          `${window.location.pathname}${window.location.search}`,
        )
        shouldRestoreHomeRef.current = true
        selectedProjectRef.current = null
        setSelectedProject(null)
      }
    }

    if (motionEnabled) {
      setIsWarping(true)
      setTimeout(() => {
        navigateHome()
        setIsWarping(false)
      }, 800)
    } else {
      navigateHome()
    }
  }

  return (
    <>
      <StarfieldBackground isWarping={isWarping || initialWarp} motionEnabled={motionEnabled} />
      <main className={`portfolio ${isWarping ? 'warp-active' : ''} ${!motionEnabled ? 'motion-disabled' : ''}`}>
        <header className="site-header" key={selectedProject ? 'project' : 'home'}>
          <a
            className="brand"
            href="#top"
            aria-label="Duong Bao Dat home"
            onClick={(event) => {
              event.preventDefault()
              if (selectedProject) {
                handleBack()
              } else {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: motionEnabled ? 'smooth' : 'auto',
                })
              }
            }}
          >
            <strong>Duong Bao Dat</strong>
            <span>Game Developer</span>
          </a>
          <nav className="socials" aria-label="Portfolio links and settings">
            <a href="https://www.linkedin.com/in/duongdatdev" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon />
            </a>
            <a href="https://github.com/duongdatdev" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <GithubIcon />
            </a>
            <a href="https://duongdat-dev.itch.io" aria-label="itch.io" target="_blank" rel="noopener noreferrer">
              <ItchIcon />
            </a>
            <a
              className="resume-link"
              href="/resume/CV-GameDeveloper-DuongBaoDat.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Resume</span>
              <ResumeIcon />
            </a>
            <button
              type="button"
              className="motion-toggle"
              onClick={toggleMotion}
              title={motionEnabled ? "Disable Background Motion" : "Enable Background Motion"}
              aria-label="Motion effects"
              aria-pressed={motionEnabled}
            >
              {motionEnabled ? <PauseIcon /> : <PlayIcon />}
            </button>
          </nav>
        </header>

        {selectedProject ? (
          <ProjectPage
            title={selectedProject}
            onBack={handleBack}
            motionEnabled={motionEnabled}
          />
        ) : (
          <>
            <HomePage onSelectProject={handleSelectProject} motionEnabled={motionEnabled} />
            <ContactSection />
          </>
        )}
      </main>
      <ScrollToTopButton motionEnabled={motionEnabled} />
    </>
  )
}

export default App
