# Planning Guide

An interactive, visual educational tool that teaches the SURF (Speeded Up Robust Features) algorithm step-by-step, making the complex mathematics intuitive through animated visualizations and interactive demonstrations.

**Experience Qualities**: 
1. **Educational** - Clear, progressive learning that breaks down complex concepts into digestible visual steps
2. **Interactive** - Hands-on exploration where users can control the pace and see each algorithm phase in action
3. **Intuitive** - Visual representations that make mathematical operations tangible through color grids and animations

**Complexity Level**: Light Application (multiple features with basic state)
  - Multiple interactive steps with state management for tutorial progression, visual demonstrations of algorithm phases, and user-controlled playback

## Essential Features

### Step-by-Step Tutorial Navigation
- **Functionality**: Sequential walkthrough of SURF algorithm phases with prev/next controls and progress indication
- **Purpose**: Guide learners through the algorithm systematically without overwhelming them
- **Trigger**: User loads the page and clicks "Comenzar" or uses navigation buttons
- **Progression**: Landing intro → Step 1 (Interest Points) → Step 2 (Box Filters) → Step 3 (Haar Wavelets) → Step 4 (Descriptor Vector) → Step 5 (Matching) → Completion
- **Success criteria**: Users can navigate freely between steps, see progress, and understand each phase before moving forward

### Interactive Image Grid Visualization
- **Functionality**: Display sample images as pixel grids with highlighted regions showing algorithm operations in real-time
- **Purpose**: Make abstract pixel operations concrete and visible
- **Trigger**: Automatically displays when user reaches relevant steps
- **Progression**: Show base image → Highlight interest point → Visualize filter application → Show gradient calculations → Display descriptor region
- **Success criteria**: Clear visual distinction between different regions, smooth animations, and color-coded explanations

### Animated Algorithm Execution
- **Functionality**: Step-by-step animation of SURF operations (box filters, Haar wavelets, orientation calculation)
- **Purpose**: Transform mathematical formulas into visual operations students can follow
- **Trigger**: User clicks "Ejecutar Paso" or "Reproducir Animación"
- **Progression**: Setup initial state → Animate filter movement → Show calculation results → Highlight output values → Display final descriptor
- **Success criteria**: Animation timing feels natural, calculations are visible, users can pause/replay

### Simplified Mathematical Explanations
- **Functionality**: Plain language explanations with optional formula reveals and visual analogies
- **Purpose**: Reduce math anxiety by explaining "why" before "how" with visual context
- **Trigger**: Displayed alongside each step, expandable for detail
- **Progression**: Simple description → Visual analogy → Mathematical formula (optional) → Practical application
- **Success criteria**: Non-technical users understand concepts without formulas, advanced users can access details

### Interactive Parameter Controls
- **Functionality**: Sliders and controls to adjust algorithm parameters and see immediate visual impact
- **Purpose**: Experiential learning through manipulation and observation
- **Trigger**: Available on relevant steps (threshold adjustment, region size, octaves)
- **Progression**: Default parameters shown → User adjusts slider → Visualization updates in real-time → Results explained
- **Success criteria**: Responsive updates, clear cause-effect relationship, bounded safe values

## Edge Case Handling
- **Empty State**: Show friendly welcome screen with "Comenzar" button and brief SURF overview
- **Step Completion**: Celebrate progress with smooth transitions and visual feedback
- **Mobile Adaptation**: Stack visualizations vertically, simplify grids for smaller screens, ensure touch-friendly controls
- **Animation Performance**: Use requestAnimationFrame, limit particle counts, provide skip animation option
- **Browser Compatibility**: Fallback to static images if Canvas API unavailable

## Design Direction
The design should feel educational yet modern—like an interactive textbook brought to life. It should be approachable and encouraging, reducing intimidation around computer vision concepts. A clean, organized interface with generous whitespace helps focus attention on the visualizations, while subtle animations create engagement without distraction.

## Color Selection
Triadic color scheme to clearly differentiate between algorithm phases (detection, orientation, description) while maintaining visual harmony and educational clarity.

- **Primary Color**: Deep Blue `oklch(0.45 0.15 250)` - Represents stability and intelligence, used for main UI elements and conveys trustworthiness in educational context
- **Secondary Colors**: 
  - Warm Orange `oklch(0.65 0.18 45)` - Highlights interest points and important regions in visualizations
  - Fresh Teal `oklch(0.60 0.12 190)` - Represents processed data and descriptor outputs
