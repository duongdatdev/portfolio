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
    degree: 'Current GPA: 3.37',
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

      <section className="section-block experience-section">
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
