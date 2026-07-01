import { useState, useEffect } from 'react'
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

function App() {
  const getProjectFromHash = () => {
    const hash = window.location.hash.replace('#', '')
    return slugToTitle(hash)
  }

  const [selectedProject, setSelectedProject] = useState<string | null>(getProjectFromHash)
  const [isWarping, setIsWarping] = useState(false)
  const [motionEnabled, setMotionEnabled] = useState(() => {
    const saved = localStorage.getItem('portfolio_motion')
    return saved !== 'false'
  })
  const [initialWarp, setInitialWarp] = useState(() => {
    const saved = localStorage.getItem('portfolio_motion')
    return saved !== 'false'
  })

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedProject(getProjectFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
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

  const handleSelectProject = (title: string) => {
    if (motionEnabled) {
      setIsWarping(true)
      setTimeout(() => {
        const slug = titleToSlug(title)
        if (slug) {
          window.location.hash = slug
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
    if (motionEnabled) {
      setIsWarping(true)
      setTimeout(() => {
        window.location.hash = ''
        setIsWarping(false)
      }, 800)
    } else {
      window.location.hash = ''
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
              handleBack()
            }}
          >
            <strong>Duong Bao Dat</strong>
            <span>Game Developer</span>
          </a>
          <nav className="socials" aria-label="Social links">
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
              className="motion-toggle"
              onClick={toggleMotion}
              title={motionEnabled ? "Disable Background Motion" : "Enable Background Motion"}
              aria-label="Toggle motion background"
            >
              {motionEnabled ? <PauseIcon /> : <PlayIcon />}
            </button>
          </nav>
        </header>

        {selectedProject ? (
          <ProjectPage
            title={selectedProject}
            onBack={handleBack}
          />
        ) : (
          <>
            <HomePage onSelectProject={handleSelectProject} />
            <ContactSection />
          </>
        )}
      </main>
      <ScrollToTopButton />
    </>
  )
}

export default App