- **Accent Color**: Vibrant Coral `oklch(0.70 0.20 25)` - Draws attention to interactive controls and active animation elements
- **Foreground/Background Pairings**:
  - Background (Soft Cream `oklch(0.97 0.01 85)`): Dark text `oklch(0.25 0.01 250)` - Ratio 11.2:1 ✓
  - Card (White `oklch(1 0 0)`): Dark text `oklch(0.25 0.01 250)` - Ratio 13.8:1 ✓
  - Primary (Deep Blue `oklch(0.45 0.15 250)`): White text `oklch(0.98 0 0)` - Ratio 7.2:1 ✓
  - Secondary (Warm Orange `oklch(0.65 0.18 45)`): Dark text `oklch(0.20 0.02 45)` - Ratio 8.1:1 ✓
  - Accent (Vibrant Coral `oklch(0.70 0.20 25)`): White text `oklch(0.98 0 0)` - Ratio 4.9:1 ✓
  - Muted (Light Gray `oklch(0.94 0.005 250)`): Medium text `oklch(0.50 0.02 250)` - Ratio 6.8:1 ✓

## Font Selection
Typography should feel modern and readable, balancing educational clarity with approachable personality—technical enough for learning but friendly enough to reduce math anxiety.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold / 36px / -0.02em letter spacing / Used for main "SURF Descriptor" heading
  - H2 (Step Titles): Inter SemiBold / 28px / -0.01em letter spacing / Identifies each algorithm phase
  - H3 (Section Headers): Inter Medium / 20px / normal letter spacing / Labels for visualization regions
  - Body (Explanations): Inter Regular / 16px / 1.6 line height / Main instructional text
  - Caption (Technical Details): Inter Regular / 14px / 1.5 line height / Formula annotations and parameters
  - Code (Values): JetBrains Mono Regular / 14px / Used for numerical outputs and calculations

## Animations
Animations should be purposeful and educational—every motion teaches something about the algorithm. The balance leans toward functionality with strategic moments of delight when concepts "click" into understanding.

- **Purposeful Meaning**: Sliding box filters teach convolution, color transitions show gradient calculations, growing vectors illustrate descriptor building—each animation directly maps to an algorithm operation
- **Hierarchy of Movement**: 
  1. Critical algorithm operations (filter scanning, feature detection) - 800-1200ms, smooth
  2. Step transitions and progress updates - 300-400ms, snappy
  3. Hover states and button feedback - 150-200ms, immediate
  4. Celebratory moments (completing steps) - 500ms with spring physics

## Component Selection

- **Components**: 
  - `Card` - Contains each step's content with visual hierarchy
  - `Button` - Navigation controls (Anterior/Siguiente, Ejecutar), primary variants for main actions
  - `Progress` - Shows tutorial completion percentage at top
  - `Tabs` - Alternative view for technical users to toggle between visual/mathematical explanations
  - `Slider` - Parameter controls for interactive experimentation
  - `Badge` - Labels for algorithm phases and technical terms
  - `Separator` - Divides explanation from visualization sections
  - `Tooltip` - Hover hints for technical terms and controls

- **Customizations**: 
  - Custom Canvas component for pixel grid visualization with color-coded cells
  - Animated box overlay component that slides across grid to show filter application
  - Vector arrow component for orientation display
  - Custom stepper component with visual icons for each SURF phase

- **States**: 
  - Buttons: Default (subtle shadow), Hover (lift 2px, deepen shadow), Active (press down 1px), Disabled (50% opacity)
  - Slider: Default track, Active thumb (scale 1.1), Dragging (scale 1.15 with shadow)
  - Cards: Resting (subtle border), Active step (highlighted border in primary color, subtle glow)
  - Grid cells: Default, Highlighted (scale 1.05, bright border), Processing (pulsing animation)

- **Icon Selection**: 
  - `Play` / `Pause` - Animation controls
  - `SkipForward` / `SkipBack` - Step navigation
  - `Eye` - Visualization toggle
  - `Sliders` - Parameter adjustment section
  - `Grid` - Image/pixel view
  - `Crosshair` - Interest point detection
  - `ArrowsClockwise` - Reset/retry operations
  - `MagnifyingGlass` - Scale space concept
  - `CirclesThree` - Feature matching

- **Spacing**: 
  - Page container: px-6 py-8 (mobile), px-12 py-12 (desktop)
  - Card padding: p-6 for content, p-8 for main visualization cards
  - Grid gap: gap-6 between major sections, gap-4 within sections, gap-2 for inline elements
  - Button spacing: py-2.5 px-4 for standard, py-3 px-6 for primary actions

- **Mobile**: 
  - Stack visualizations and explanations vertically
  - Reduce grid size from 16x16 to 10x10 for better visibility on small screens
  - Transform parameter sliders to vertical orientation if space constrained
  - Collapse step navigation to dropdown selector on mobile
  - Single column layout with full-width cards
  - Sticky navigation bar at bottom for Anterior/Siguiente controls
