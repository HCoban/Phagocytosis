## Phagocytosis

### Background

Phagocytosis is a single-player game inspired by agar.io. The game will be rendered on a large rectangle representing an 2-d culture of living cells. All cells will have a circular shape with varying radii. The game will start with rendering of a cell at the center of the grid (this will be controlled by the user) and other cells at random locations. The game rules are as follows:

- Cells will grow by engulfing other cells which are smaller in radius. Engulfing will occur when two cells are in contact.
- The smaller a cell is, the faster it is.
- At random time points player's cell will be granted for additional features such as
  - sporing: the cell will gain resistance to be eaten for a certain time
  - flagellum: the cell will have a wipe-like weapon to freeze other cells opon click
  - teleportation: player's cell will be able to move to another location with a click
  - mitosis: Cell will divide into two smaller cells in order to speed-up. Cells will re-unite after a certain time.

### Functionality and MVP

Users will be able to:
- Start, pause, and reset the board.
- Move the cell with the keyboard and use special features with mouse clicks.
- Read controls on a how-to-play modal.

### Wireframes

This app will consist of a single screen containing four sections:
- Scoreboard: will display name and the current score of the player
- Buttons: will contain play/pause and restart Buttons
- Notifications: will notify the player when the user's cell gained a new skill/feature (f.e. flagellum). A short explanation will also be shown here.
- Board: This will be a large, scrollable grid where the game will be played. Cells will be rendered here.

Additionally, a modal will be rendered after the page loads to explain the rules and controls. Since the controls be easy to remember, no additional controls section is planned.

![wireframes](/wireframes/wireframe.png)

### Architecture and Technologies

The project will be implemented with the following technologies:

- Javascript and jquery for game logic and rendering.
- HTML5 Canvas for cell drawing.
- Easel.js and Tween.js for DOM manipulation.
- Webpack to bundle various scripts.

The following scripts are planned to be implemented.

- `phagocytosis.js`: this will be the webpack entry file.
- `cell.js`: will contain a MovingObject class. The constructor will accept options(radius, velocity, etc.) to generate a moving object. Instance methods will be implemented to determine collisions, creation, moving, teleportation, mitosis, sporing, and flagellum attack of cells.
- `game_view.js`: will handle key and click bindings.
- `util.js`: will contains functions for calculating distances, speed, etc.

### Implementation Timeline

**Day 1**: Setup node modules, webpack, learning easel.js and tween.js. Goals of the day are:

- Learn basics of easel.js and tween.js. Decide if tween.js is necessary/helpful or not for this project.
- Render user's cell

**Day 2**: Work on cell.js. Goals of the day are:

- Implement functions of cell.js.
- Fill the board with some cells
- Finish learning easel.js (and tween.js if it will be used)

**Day 3**: Implement key and click bindings. Implement additional feature functions. Goals of the day are:

- Making cells movable by the user
- Cells can divide and attack with a flagellum (implementation if flagellum attack may continue the next day)

**Day 4**: Style the board, add other components. Goals of the day are:
- Having a nice looking board and cells.
- Having no bugs
- Adding scoreboard, notification field, and start-pause buttons.
- Adding explanation modal.

### Bonus features
The following features are anticipated to be implemented as bonus.
- Sharing score on facebook, twitter
- Engulfing animation: Cell collision can be animated as engulfing instead of simple contact. This will require more reading.
- Antibiotic drop: A drop of antibiotic will occur on a random location and spread. Rendering of spreading antibiotic will require gradient-coloring, thus more reading will be needed. Player will need to eat antibiotic-resistant cells in order to gain resistance and survive the spreading antibiotic.   
