import { ProfilePhoto } from './ProfilePhoto'
import { ProjectMedia } from './ProjectMedia'
import { projects } from '../data/projects'

const skills = [
  'C#',
  'Unity',
  'JavaScript',
  'TypeScript',
  'Vue 3',
  'Laravel',
  'Java',
  'Git',
]

const education = [
  {
    school:
      'Vietnam - Korea University of Information and Communication Technology (2023-2028)',
    degree: 'Current GPA: 3.35',
  },
]

type HomePageProps = {
  onSelectProject: (project: string) => void
}

export function HomePage({ onSelectProject }: HomePageProps) {
  return (
    <>
      <section className="intro" id="top">
        <ProfilePhoto />
        <div className="intro-copy">
          <h2>Hi, I'm Dat</h2>
          <p>
            I am an Information Technology engineering student majoring in{' '}
            <strong>Software Engineering</strong>, passionate about game
            development and interactive experiences.
          </p>
          <p>
            I enjoy <strong>solving problems</strong>, learning new
            technologies, and building games that feel good to play. I focus on
            writing clean, readable code and continuously improving my skills in{' '}
            <strong>Unity</strong>, <strong>C#</strong>, gameplay programming,
            UI systems, and backend integration.
          </p>
        </div>
      </section>

      <section className="section-block">
        <h2>Game Programming</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <button
              key={project.slug}
              className="project-card"
              type="button"
              onClick={() => onSelectProject(project.title)}
            >
              <ProjectMedia
                imageSrc={project.card.imageSrc}
                videoSrc={project.card.videoSrc}
                alt={project.card.alt}
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
            </button>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Educations</h2>
        <div className="education-grid">
          {education.map((item) => (
            <article className="info-card" key={item.school}>
              <h3>{item.school}</h3>
              <p>{item.degree}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block skills-block">
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
