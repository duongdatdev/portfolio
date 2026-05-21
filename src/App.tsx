import { useState } from 'react'
import './App.css'

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

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5ZM3 9.9h4v10.6H3V9.9Zm6.7 0h3.83v1.45h.05c.53-.95 1.82-1.95 3.75-1.95 4.02 0 4.76 2.49 4.76 5.73v5.37h-4v-4.76c0-1.14-.02-2.6-1.69-2.6-1.7 0-1.96 1.24-1.96 2.52v4.84h-4V9.9Z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .7a11.4 11.4 0 0 0-3.6 22.22c.57.11.78-.24.78-.54v-2.1c-3.16.69-3.83-1.34-3.83-1.34-.52-1.26-1.26-1.6-1.26-1.6-1.03-.66.08-.65.08-.65 1.14.08 1.74 1.1 1.74 1.1 1.01 1.64 2.66 1.17 3.31.9.1-.69.4-1.17.72-1.44-2.52-.27-5.17-1.18-5.17-5.27 0-1.16.44-2.11 1.16-2.86-.12-.27-.5-1.35.11-2.82 0 0 .94-.29 3.1 1.09a11.5 11.5 0 0 1 5.65 0c2.15-1.38 3.09-1.09 3.09-1.09.62 1.47.23 2.55.12 2.82.72.75 1.15 1.7 1.15 2.86 0 4.1-2.65 5-5.19 5.27.41.34.77.99.77 2v3.15c0 .3.2.65.79.54A11.4 11.4 0 0 0 12 .7Z" />
    </svg>
  )
}

function ItchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.2 4h15.6l1.2 4.35v2.25c0 1.15-.82 2.12-1.93 2.32v5.45A1.63 1.63 0 0 1 17.44 20H6.56a1.63 1.63 0 0 1-1.63-1.63v-5.45A2.36 2.36 0 0 1 3 10.6V8.35L4.2 4Zm2.2 9v5h11.2v-5.02a2.62 2.62 0 0 1-2.08-1.02A2.63 2.63 0 0 1 13.4 13a2.66 2.66 0 0 1-2.8 0 2.63 2.63 0 0 1-2.12-1.04A2.62 2.62 0 0 1 6.4 13Zm-.55-7-1 2.65v1.95c0 .43.35.78.78.78.44 0 .79-.35.79-.78V9.2h2v1.4a.8.8 0 0 0 1.6 0V9.2h2v1.4a.8.8 0 0 0 1.6 0V9.2h2v1.4c0 .43.35.78.79.78.43 0 .78-.35.78-.78V8.65L18.15 6H5.85Z" />
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 3h2v12.15l4.58-4.58L19 12l-7 7-7-7 1.42-1.43L11 15.15V3Z" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.78 4.22 8 12l7.78 7.78-1.42 1.42L5.16 12l9.2-9.2 1.42 1.42Z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z" />
    </svg>
  )
}

function ProfilePhoto() {
  return (
    <div className="profile-photo" aria-label="Portrait placeholder">
      <div className="mural" />
      <div className="head" />
      <div className="ear left-ear" />
      <div className="ear right-ear" />
      <div className="beard" />
      <div className="nose" />
      <div className="eye left-eye" />
      <div className="eye right-eye" />
      <div className="hoodie" />
    </div>
  )
}

function UnifireProject() {
  return (
    <div className="project-image screenshot-scene">
      <img src="/projects/unifire2d-gameplay.png" alt="Unifire2D gameplay" />
    </div>
  )
}

function CaroProject() {
  return (
    <div className="project-image screenshot-scene">
      <img src="/projects/caro-game-board.png" alt="Caro Game Web board" />
    </div>
  )
}

function VoxelProject() {
  return (
    <div className="project-image screenshot-scene">
      <img src="/projects/voxel-sandbox-gameplay.png" alt="Voxel Sandbox Unity gameplay" />
    </div>
  )
}

type HomePageProps = {
  onSelectProject: (project: string) => void
}

