export type ProjectLink = {
  label: string
  url: string
  className: string
}

export type ProjectSection = {
  title: string
  paragraphs: string[]
}

export type ProjectData = {
  title: string
  slug: string
  category?: 'Unity' | 'WebGL' | 'Java' | 'Web'
  meta: string
  role: string
  shortDescription: string
  card: { imageSrc: string; videoSrc?: string; alt: string }
  hero: { imageSrc: string; videoSrc?: string; alt: string }
  about: string[]
  info: string[]
  youtubeEmbed?: { src: string; title: string }
  demoDescription?: string
  actionLinks?: ProjectLink[]
  codeLink?: { label: string; url: string }
  sections: ProjectSection[]
}

export const projects: ProjectData[] = [
  {
    title: 'VectoArena',
    slug: 'vectoarena',
    category: 'Unity',
    meta: 'Solo | Unity | Colyseus | Web3',
    role: 'Unity Multiplayer Developer',
    shortDescription:
      'A real-time multiplayer arena game with combat, progression, collectible VEC rewards, cosmetic skins, and wallet features.',
    card: {
      imageSrc: '/projects/vectoarena-gameplay.png',
      videoSrc: '/projects/vectoarena-gameplay.mp4',
      alt: 'VectoArena arena gameplay',
    },
    hero: {
      imageSrc: '/projects/vectoarena-menu.png',
      videoSrc: '/projects/vectoarena-gameplay.mp4',
      alt: 'VectoArena main menu',
    },
    about: [
      'VectoArena is a top-down real-time multiplayer arena game built with Unity 6 and an authoritative Colyseus/Node.js backend.',
      'Players enter battle or Play to Airdrop matches, scavenge weapons and medical kits, survive a shrinking zone, earn VEC rewards, equip cosmetic skins, and connect a wallet for NFT features.',
    ],
    info: [
      'Role: Full-stack Multiplayer Game Developer',
      'Engine: Unity 6 / URP',
      'Client: C#, UI Toolkit, Input System, WebGL',
      'Server: TypeScript, Colyseus, Express, Prisma',
      'Web3: Reown AppKit, Thirdweb, ethers',
    ],
    youtubeEmbed: {
      src: 'https://www.youtube.com/embed/NulYy4pIOrE',
      title: 'VectoArena Gameplay Demo',
    },
    demoDescription:
      'Watch a short gameplay demo showing multiplayer arena combat, bot behavior, zone shrinking, weapon pickups, and real-time synchronization.',
    actionLinks: [
      {
        label: 'View Client Code',
        url: 'https://github.com/duongdatdev/VectoArena',
        className: 'project-btn code-btn',
      },
      {
        label: 'View Server Code',
        url: 'https://github.com/duongdatdev/vectoarena_server',
        className: 'project-btn code-btn',
      },
      {
        label: 'Open on YouTube',
        url: 'https://youtu.be/NulYy4pIOrE',
        className: 'project-btn youtube-btn',
      },
    ],
    sections: [
      {
        title: 'Game Loop and Arena Combat',
        paragraphs: [
          'VectoArena is a compact multiplayer survival arena where players spawn into a match, collect weapons or medical kits, fight using ranged and melee attacks, and remain inside a progressively shrinking danger zone. The live HUD communicates health, ammo, pickups, kill feed activity, the minimap, and end-of-match results.',
          'The game supports a standard battle room and a gated Play to Airdrop room. Matches can fill empty positions with bots, allowing the full combat and reward loop to be demonstrated while human players join, disconnect, or reconnect.',
        ],
      },
      {
        title: 'Authoritative Multiplayer Backend',
        paragraphs: [
          'The Unity client communicates with Colyseus rooms over WebSockets for synchronized movement, shooting, melee attacks, pickups, zone state, kill feed events, and match results. Server-side gameplay logic validates attack distance and cooldowns, pickup interaction, zone damage, reconnect windows, match completion, and reward recording instead of trusting client actions.',
          'Match balance is data-driven: a runtime JSON configuration controls four-player rooms, bot fill, initial item spawns, weapon damage, firing rates, ammo, healing, and pickup distances. The backend persists matches, participants, kills, currency transactions, and loadouts through Prisma and PostgreSQL.',
        ],
      },
      {
        title: 'Progression, Cosmetics, and Web3',
        paragraphs: [
          'Beyond a match, the player flow includes registration and login, profile and currency balances, XP progression, transaction history, a cosmetic store, and equippable character skins. Normal cosmetic ownership and NFT-backed skins share one inventory experience in the client while the server verifies the ownership rules.',
          'Wallet linking uses a short-lived nonce and a signed verification message. The Web3 flow can verify VEC token deposits, synchronize NFT skin ownership, and confirm NFT purchase transactions through configured blockchain RPC providers, with the server retaining authority over credited balances and unlocked cosmetics.',
        ],
      },
      {
        title: 'Client Experience and Architecture',
        paragraphs: [
          'The Unity 6 client uses URP, UI Toolkit, TextMesh Pro, and the Input System across three core scenes: authentication, the home/store and matchmaking interface, and the gameplay arena. It includes wallet connection feedback, inventory and skin presentation, settings, audio, matchmaking selection, gameplay HUD, and death/result flow.',
          'I built the connected gameplay architecture across a C# Unity client and a TypeScript backend: REST APIs for account and inventory actions, Colyseus state synchronization for active matches, Prisma persistence for progression and history, and Web3 services for wallet and NFT interactions. The project targets standalone builds and WebGL, making it suitable for a browser-accessible multiplayer game demo.',
        ],
      },
    ],
  },
  {
    title: 'Unifire2D',
    slug: 'unifire2d',
    category: 'Unity',
    meta: 'Solo | Unity | C#',
    role: 'Unity Gameplay Programmer',
    shortDescription:
      'A 2D top-down space shooter where you control a spaceship, dodge asteroids, auto-fire bullets, and chase a new high score.',
    card: {
      imageSrc: '/projects/unifire2d-gameplay.png',
      videoSrc: '/projects/unifire2d-gameplay.mp4',
      alt: 'Unifire2D gameplay',
    },
    hero: {
      imageSrc: '/projects/unifire2d-gameplay.png',
      videoSrc: '/projects/unifire2d-gameplay.mp4',
      alt: 'Unifire2D gameplay',
    },
    about: [
      'Unifire2D is an action-packed 2D top-down space shooter built with Unity.',
      'You control a spaceship, dodge incoming asteroids, auto-fire bullets, manage three lives, and try to survive long enough to set a new high score.',
    ],
    info: [
      'Role: Unity Gameplay Programmer',
      'Team Size: Solo Project',
      'Genre: 2D Top-Down Space Shooter',
      'Engine: Unity',
      'Language: C#',
    ],
    youtubeEmbed: {
      src: 'https://www.youtube.com/embed/_1e9ZaPOxKw',
      title: 'Unifire2D Gameplay Demo',
    },
    demoDescription:
      'Watch a short gameplay demo showing spaceship movement, asteroid dodging, auto-shooting, health system, and score progression.',
    actionLinks: [
      {
        label: 'Play on itch.io',
        url: 'https://duongdat-dev.itch.io/unifire-2d',
        className: 'project-btn play-btn',
      },
      {
        label: 'View Source Code',
        url: 'https://github.com/duongdatdev/unifire2d',
        className: 'project-btn code-btn',
      },
      {
        label: 'Open on YouTube',
        url: 'https://youtu.be/_1e9ZaPOxKw',
        className: 'project-btn youtube-btn',
      },
    ],
    sections: [
      {
        title: 'Gameplay Features',
        paragraphs: [
          'The player ship follows the mouse cursor, which makes movement and aiming feel fluid and direct. Shooting is handled automatically at a fixed fire rate, so the player can focus on positioning, dodging asteroids, and surviving as long as possible.',
          'The game includes a complete loop with a main menu, gameplay scene, game over screen, local high score saving, three-heart survival mechanics, pause handling, sound effects, and engine smoke particles.',
          'Asteroids spawn into the arena, collide with the player, trigger life loss, and reward score when destroyed. The UI shows score, high score, remaining hearts, timer, pause controls, and game over feedback.',
        ],
      },
      {
        title: 'Controls and Game Loop',
        paragraphs: [
          'The game is designed around simple mouse-driven control: the ship moves toward the cursor, rotates to face its movement direction, and stays clamped inside the camera viewport. Shooting is automatic, so the core challenge becomes movement, spacing, and avoiding asteroid collisions.',
          'The project includes three main scenes: a main menu scene, the gameplay arena, and a game over scene. The loop supports starting from the menu, playing a survival run, saving the high score locally, and showing the end result after the player loses all hearts.',
        ],
      },
      {
        title: 'Core Systems',
        paragraphs: [
          'The player controller handles mouse movement, ship rotation, auto-firing, screen bounds, engine smoke particles, animation speed, pause/resume events, and collision callbacks when the ship touches an asteroid.',
          'The game manager keeps the current score, loads and saves the local high score with PlayerPrefs, manages the three-heart life system, updates score and heart UI elements, resets state when entering the gameplay scene, and loads the game over scene when lives reach zero.',
        ],
      },
      {
        title: 'Presentation and Feedback',
        paragraphs: [
          'The project uses pixel-art spaceship sprites with multiple damage states, engine animation spritesheets, laser bullet sprites, asteroid sprites, explosion animation, nebula/star backgrounds, custom fonts, and UI assets for buttons, hearts, and health bars.',
          'Audio feedback is included for shooting, impact, losing a life, game over, UI button clicks, and background music. These details make the game feel more responsive and help communicate player actions and game state changes.',
        ],
      },
      {
        title: 'What I built',
        paragraphs: [
          'I implemented the core player controller, auto-fire system, asteroid collision damage, score and high-score management, lives UI, scene flow, audio feedback, and supporting UI scripts for menu, pause, timer, and game over behavior.',
          'This project helped me practice Unity gameplay programming, C# architecture, UI systems, game state management, and polishing the small feedback details that make a 2D action game feel responsive.',
          'The project structure is split into gameplay scripts, managers, UI scripts, prefabs, scenes, animations, audio, and pixel-art assets, making it easier to expand with new enemies, player upgrades, or additional game modes later.',
        ],
      },
      {
        title: 'Project Structure',
        paragraphs: [
          'The Unity project is organized into folders for scripts, managers, UI scripts, scenes, prefabs, animations, audio, fonts, materials, settings, and art assets. Key gameplay scripts include PlayerController, Bullet, Asteroid, AsteroidSpawner, GameManager, GameOverManager, MainMenuManager, PauseMenu, TimerManager, AudioManager, ButtonSound, and StarfieldController.',
          'This structure keeps gameplay behavior, scene flow, UI behavior, and presentation assets separated clearly enough for future additions such as new asteroid types, ship upgrades, power-ups, boss waves, or extra game modes.',
        ],
      },
    ],
  },
  {
    title: 'Voxel Sandbox Unity',
    slug: 'voxel-sandbox',
    category: 'Unity',
    meta: 'Solo | Unity | C#',
    role: 'Unity Gameplay Programmer',
    shortDescription:
      'A Minecraft-inspired voxel sandbox prototype with procedural terrain, chunk loading, mining, building, crafting, mobs, and survival systems.',
    card: {
      imageSrc: '/projects/voxel-sandbox-gameplay.png',
      alt: 'Voxel Sandbox Unity gameplay',
    },
    hero: {
      imageSrc: '/projects/voxel-sandbox-world.png',
      alt: 'Voxel Sandbox Unity world',
    },
    about: [
      'Voxel Sandbox Unity is a first-person voxel sandbox prototype focused on procedural world generation and modular survival gameplay systems.',
      'Players can explore generated terrain, mine and place blocks, craft tools, fight hostile mobs, manage inventory items, and move through a day/night world.',
    ],
    info: [
      'Role: Unity Gameplay Programmer',
      'Engine: Unity 6000.2.7f2',
      'Language: C#',
      'Genre: First-Person Voxel Sandbox',
      'Systems: Chunks, Inventory, Crafting, AI, Survival',
    ],
    codeLink: {
      label: 'Code - Voxel Sandbox Unity',
      url: 'https://github.com/duongdatdev/voxel-sandbox-unity',
    },
    sections: [
      {
        title: 'Procedural Voxel World',
        paragraphs: [
          'Voxel Sandbox Unity is built around a procedural terrain pipeline that generates playable terrain from layered Perlin noise. The terrain is split into 16x16x128 chunks, allowing the game to load, unload, and rebuild only the chunk data around the player instead of keeping the entire world active at once.',
          'The generator creates height variation for hills, valleys, and caves, then fills the world with terrain blocks such as grass, dirt, stone, ores, wood, leaves, water, farmland, crops, and bedrock. Trees and vegetation are placed on valid terrain positions so the world feels more natural instead of being a flat test grid.',
          'Each chunk builds its mesh from visible voxel faces only, reducing unnecessary geometry. Block texture data, atlas coordinates, biome grass coloring, and per-face mesh data are kept separate, making it easier to add new block types without rewriting the chunk renderer.',
        ],
      },
      {
        title: 'Chunk, Lighting, and Blocks',
        paragraphs: [
          'The chunk system handles voxel storage, mesh generation, collision meshes, block updates, and neighbor refreshes when the player mines or places blocks near a chunk border. This keeps interaction local while still allowing the terrain to update correctly across chunk boundaries.',
          'The lighting system supports sunlight propagation through open spaces and local light sources such as torches. Light values are baked into chunk mesh colors, so caves, covered areas, and torch-lit spaces can visually react to the block layout.',
          'Blocks are backed by reusable data assets that define texture mapping and behavior. This data-driven setup supports solid blocks, transparent blocks, foliage, crops, crafting tables, ores, and utility blocks while keeping the gameplay code cleaner.',
        ],
      },
      {
        title: 'Gameplay Systems',
        paragraphs: [
          'The player controller supports first-person movement, mouse look, sprinting, jumping, gravity, ground checks, and camera collision. The interaction system raycasts from the camera to highlight the targeted block, mine blocks, place blocks, and interact with special blocks such as crafting tables.',
          'Mining produces dropped item pickups, and collected items are stored in an inventory made from item stacks. The hotbar lets the player select blocks, tools, food, and weapons, while the held-item system displays the currently selected item in the player\'s hand with movement feedback.',
          'Crafting recipes connect resources to useful items such as tools, weapons, torches, crafting blocks, and survival supplies. Tools are designed around different block categories, including pickaxes for stone and ores, axes for wood, and shovels for dirt-style blocks.',
        ],
      },
      {
        title: 'Survival and Entity Systems',
        paragraphs: [
          'The survival layer adds player health, melee combat, damage feedback, knockback, and hostile threats. Zombies spawn during the night or in darker areas, chase the player, and attack at close range, creating pressure once the day/night cycle reaches the dangerous part of the loop.',
          'Passive pigs wander through the world and make the environment feel more alive. Entity controllers are separated from visuals and spawning logic, which keeps behavior, animation setup, and spawn rules easier to adjust independently.',
          'The day/night cycle continuously changes the sky color and world atmosphere over time. This gives exploration a stronger rhythm: daytime is safer for gathering and building, while nighttime pushes the player toward combat, shelter, and resource management.',
        ],
      },
      {
        title: 'Inventory, UI, and Save Flow',
        paragraphs: [
          'The UI includes a HUD, health display, hotbar, inventory slots, crafting interface, pause menu, and main menu flow. Inventory UI elements update from the underlying item stack data, so collecting, selecting, moving, and crafting items all stay connected to the same gameplay state.',
          'The project also includes save data support for persistent world and player information. This makes the prototype feel closer to a real sandbox game loop, where exploration, building, collected resources, and player progress can continue across sessions.',
        ],
      },
      {
        title: 'Tools and Editor Support',
        paragraphs: [
          'I also added supporting editor tooling for the voxel workflow, including atlas packing, block texture setup, block texture data editing, and helper tools for scene/player setup. These tools reduce repetitive setup work when adding new block textures or testing gameplay changes inside Unity.',
          'Debug scripts are included for testing individual cubes, quad rendering, and block detection under the crosshair. These small utilities helped isolate rendering and interaction problems while building the larger world system.',
        ],
      },
      {
        title: 'What I built',
        paragraphs: [
          'I worked across the main Unity gameplay architecture: world generation, chunk meshing, block data, lighting, block interaction, player movement, combat, inventory, crafting, held-item visuals, dropped items, entity behavior, spawning, HUD, menus, save flow, and editor utilities.',
          'A large part of the work was connecting systems together so the world behaves like one playable sandbox: breaking a block updates chunk geometry, creates item drops, refreshes lighting, affects the inventory, and allows the player to reuse those resources for crafting, building, tools, or survival.',
          'The project is organized into Core, World, Player, UI, Entity, Debug, and Editor tooling folders, making it easier to expand with new blocks, recipes, mobs, equipment, and world-generation rules.',
        ],
      },
      {
        title: 'Project Structure',
        paragraphs: [
          'Core scripts handle game state, audio, items, item stacks, inventory data, crafting recipes, item databases, save data, and save management. World scripts handle blocks, chunks, procedural noise, terrain generation, texture atlases, biome colors, crop blocks, dropped items, lighting, animals, zombies, and spawning.',
          'Player scripts handle FPS controls, mouse look, camera collision, block interaction, combat, arm movement, and held-item rendering. UI scripts handle the HUD, inventory screens, inventory slot visuals, pause menu, and main menu. Editor and debug folders support faster iteration while building and testing the voxel systems.',
        ],
      },
      {
        title: 'What I learned',
        paragraphs: [
          'This project helped me practice larger Unity architecture, data organization, procedural generation, mesh construction, runtime world updates, and gameplay system communication. It also gave me more experience thinking about performance, because voxel worlds can become expensive quickly if chunk loading, mesh rebuilding, and lighting updates are not kept under control.',
          'It was also a strong exercise in designing modular systems. Blocks, items, recipes, entities, UI, and player interactions all need to share information without becoming tightly coupled, so the project pushed me to keep responsibilities clear and make future expansion easier.',
        ],
      },
    ],
  },
  {
    title: 'Earth 2048',
    slug: 'earth-2048',
    category: 'WebGL',
    meta: 'Solo | TypeScript | PixiJS | Vite',
    role: 'Frontend & Graphics Developer',
    shortDescription:
      'A standalone, high-performance 2048 puzzle game component built with TypeScript and PixiJS, featuring customizable 3x3/4x4/5x5 grid sizes and smooth tile animations.',
    card: {
      imageSrc: '/projects/earth-2048.png',
      alt: 'Earth 2048 PixiJS game preview',
    },
    hero: {
      imageSrc: '/projects/earth-2048.png',
      alt: 'Earth 2048 PixiJS gameplay preview',
    },
    about: [
      'Earth 2048 is a lightweight, high-performance web game component built with TypeScript and PixiJS.',
      'It delivers a standalone 2048 puzzle experience with smooth tile sliding animations, grid resizing (3x3, 4x4, 5x5), independent best-score tracking per board size, keyboard & swipe touch input, and clean embeddable architecture without external framework dependencies.',
    ],
    info: [
      'Role: Frontend & Graphics Developer',
      'Language: TypeScript',
      'Renderer: PixiJS (WebGL & Canvas)',
      'Architecture: Framework-agnostic Embeddable Component',
      'Build Tool: Vite & npm library output',
    ],
    codeLink: {
      label: 'Code - Earth 2048 (PixiJS)',
      url: 'https://github.com/duongdatdev/2048_pixiJS',
    },
    actionLinks: [
      {
        label: 'View Source Code',
        url: 'https://github.com/duongdatdev/2048_pixiJS',
        className: 'project-btn code-btn',
      },
    ],
    sections: [
      {
        title: 'PixiJS Rendering and Smooth Tile Animations',
        paragraphs: [
          'The game board uses PixiJS for GPU-accelerated rendering, delivering fluid 60 FPS tile sliding, merging, and popping transitions on both desktop and mobile browsers.',
          'Visual assets, typography, and tile gradients are dynamically generated directly in canvas/PixiJS containers, eliminating external font or asset download overhead.',
        ],
      },
      {
        title: 'Dynamic Grid Sizing and Score Persistence',
        paragraphs: [
          'Players can switch between 3x3, 4x4, and 5x5 grid layouts. The state manager tracks independent current and high scores for each board dimension in localStorage.',
          'Safety confirmation dialogs prevent accidental board resets when switching grid dimensions mid-game.',
        ],
      },
      {
        title: 'Embeddable Component Architecture',
        paragraphs: [
          'Designed as a modular, framework-agnostic component with a clean mount/unmount lifecycle API, scoped CSS (.earth-2048), and customizable callbacks (onChange, autoFocus, storageKey) for integration into any host website.',
        ],
      },
      {
        title: 'What I built',
        paragraphs: [
          'I developed the core 2048 matrix math algorithm, tile merge rules, PixiJS scene graph and animation tweens, touch/keyboard input handling, score persistence, and unit tests covering game-over conditions and merge validations.',
        ],
      },
    ],
  },
  {
    title: 'Mini Island 2D',
    slug: 'miniisland-2d',
    category: 'Java',
    meta: 'Solo | Java 17 | WebSocket | Swing/AWT',
    role: 'Java Gameplay & Network Developer',
    shortDescription:
      'A real-time multiplayer 2D top-down game built with Java Swing/AWT and WebSockets, featuring synchronized exploration, wave combat, maze survival, and live chat.',
    card: {
      imageSrc: '/projects/miniisland-lobby.png',
      alt: 'Mini Island 2D multiplayer lobby',
    },
    hero: {
      imageSrc: '/projects/miniisland-gameplay.png',
      alt: 'Mini Island 2D monster hunt combat gameplay',
    },
    about: [
      'Mini Island 2D is a real-time multiplayer 2D top-down game client and server system built with Java 17, Java Swing/AWT, and WebSockets.',
      'Players explore a shared island lobby with synchronized movement, chat with overhead speech bubbles, participate in Monster Hunt wave defense combat, race through maze survival challenges, purchase cosmetic skins, and compete on a live global leaderboard.',
    ],
    info: [
      'Role: Java Gameplay & Network Developer',
      'Language: Java 17',
      'Graphics: Java Swing / AWT (Custom Sprite Rendering)',
      'Networking: Java-WebSocket (Real-Time JSON Protocol)',
      'Build Tool: Apache Maven',
    ],
    codeLink: {
      label: 'Code - Mini Island 2D Client',
      url: 'https://github.com/duongdatdev/miniisland-2.0',
    },
    actionLinks: [
      {
        label: 'View Client Code',
        url: 'https://github.com/duongdatdev/miniisland-2.0',
        className: 'project-btn code-btn',
      },
    ],
    sections: [
      {
        title: 'Multiplayer Island Lobby and Speech Chat',
        paragraphs: [
          'The core lobby is a shared open island where players can meet and interact in real time. Player position, direction, and animation states are synchronized over WebSockets with client-side interpolation.',
          'The communication system features dynamic speech bubbles rendered directly above character sprites whenever a player chats, alongside a dedicated global chat panel with persistent history and player tags.',
        ],
      },
      {
        title: 'Monster Hunt - Wave Survival Combat',
        paragraphs: [
          'Monster Hunt is a fast-paced survival game mode where players face escalating waves of hostile monsters. Aiming uses mouse crosshair targeting for fluid projectile shooting with custom bullet physics and damage number popups.',
          'The mode features an evasive dash ability on Right Mouse Button, dynamic weapon switching, gold rewards per kill, lava border hazard zones, and real-time wave score rankings.',
        ],
      },
      {
        title: 'Maze Survival and Economy System',
        paragraphs: [
          'The Maze Exploration mode challenges players with a 2-minute countdown timer, torch-lit corridor navigation, coin collection, trap hazards, and live health management.',
          'Earned gold coins from combat and maze runs can be spent in the in-game Skin Shop, allowing players to unlock and switch between custom pixel-art character skins like Blue Warrior and Red Knight.',
        ],
      },
      {
        title: 'Custom 2D Engine and Network Architecture',
        paragraphs: [
          'The game is built on a custom Java Swing/AWT 2D rendering pipeline featuring CSV tilemap loading, sprite sheet animation slicing, pixel-art font rendering, and bounding-box collision detection.',
          'The network layer handles client-server synchronization via JSON messages over WebSockets, managing authentication, position updates, combat triggers, leaderboard synchronization, and room transitions.',
        ],
      },
      {
        title: 'What I built',
        paragraphs: [
          'I developed the full Java client application: the 2D rendering loop, keyboard and mouse input handling, sprite animation system, WebSocket communication thread, overhead dialog bubbles, Monster Hunt wave mechanics, maze game logic, skin shop UI, and leaderboard views.',
          'This project provided deep hands-on experience with multi-threaded client architectures, custom GUI rendering without external game engines, network state synchronization, and low-level 2D game loops.',
        ],
      },
    ],
  },
  {
    title: 'Island Survival: Escape',
    slug: 'island-survival',
    category: 'WebGL',
    meta: 'Solo | WebGL 2 | Vanilla JS | Vite',
    role: 'WebGL Engine & Gameplay Developer',
    shortDescription:
      'A browser-based first-person 3D survival game built with WebGL 2 and vanilla JavaScript, featuring procedural islands, crafting, day/night cycles, and raft escape mechanics.',
    card: {
      imageSrc: '/projects/island-survival-overview.png',
      alt: 'Island Survival WebGL gameplay overview',
    },
    hero: {
      imageSrc: '/projects/island-survival-raft.png',
      alt: 'Island Survival raft escape sequence',
    },
    about: [
      'Island Survival: Escape is a first-person 3D survival and crafting game built entirely from scratch with WebGL 2 and vanilla JavaScript without external 3D game engines.',
      'The player awakens shipwrecked on a procedurally generated tropical island. To escape, you must explore diverse biomes, collect materials and ocean debris, craft tools, manage survival vitals, construct three raft modules, and launch your escape into the sea.',
    ],
    info: [
      'Role: WebGL Engine & Gameplay Developer',
      'Engine: Custom WebGL 2 Engine (Vanilla JS)',
      'Language: JavaScript (ES6+), GLSL Shaders',
      'Build Tool: Vite',
      'Genre: First-Person 3D Survival & Crafting',
    ],
    codeLink: {
      label: 'Code - Island Survival WebGL',
      url: 'https://github.com/duongdatdev/island-survival-webgl',
    },
    actionLinks: [
      {
        label: 'View Source Code',
        url: 'https://github.com/duongdatdev/island-survival-webgl',
        className: 'project-btn code-btn',
      },
    ],
    sections: [
      {
        title: 'Custom WebGL 2 Engine and Rendering Pipeline',
        paragraphs: [
          'The 3D engine is built from scratch using WebGL 2 and GLSL shaders, implementing a first-person camera with pointer locking, low-poly model rendering, custom materials, dynamic lighting, real-time shadow projection, and procedural ocean water rendering with wave vertex displacement.',
          'Atmospheric rendering includes a dynamic day-night cycle, volumetric ambient lighting transitions, changing weather conditions, and performance-optimized draw-call batching targeting a smooth 60 FPS in desktop browsers.',
        ],
      },
      {
        title: 'Procedural World Generation and Biomes',
        paragraphs: [
          'Each world is generated from a unique seed, carving out organic terrain featuring sandy beaches, dense tropical palm forests, rocky plateaus, hidden caverns, and waterfalls.',
          'The environment placement system dynamically populates resources, vegetation, collectible rocks, and landmark points of interest while guaranteeing accessible shorelines for the shoreline raft construction site.',
        ],
      },
      {
        title: 'Survival Vitals, Debris, and Raft Escape Progression',
        paragraphs: [
          'The core survival loop challenges players to manage health, hunger, thirst, and stamina against hunger decay, wildlife threats, and environmental exposure.',
          'Ocean currents regularly wash floating debris ashore, including wood, barrels, and rope. Players gather resources to craft stone axes, survival gear, and the three vital raft escape components: the Raft Frame, Barrel Floats, and the Paddle.',
          'Once all components are assembled at the shoreline dock, the player triggers the escape cinematic sequence to complete the game run.',
        ],
      },
      {
        title: 'Wildlife AI, World Saves, and Progression',
        paragraphs: [
          'The island ecosystem features both passive wildlife (crabs, seagulls) and hostile threats (wild boars on land, sharks in deep coastal waters) with custom state-machine behavior and combat interactions.',
          'The game supports saving multiple distinct worlds locally with persistent inventory, constructed buildings, unlocked achievements, and customizable settings.',
        ],
      },
      {
        title: 'What I built',
        paragraphs: [
          'I designed and programmed the complete WebGL 2 rendering pipeline, first-person physics and camera controllers, procedural terrain generator, drifting debris simulation, crafting recipe graph, grid inventory UI, wildlife AI, and save/load serialization.',
          'This project demonstrated the ability to construct a complete, performant 3D game engine and gameplay loop entirely from low-level WebGL 2 APIs without relying on Three.js, Babylon.js, or Unity.',
        ],
      },
    ],
  },
  {
    title: 'Caro Game Web',
    slug: 'caro-game',
    category: 'Web',
    meta: 'Solo | Laravel | Vue 3',
    role: 'Full-stack Developer',
    shortDescription:
      'An online Gomoku game with rooms, realtime moves, in-room chat, leaderboards, match history, and authentication.',
    card: {
      imageSrc: '/projects/caro-game-board.png',
      alt: 'Caro Game Web board',
    },
    hero: {
      imageSrc: '/projects/caro-game-board.png',
      alt: 'Caro Game Web board',
    },
    about: [
      'Caro Game Web is an online Gomoku game built with Laravel and Vue, focused on real-time multiplayer play.',
      'Players can create or join rooms, mark themselves ready, play on a 15x15 board, chat in-room, and track match history, statistics, and leaderboards.',
    ],
    info: [
      'Role: Full-stack Developer',
      'Frontend: Vue 3, Inertia.js, TailwindCSS',
      'Backend: Laravel 11',
      'Realtime: Pusher / Reverb WebSockets',
      'Database: MySQL',
    ],
    codeLink: {
      label: 'Code - Caro Game Web',
      url: 'https://github.com/duongdatdev/caro-game-web',
    },
    sections: [
      {
        title: 'Realtime Gomoku System',
        paragraphs: [
          'This project implements an online Caro/Gomoku experience with private rooms, random matchmaking, player readiness, turn-based move validation, in-room chat, and realtime updates through WebSockets.',
          'The game board is a responsive 15x15 grid where each move updates local state immediately and then syncs with the backend. Room events cover players joining, leaving, getting ready, making moves, sending messages, and finishing a game.',
        ],
      },
      {
        title: 'What I built',
        paragraphs: [
          'I built the game room flow, board interaction, chat panel, ready system, win modal, toast feedback, authentication, leaderboard, match history, and player statistics screens.',
          'This project helped me practice backend integration, realtime event architecture, Vue component design, Inertia page state, Laravel controllers/models, and testing multiplayer behavior with e2e tests.',
        ],
      },
    ],
  },
]

export const slugToTitle = (slug: string): string | null => {
  const project = projects.find((p) => p.slug === slug.toLowerCase())
  return project ? project.title : null
}

export const titleToSlug = (title: string): string => {
  const project = projects.find((p) => p.title === title)
  return project ? project.slug : ''
}

export const getProjectByTitle = (title: string): ProjectData | undefined => {
  return projects.find((p) => p.title === title)
}
