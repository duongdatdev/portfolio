import { useLayoutEffect, useRef } from 'react'
import { BackIcon, ExternalIcon } from './Icons'
import { ProjectMedia } from './ProjectMedia'
import { getProjectByTitle } from '../data/projects'

type ProjectPageProps = {
  title: string
  onBack: () => void
  motionEnabled: boolean
}

export function ProjectPage({ title, onBack, motionEnabled }: ProjectPageProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const project = getProjectByTitle(title)

  useLayoutEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [title])

  if (!project) {
    return null
  }

  return (
    <section className="project-page">
      <button className="back-link" type="button" onClick={onBack}>
        <BackIcon />
        <span>Go Back</span>
      </button>

      <div className="project-detail">
        <ProjectMedia
          imageSrc={project.hero.imageSrc}
          videoSrc={project.hero.videoSrc}
          alt={project.hero.alt}
          className="project-hero-image"
          autoPlayOnce={true}
          motionEnabled={motionEnabled}
        />
        <h1 ref={headingRef} tabIndex={-1}>{project.title}</h1>
        <div className="detail-grid">
          <article className="info-card">
            <h3>About</h3>
            {project.about.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </article>
          <article className="info-card">
            <h3>Project Info</h3>
            <ul>
              {project.info.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      <div className="project-writeup">
        {project.codeLink && (
          <a
            className="code-link"
            href={project.codeLink.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{project.codeLink.label}</span>
            <ExternalIcon />
          </a>
        )}

        {project.youtubeEmbed && (
          <>
            <h2>Gameplay Demo</h2>
            {project.demoDescription && <p>{project.demoDescription}</p>}

            <div className="video-embed-container">
              <iframe
                src={project.youtubeEmbed.src}
                title={project.youtubeEmbed.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </>
        )}

        {project.actionLinks && (
          <div className="project-action-links">
            {project.actionLinks.map((link, i) => (
              <a
                key={i}
                className={link.className}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{link.label}</span>
                <ExternalIcon />
              </a>
            ))}
          </div>
        )}

        {project.sections.map((section, i) => (
          <div key={i}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((text, j) => (
              <p key={j}>{text}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
