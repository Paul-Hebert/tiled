## "Three Level Demo Plan"

### Levels:

- First level: placing tiles, no money, no terrain
- Second level: money
- Third level: money and terrain: missing pieces, surround junk to grow flowers

### Priorities:

- Gameplay:
  - Predefined tiles for levels
  - Turn on/off features (e.g. money)
  - Better terrain system
  - Basic audio
  - Fix bug where "next turn" does nothing after final level
- Graphics:
  - Flowers
  - Seeds
  - "Junk"
  - Explore new graphics styles
- UI
  - Messaging system
    - Level announcements
    - Toasts
  - Better "too expensive" treatment
  - Phone UI/Responsive designs
- Technical:
  - Level selector (via env?)

## Core Placement UI

- Flipping tiles
- Refactor tile display into individual SVGs to enable animations that rely on z-index? Or reorder the tiles based on position?
- "destroyed"/non-fillable places on grid

## Surrounding Game UI

- Fix phone layout
- "Messages" system

## Core Shared Game Logic

- Better "winning" announcements
- "Can't place" state + losing the game
- Specific tiles for levels

## Enhanced Placement UI

- Dark/light themes

## Game Concepts

- Choosing between tiles
- Paying for tiles
- Income
- Surrounding spots
- Different scoring objectives/patterns
- Fill the board puzzles
