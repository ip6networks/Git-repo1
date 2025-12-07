# Copilot Instructions for 3D Portfolio Project

## Project Overview
This is a creative 3D interactive portfolio website using Three.js that renders a 3D model of a "hacker face" where facial features are clickable interaction points. Different facial regions (eyes, nose, mouth, ears, forehead) trigger modal panels displaying different portfolio sections (projects, skills, about, contact, experience).

## Architecture

### Core Components

**Three.js 3D Scene** (`script.js`)
- Uses Three.js r128 for 3D rendering with canvas-based WebGL
- GLTFLoader loads a 3D face model from `assets/models/` directory
- Auto-scales and centers the loaded model using bounding box calculations
- Handles raycasting for detecting facial feature clicks

**UI Layer** (`index.html`, `style.css`)
- Modal info panels for displaying content sections
- Fixed navbar with navigation and hints
- Hint animations that fade in sequentially after 2.2-3s delays
- Green matrix-style hacker aesthetic (#00ff00 on dark background)

### Data Flow
1. User clicks canvas → raycasting detects facial feature intersection
2. Feature maps to section (eye→projects, nose→skills, etc.)
3. Modal panel populates with content and scales into view
4. User closes panel → modal scales out and removes content

## Key Patterns

**Loading & Model Setup** (`script.js`)
- Loading screen displays during model fetch with progress bar animation
- Model is added to scene, then bounding box calculated on next frame via `setTimeout(..., 100)`
- Scale formula: `scale = 2 / maxDim` where maxDim is largest dimension
- Camera positioned at `maxDim * 1.5` on z-axis for optimal framing

**UI State Management**
- Info panel uses CSS transform `scale(0)` for hide, `scale(1)` for show
- `.active` class toggles visibility via `info-panel.active` selector
- Content injected into `#infoContent` div before panel activation

**Styling Conventions**
- Terminal/hacker theme: monospace font (`'Courier New'`), green-on-black color scheme
- Consistent hover effects: background brightens + border color → green + slight translate
- All fixed positioning elements use explicit z-index layers (100 for navbar/hints, 200 for modals, 1000 for loading)

## Critical Implementation Details

**Raycasting Setup** (implied from architecture)
- Must use normalized mouse coordinates for raycasting across different screen sizes
- Facial features should be identifiable as separate mesh groups or by name in the GLTF model
- Feature collision detection should happen on mouse click events

**Model Loading Robustness**
- GLTF model path in HTMLElement should point to `assets/models/[model-name].gltf` or `.glb`
- Model may need material adjustments (emissive, lighting) for visibility against dark background
- Bounding box calculation must occur after model addition to scene (hence the setTimeout)

**Responsive Design**
- Hint hints are hidden on mobile; navbar nav-hint is display:none
- Info panel uses `max-width: 800px` with `width: 90%` for mobile scaling
- Contact links become `flex-direction: column` on screens ≤768px

## Common Tasks

**Add New Portfolio Section**
1. Add hint element in `index.html` with emoji and label
2. Assign hint animation delay (must follow 0.2s spacing pattern from 2.2s base)
3. Add feature detection in raycasting code (map facial feature to section ID)
4. Create content template with matching class (e.g., `.experience-card` for experience)

**Update Model**
1. Replace GLTF file in `assets/models/`
2. Adjust scale factor if model dimensions significantly differ
3. Test raycasting coordinates match new model's feature positions

**Modify Theme Colors**
- Primary color: `#00ff00` (matrix green) - update in CSS color properties and text-shadow
- Background: `#0a0a0a` (near-black) - consistent across body, panel, and loading screen
- Accent opacity: `rgba(0, 255, 0, X)` where X varies (0.05 for subtle, 0.3 for prominent)
