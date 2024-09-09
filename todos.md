## Deck Builder Option

### Short term steps

- Deck stuff
- Energy/Action Points
- Vitality/HP
- Seeds and trash

### Full Plan

- Features to remove/replace
  - Current money implementation
    - Bonus actions
    - Convert to "energy"?
    - Remove income
  - Current levels implementation
    - "Retry level"
    - Hard-coded tiles + grid
      - Replace with randomized grid
    - Level end should be handled differently
      - Give up/end mechanism
      - End on 0 energy or no playable actions
- Features to add
  - "Deck" composable
    - Cards
    - Draw card
    - Draw hand
    - Discard pile
    - Draw pile
    - Shuffle
  - "HP" composable
    - Refresh/set HP on game start
    - Lower HP
    - Increase HP
    - Trigger game end on 0 HP
  - "Energy" composable
    - Refresh/set on level start
    - Pay energy
    - Gain energy
  - "Hand"/"Card" UI
    - Can't play states + alerts
  - Cards:
    - Tiles
      - Mushrooms
        - Single play
        - Gain another mushroom
        - Cost: free
        - Single tile
      - Sunflower
        - Plus one seed for each adjacent flower when played
        - On larger tiles
    - Skills/Events 
      - Bees
        - +1 seed for each flower
      - Fungal Network
        - +2 mushrooms
    - Powers/traits
      - When mushroom surrounded, gain additional mushroom
      - When gain seed, 50% chance for bonus seed
  - Card abilities
    - Single play
    - On surrounded
    - On adjacent
    - Gain card
    - Gain power
    - Gain resource
  - Features on tile/grid
    - Mushrooms/flowers/etc. on tile
    - Trash/flowers? on grid
- UI
  - ResourceChange component (animated +/-)


## "Three Level Demo Plan"

### Levels:

- First level: placing tiles, no money, no terrain
- Second level: money
- Third level: money and terrain: missing pieces, surround junk to grow flowers

### Priorities:

- Gameplay:
  - Better terrain system
  - Basic audio
  - Fix bug where "next turn" does nothing after final level
- Design quality levels!
- Graphics:
  - Flowers
  - Seeds
  - "Junk"
  - Explore new graphics styles
- UI
  - Messaging system
    - Level announcements
    - Toasts
  - "Can't place" handling
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