function HomePage({ onSelectProject }: HomePageProps) {
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
          <button
            className="project-card"
            type="button"
            onClick={() => onSelectProject('Unifire2D')}
          >
            <UnifireProject />
            <div className="project-card-body">
              <div className="project-meta">Solo | Unity | C#</div>
              <div className="project-card-heading">
                <h3>Unifire2D</h3>
                <span>{'>'}</span>
              </div>
              <p>Unity Gameplay Programmer</p>
              <p>
                A 2D top-down space shooter where you control a spaceship,
                dodge asteroids, auto-fire bullets, and chase a new high score.
              </p>
            </div>
          </button>
          <button
            className="project-card"
            type="button"
            onClick={() => onSelectProject('Caro Game Web')}
          >
            <CaroProject />
            <div className="project-card-body">
              <div className="project-meta">Solo | Laravel | Vue 3 </div>
              <div className="project-card-heading">
                <h3>Caro Game Web</h3>
                <span>{'>'}</span>
              </div>
              <p>Full-stack Developer</p>
              <p>
                An online Gomoku game with rooms, realtime moves, in-room chat,
                leaderboards, match history, and authentication.
              </p>
            </div>
          </button>
          <button
            className="project-card"
            type="button"
            onClick={() => onSelectProject('Voxel Sandbox Unity')}
          >
            <VoxelProject />
            <div className="project-card-body">
              <div className="project-meta">Solo | Unity | C#</div>
              <div className="project-card-heading">
                <h3>Voxel Sandbox Unity</h3>
                <span>{'>'}</span>
              </div>
              <p>Unity Gameplay Programmer</p>
              <p>
                A Minecraft-inspired voxel sandbox prototype with procedural
                terrain, chunk loading, mining, building, crafting, mobs, and
                survival systems.
              </p>
            </div>
          </button>
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

type ProjectPageProps = {
  title: string
  onBack: () => void
}

function ProjectPage({ title, onBack }: ProjectPageProps) {
  const isUnifire = title === 'Unifire2D'
  const isCaro = title === 'Caro Game Web'
  const isVoxel = title === 'Voxel Sandbox Unity'

  if (!isUnifire && !isCaro && !isVoxel) {
    return null
  }

  return (
    <section className="project-page">
      <button className="back-link" type="button" onClick={onBack}>
        <BackIcon />
        <span>Go Back</span>
      </button>

      <div className="project-detail">
        {isUnifire ? (
          <div className="project-hero-image">
            <img src="/projects/unifire2d-gameplay.png" alt="Unifire2D gameplay" />
          </div>
        ) : isCaro ? (
          <div className="project-hero-image">
            <img src="/projects/caro-game-board.png" alt="Caro Game Web board" />
          </div>
        ) : (
          <div className="project-hero-image">
            <img src="/projects/voxel-sandbox-world.png" alt="Voxel Sandbox Unity world" />
          </div>
        )}
        <h2>{title}</h2>
        <div className="detail-grid">
          <article className="info-card">
            <h3>About</h3>
            {isUnifire ? (
              <>
                <p>
                  Unifire2D is an action-packed 2D top-down space shooter built
                  with Unity.
                </p>
                <p>
                  You control a spaceship, dodge incoming asteroids, auto-fire
                  bullets, manage three lives, and try to survive long enough to
                  set a new high score.
                </p>
              </>
            ) : isCaro ? (
              <>
                <p>
                  Caro Game Web is an online Gomoku game built with Laravel and
                  Vue, focused on real-time multiplayer play.
                </p>
                <p>
                  Players can create or join rooms, mark themselves ready, play
                  on a 15x15 board, chat in-room, and track match history,
                  statistics, and leaderboards.
                </p>
              </>
            ) : (
              <>
                <p>
                  Voxel Sandbox Unity is a first-person voxel sandbox prototype
                  focused on procedural world generation and modular survival
                  gameplay systems.
                </p>
                <p>
                  Players can explore generated terrain, mine and place blocks,
                  craft tools, fight hostile mobs, manage inventory items, and
                  move through a day/night world.
                </p>
              </>
            )}
          </article>
          <article className="info-card">
            <h3>Project Info</h3>
            {isUnifire ? (
              <ul>
                <li>Role: Unity Gameplay Programmer</li>
                <li>Team Size: Solo Project</li>
                <li>Genre: 2D Top-Down Space Shooter</li>
                <li>Engine: Unity</li>
                <li>Language: C#</li>
              </ul>
            ) : isCaro ? (
              <ul>
                <li>Role: Full-stack Developer</li>
                <li>Frontend: Vue 3, Inertia.js, TailwindCSS</li>
                <li>Backend: Laravel 11</li>
                <li>Realtime: Pusher / Reverb WebSockets</li>
                <li>Database: MySQL</li>
              </ul>
            ) : (
              <ul>
                <li>Role: Unity Gameplay Programmer</li>
                <li>Engine: Unity 6000.2.7f2</li>
                <li>Language: C#</li>
                <li>Genre: First-Person Voxel Sandbox</li>
                <li>Systems: Chunks, Inventory, Crafting, AI, Survival</li>
              </ul>
            )}
          </article>
        </div>
      </div>

      {isUnifire ? (
        <div className="project-writeup">
          <a
            className="code-link"
            href="https://github.com/duongdatdev/unifire2d"
            target="_blank"
          >
            <span>Code - Unifire2D Unity Project</span>
            <ExternalIcon />
          </a>

          <a
            className="code-link demo-link"
            href="https://youtu.be/0qC3WmC_r2w"
            target="_blank"
          >
            <span>Demo - Unifire2D Gameplay</span>
            <ExternalIcon />
          </a>

          <a
            className="code-link play-link"
            href="https://duongdat-dev.itch.io/unifire-2d"
            target="_blank"
          >
            <span>Play - Unifire2D on itch.io</span>
            <ExternalIcon />
          </a>

          <h2>Gameplay Features</h2>
          <p>
            The player ship follows the mouse cursor, which makes movement and
            aiming feel fluid and direct. Shooting is handled automatically at a
            fixed fire rate, so the player can focus on positioning, dodging
            asteroids, and surviving as long as possible.
          </p>
          <p>
            The game includes a complete loop with a main menu, gameplay scene,
            game over screen, local high score saving, three-heart survival
            mechanics, pause handling, sound effects, and engine smoke
            particles.
          </p>
          <p>
            Asteroids spawn into the arena, collide with the player, trigger
            life loss, and reward score when destroyed. The UI shows score, high
            score, remaining hearts, timer, pause controls, and game over
            feedback.
          </p>

          <h2>Controls and Game Loop</h2>
          <p>
            The game is designed around simple mouse-driven control: the ship
            moves toward the cursor, rotates to face its movement direction, and
            stays clamped inside the camera viewport. Shooting is automatic, so
            the core challenge becomes movement, spacing, and avoiding asteroid
            collisions.
          </p>
          <p>
            The project includes three main scenes: a main menu scene, the
            gameplay arena, and a game over scene. The loop supports starting
            from the menu, playing a survival run, saving the high score locally,
            and showing the end result after the player loses all hearts.
          </p>

          <h2>Core Systems</h2>
          <p>
            The player controller handles mouse movement, ship rotation,
            auto-firing, screen bounds, engine smoke particles, animation speed,
            pause/resume events, and collision callbacks when the ship touches an
            asteroid.
          </p>
          <p>
            The game manager keeps the current score, loads and saves the local
            high score with PlayerPrefs, manages the three-heart life system,
            updates score and heart UI elements, resets state when entering the
            gameplay scene, and loads the game over scene when lives reach zero.
          </p>

          <h2>Presentation and Feedback</h2>
          <p>
            The project uses pixel-art spaceship sprites with multiple damage
            states, engine animation spritesheets, laser bullet sprites,
            asteroid sprites, explosion animation, nebula/star backgrounds,
            custom fonts, and UI assets for buttons, hearts, and health bars.
          </p>
          <p>
            Audio feedback is included for shooting, impact, losing a life, game
            over, UI button clicks, and background music. These details make the
            game feel more responsive and help communicate player actions and
            game state changes.
          </p>

          <h2>What I built</h2>
          <p>
            I implemented the core player controller, auto-fire system, asteroid
            collision damage, score and high-score management, lives UI, scene
            flow, audio feedback, and supporting UI scripts for menu, pause,
            timer, and game over behavior.
          </p>
          <p>
            This project helped me practice Unity gameplay programming, C#
            architecture, UI systems, game state management, and polishing the
            small feedback details that make a 2D action game feel responsive.
          </p>
          <p>
            The project structure is split into gameplay scripts, managers, UI
            scripts, prefabs, scenes, animations, audio, and pixel-art assets,
            making it easier to expand with new enemies, player upgrades, or
            additional game modes later.
          </p>

          <h2>Project Structure</h2>
          <p>
            The Unity project is organized into folders for scripts, managers,
            UI scripts, scenes, prefabs, animations, audio, fonts, materials,
            settings, and art assets. Key gameplay scripts include
            PlayerController, Bullet, Asteroid, AsteroidSpawner, GameManager,
            GameOverManager, MainMenuManager, PauseMenu, TimerManager,
            AudioManager, ButtonSound, and StarfieldController.
          </p>
          <p>
            This structure keeps gameplay behavior, scene flow, UI behavior, and
            presentation assets separated clearly enough for future additions
            such as new asteroid types, ship upgrades, power-ups, boss waves, or
            extra game modes.
          </p>
        </div>
      ) : isCaro ? (
        <div className="project-writeup">
          <a
            className="code-link"
            href="https://github.com/duongdatdev/caro-game-web"
            target="_blank"
          >
            <span>Code - Caro Game Web</span>
            <ExternalIcon />
          </a>

          <h2>Realtime Gomoku System</h2>
          <p>
            This project implements an online Caro/Gomoku experience with
            private rooms, random matchmaking, player readiness, turn-based move
            validation, in-room chat, and realtime updates through WebSockets.
          </p>
          <p>
            The game board is a responsive 15x15 grid where each move updates
            local state immediately and then syncs with the backend. Room events
            cover players joining, leaving, getting ready, making moves, sending
            messages, and finishing a game.
          </p>

          <h2>What I built</h2>
          <p>
            I built the game room flow, board interaction, chat panel, ready
            system, win modal, toast feedback, authentication, leaderboard,
            match history, and player statistics screens.
          </p>
          <p>
            This project helped me practice backend integration, realtime event
            architecture, Vue component design, Inertia page state, Laravel
            controllers/models, and testing multiplayer behavior with e2e tests.
          </p>
        </div>
      ) : (
        <div className="project-writeup">
          <a
            className="code-link"
            href="https://github.com/duongdatdev/voxel-sandbox-unity"
            target="_blank"
          >
            <span>Code - Voxel Sandbox Unity</span>
            <ExternalIcon />
          </a>

          <h2>Procedural Voxel World</h2>
          <p>
            Voxel Sandbox Unity is built around a procedural terrain pipeline
            that generates playable terrain from layered Perlin noise. The
            terrain is split into 16x16x128 chunks, allowing the game to load,
            unload, and rebuild only the chunk data around the player instead
            of keeping the entire world active at once.
          </p>
          <p>
            The generator creates height variation for hills, valleys, and
            caves, then fills the world with terrain blocks such as grass, dirt,
            stone, ores, wood, leaves, water, farmland, crops, and bedrock.
            Trees and vegetation are placed on valid terrain positions so the
            world feels more natural instead of being a flat test grid.
          </p>
          <p>
            Each chunk builds its mesh from visible voxel faces only, reducing
            unnecessary geometry. Block texture data, atlas coordinates, biome
            grass coloring, and per-face mesh data are kept separate, making it
            easier to add new block types without rewriting the chunk renderer.
          </p>

          <h2>Chunk, Lighting, and Blocks</h2>
          <p>
            The chunk system handles voxel storage, mesh generation, collision
            meshes, block updates, and neighbor refreshes when the player mines
            or places blocks near a chunk border. This keeps interaction local
            while still allowing the terrain to update correctly across chunk
            boundaries.
          </p>
          <p>
            The lighting system supports sunlight propagation through open
            spaces and local light sources such as torches. Light values are
            baked into chunk mesh colors, so caves, covered areas, and torch-lit
            spaces can visually react to the block layout.
          </p>
          <p>
            Blocks are backed by reusable data assets that define texture
            mapping and behavior. This data-driven setup supports solid blocks,
            transparent blocks, foliage, crops, crafting tables, ores, and
            utility blocks while keeping the gameplay code cleaner.
          </p>

          <h2>Gameplay Systems</h2>
          <p>
            The player controller supports first-person movement, mouse look,
            sprinting, jumping, gravity, ground checks, and camera collision.
            The interaction system raycasts from the camera to highlight the
            targeted block, mine blocks, place blocks, and interact with special
            blocks such as crafting tables.
          </p>
          <p>
            Mining produces dropped item pickups, and collected items are stored
            in an inventory made from item stacks. The hotbar lets the player
            select blocks, tools, food, and weapons, while the held-item system
            displays the currently selected item in the player's hand with
            movement feedback.
          </p>
          <p>
            Crafting recipes connect resources to useful items such as tools,
            weapons, torches, crafting blocks, and survival supplies. Tools are
            designed around different block categories, including pickaxes for
            stone and ores, axes for wood, and shovels for dirt-style blocks.
          </p>

          <h2>Survival and Entity Systems</h2>
          <p>
            The survival layer adds player health, melee combat, damage
            feedback, knockback, and hostile threats. Zombies spawn during the
            night or in darker areas, chase the player, and attack at close
            range, creating pressure once the day/night cycle reaches the
            dangerous part of the loop.
          </p>
          <p>
            Passive pigs wander through the world and make the environment feel
            more alive. Entity controllers are separated from visuals and
            spawning logic, which keeps behavior, animation setup, and spawn
            rules easier to adjust independently.
          </p>
          <p>
            The day/night cycle continuously changes the sky color and world
            atmosphere over time. This gives exploration a stronger rhythm:
            daytime is safer for gathering and building, while nighttime pushes
            the player toward combat, shelter, and resource management.
          </p>

          <h2>Inventory, UI, and Save Flow</h2>
          <p>
            The UI includes a HUD, health display, hotbar, inventory slots,
            crafting interface, pause menu, and main menu flow. Inventory UI
            elements update from the underlying item stack data, so collecting,
            selecting, moving, and crafting items all stay connected to the
            same gameplay state.
          </p>
          <p>
            The project also includes save data support for persistent world and
            player information. This makes the prototype feel closer to a real
            sandbox game loop, where exploration, building, collected resources,
            and player progress can continue across sessions.
          </p>

          <h2>Tools and Editor Support</h2>
          <p>
            I also added supporting editor tooling for the voxel workflow,
            including atlas packing, block texture setup, block texture data
            editing, and helper tools for scene/player setup. These tools reduce
            repetitive setup work when adding new block textures or testing
            gameplay changes inside Unity.
          </p>
          <p>
            Debug scripts are included for testing individual cubes, quad
            rendering, and block detection under the crosshair. These small
            utilities helped isolate rendering and interaction problems while
            building the larger world system.
          </p>

          <h2>What I built</h2>
          <p>
            I worked across the main Unity gameplay architecture: world
            generation, chunk meshing, block data, lighting, block interaction,
            player movement, combat, inventory, crafting, held-item visuals,
            dropped items, entity behavior, spawning, HUD, menus, save flow, and
            editor utilities.
          </p>
          <p>
            A large part of the work was connecting systems together so the
            world behaves like one playable sandbox: breaking a block updates
            chunk geometry, creates item drops, refreshes lighting, affects the
            inventory, and allows the player to reuse those resources for
            crafting, building, tools, or survival.
          </p>
          <p>
            The project is organized into Core, World, Player, UI, Entity,
            Debug, and Editor tooling folders, making it easier to expand with
            new blocks, recipes, mobs, equipment, and world-generation rules.
          </p>

          <h2>Project Structure</h2>
          <p>
            Core scripts handle game state, audio, items, item stacks,
            inventory data, crafting recipes, item databases, save data, and
            save management. World scripts handle blocks, chunks, procedural
            noise, terrain generation, texture atlases, biome colors, crop
            blocks, dropped items, lighting, animals, zombies, and spawning.
          </p>
          <p>
            Player scripts handle FPS controls, mouse look, camera collision,
            block interaction, combat, arm movement, and held-item rendering. UI
            scripts handle the HUD, inventory screens, inventory slot visuals,
            pause menu, and main menu. Editor and debug folders support faster
            iteration while building and testing the voxel systems.
          </p>

          <h2>What I learned</h2>
          <p>
            This project helped me practice larger Unity architecture, data
            organization, procedural generation, mesh construction, runtime
            world updates, and gameplay system communication. It also gave me
            more experience thinking about performance, because voxel worlds can
            become expensive quickly if chunk loading, mesh rebuilding, and
            lighting updates are not kept under control.
          </p>
          <p>
            It was also a strong exercise in designing modular systems. Blocks,
            items, recipes, entities, UI, and player interactions all need to
            share information without becoming tightly coupled, so the project
            pushed me to keep responsibilities clear and make future expansion
            easier.
          </p>
        </div>
      )}
    </section>
  )
}

function App() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  return (
    <main className="portfolio">
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="Duong Bao Dat home"
          onClick={(event) => {
            event.preventDefault()
            setSelectedProject(null)
          }}
        >
          <img src="/favicon.svg" alt="" aria-hidden="true" />
          <span className="brand-copy">
            <strong>Duong Bao Dat</strong>
            <span>Game Developer</span>
          </span>
        </a>
        <nav className="socials" aria-label="Social links">
          <a href="https://www.linkedin.com/in/duongdatdev" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <a href="https://github.com/duongdatdev" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href="https://duongdat-dev.itch.io" aria-label="itch.io">
            <ItchIcon />
          </a>
          <a className="resume-link" href="#resume">
            <span>Resume</span>
            <ResumeIcon />
          </a>
        </nav>
      </header>

      {selectedProject ? (
        <ProjectPage
          title={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      ) : (
        <HomePage onSelectProject={setSelectedProject} />
      )}
    </main>
  )
}

export default App
