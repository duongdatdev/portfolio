import { useState, useLayoutEffect, useRef } from 'react'
import { BackIcon } from './Icons'
import { ProjectMedia } from './ProjectMedia'
import { projects } from '../data/projects'

type AllProjectsPageProps = {
  onSelectProject: (project: string, slug: string) => void
  onBack: () => void
  motionEnabled: boolean
}

type FilterCategory = 'All' | 'Unity' | 'WebGL' | 'Java' | 'Web'

export function AllProjectsPage({
  onSelectProject,
  onBack,
  motionEnabled,
}: AllProjectsPageProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All')

  useLayoutEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  const categories: { label: string; value: FilterCategory; count: number }[] = [
    { label: 'All', value: 'All', count: projects.length },
    {
      label: 'Unity',
      value: 'Unity',
      count: projects.filter((p) => p.category === 'Unity').length,
    },
    {
      label: 'WebGL / 3D',
      value: 'WebGL',
      count: projects.filter((p) => p.category === 'WebGL').length,
    },
    {
      label: 'Java',
      value: 'Java',
      count: projects.filter((p) => p.category === 'Java').length,
    },
    {
      label: 'Web',
      value: 'Web',
      count: projects.filter((p) => p.category === 'Web').length,
    },
  ]

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  return (
    <section className="all-projects-page">
      <button className="back-link" type="button" onClick={onBack}>
        <BackIcon />
        <span>Back to Home</span>
      </button>

      <div className="all-projects-header">
        <h1 ref={headingRef} tabIndex={-1}>
          All Projects
        </h1>
        <p className="all-projects-subtitle">
          Explore all of my game development, graphics engine, multiplayer systems,
          and interactive software projects.
        </p>

        <div className="filter-chips" role="tablist" aria-label="Filter projects by technology">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              role="tab"
              aria-selected={activeFilter === cat.value}
              className={`filter-chip ${activeFilter === cat.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.value)}
            >
              <span>{cat.label}</span>
              <span className="filter-count">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid all-projects-grid">
        {filteredProjects.map((project) => (
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
    </section>
  )
}
