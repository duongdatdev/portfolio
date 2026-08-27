import React from 'react'
import { ProfilePhoto } from './ProfilePhoto'
import { ProjectMedia } from './ProjectMedia'
import { projects } from '../data/projects'

const skills = [
  'C#',
  'Unity',
  'JavaScript',
  'TypeScript',
  'Java',
  'Solidity',
  'Git',
]

const education = [
  {
    school:
      'Vietnam - Korea University of Information and Communication Technology (2023-2028)',
    degree: 'Current GPA: 3.38',
  },
]

const experience = {
  role: 'Game Developer Intern',
  company: 'Purus Games',
  period: 'Jun 2026 – Jul 2026',
  location: 'Da Nang, Vietnam',
  highlights: [
    'Built interactive 2D and 3D graphics projects using JavaScript, HTML5 Canvas, PixiJS, and WebGL.',
    'Implemented GLSL shaders, lighting, texturing, transformations, and camera systems for real-time rendering.',
    'Created small visual demos with reusable code, Git version control, and systematic debugging.',
  ],
}

// Exactly 4 featured games on the main home page in specified order: VectoArena -> Unifire2D -> Voxel Sandbox -> Earth 2048
const featuredProjects = [
  ...projects.filter((project) => project.slug === 'vectoarena'),
  ...projects.filter((project) => project.slug === 'unifire2d'),
  ...projects.filter((project) => project.slug === 'voxel-sandbox'),
  ...projects.filter((project) => project.slug === 'earth-2048'),
].slice(0, 4)

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects-section' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

type HomePageProps = {
  onSelectProject: (project: string, slug: string) => void
  onNavigateToAllProjects: () => void
  motionEnabled: boolean
}

export function HomePage({
  onSelectProject,
  onNavigateToAllProjects,
  motionEnabled,
}: HomePageProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' })
    }
  }

  return (
    <>
      <nav className="quick-nav" aria-label="Page navigation">
        <div className="quick-nav-inner">
          {navLinks.map((link, idx) => (
            <React.Fragment key={link.href}>
              {idx > 0 && (
                <span className="quick-nav-divider" aria-hidden="true">
                  •
                </span>
              )}
              <a
                href={link.href}
                className="quick-nav-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </div>
      </nav>

      <section className="intro" id="about">
        <ProfilePhoto />
        <div className="intro-copy">
          <h1>Hi, I'm Dat</h1>
          <p>
            I am a <strong>Software Engineering</strong> student passionate
            about building robust software, interactive applications, and
            real-time games.
          </p>
          <p>
            I focus on clean architecture, problem-solving, and high-performance
            code across C# / Unity, TypeScript / WebGL, Java, and backend systems.
          </p>
        </div>
      </section>

      <section className="section-block experience-section" id="experience">
        <h2>Work Experience</h2>
        <div className="career-timeline">
          <article className="career-step career-step-current">
            <div className="career-marker" aria-hidden="true" />
            <div className="experience-heading">
              <div>
                <h3>{experience.role}</h3>
                <p className="experience-company">{experience.company}</p>
              </div>
              <div className="experience-meta">
                <span>{experience.period}</span>
                <span>{experience.location}</span>
              </div>
            </div>

            <ul className="experience-highlights">
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>

          <article className="career-step career-step-next">
            <div className="career-marker" aria-hidden="true" />
            <span className="career-next-date">What comes next</span>
            <h3>Your company, perhaps?</h3>
            <p>
              I’m looking for the next team where I can build games, solve
              interesting problems, and keep improving.
            </p>
            <a href="mailto:duongbaodat.dev@gmail.com">Start a conversation</a>
          </article>
        </div>
      </section>

      <section className="section-block" id="projects-section">
        <div className="section-header-row">
          <h2>Game Programming</h2>
          <button
            type="button"
            className="view-all-link"
            onClick={onNavigateToAllProjects}
          >
            <span>All Projects ({projects.length})</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <a
              key={project.slug}
              className="project-card"
              href={`#${project.slug}`}
              data-project-slug={project.slug}
              onClick={(event) => {
                if (
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                ) {
                  return
                }

                event.preventDefault()
                onSelectProject(project.title, project.slug)
              }}
            >
              <ProjectMedia
                imageSrc={project.card.imageSrc}
                videoSrc={project.card.videoSrc}
                alt={project.card.alt}
                motionEnabled={motionEnabled}
              />
              <div className="project-card-body">
                <div className="project-meta">{project.meta}</div>
                <div className="project-card-heading">
                  <h3>{project.title}</h3>
                  <span>{'>'}</span>
                </div>
                <p>{project.role}</p>
                <p>{project.shortDescription}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="view-all-projects-wrapper">
          <button
            type="button"
            className="view-all-projects-btn"
            onClick={onNavigateToAllProjects}
          >
            <span>Explore All Projects ({projects.length})</span>
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </section>

      <section className="section-block" id="education">
        <h2>Education</h2>
        <div className="education-grid">
          {education.map((item) => (
            <article className="info-card" key={item.school}>
              <h3>{item.school}</h3>
              <p>{item.degree}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block skills-block" id="skills">
        <h2>Technical Skills</h2>
        <div className="skill-list">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>
    </>
  )
}
