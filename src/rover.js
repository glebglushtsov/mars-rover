/*
  Mars Rover

  You are to build the backing logic behind an API to navigate a bidirectional rover along a two dimensional cartesian plain (x,y) representation of the planet Mars. Each point will include a topographical label designating the terrain at that location.

  Map Example:

  (0,0)
   	  ['P', 'P', 'P', 'C', 'P'],
	  ['P', 'M', 'P', 'C', 'P'],
	  ['P', 'M', 'P', 'C', 'P'],
	  ['P', 'M', 'P', 'P', 'P'],
	  ['P', 'M', 'P', 'P', 'P']
                          (4,4)

  Details:

  - The rover when initialized will be provided an initial starting point (x, y) as well as a starting direction (N, S, E, W) that the rover is facing
  - The rover should receive its commands as a string array. e.g. ['F', 'B', 'L', R']
  - The rover may move forward and backward with the (F, B) character commands
  - The rover may turn left and right with the (L, R) character commands
  - The rover should execute all given commands in sequence
    - If: The rover is given a valid command
      - Then: Update the rovers direction or location
    - If: All commands have been executed
      - Then: return an OK status along with the location and direction
    - If: The rover is provided a command that would result in the rover entering terrain that is an obstacle
      - Then: return an OBSTACLE status code along with the last successful location and direction of the rover
    - If: The rover is provided an invalid command
      - Then: return an INVALID_COMMAND status code along with the last successful location and direction of the rover
    - If: The rover is given a command that would result in leaving the edge of the world
      - Then: return an OBSTACLE status code along with the last successful location and direction of the rover

  Further Instructions:

  - Implement your code to make the below tests pass
  - Feel free to modify any code you wish to suit your preference. Also, don't feel limited to methods provided feel free add more (encouraged)
  - If you modify exercise code (i.e use functional instead of class based Rover) you'll need to modify the tests accordingly
  - Read the tests! They have helpful in better understanding the requirements

  Extra Credit:

  The below extra credit is optional (really).

  - add a moveTo() method that takes the (x,y) coordinates to move the rover along the most optimal path bypassing obstacles
  - https://en.wikipedia.org/wiki/A*_search_algorithm
  - https://en.wikipedia.org/wiki/Dijkstra's_algorithm
*/

import { convertPathToCommands } from './utils.js';

const STATUS_CODES = {
    OK:              'OK',
    OBSTACLE:        'OBSTACLE',
    INVALID_COMMAND: 'INVALID_COMMAND'
};

const COORDS_DIFF = {
    'N': [ 0, -1 ],
    'S': [ 0, 1 ],
    'W': [ -1, 0 ],
    'E': [ 1, 0 ],
}

const DIRECTIONS = [ 'N', 'E', 'S', 'W' ];
// const COMMANDS = [ 'L', 'R', 'F', 'B' ];

export function createRover(location, direction) {
    let commands = [];
    let world = null;
    let status = STATUS_CODES.OK;

    function canMoveTo(x, y) {
        return world ? world.canMoveTo(x, y) : true;
    }

    return {
        commands,
        direction,
        location,

        setWorld(w) {
            world = w;
            return this;
        },

        moveTo(x, y) {
            const path = canMoveTo(x, y) ? world.buildPath(this.location, [ x, y ]) : [];
            return this.command(convertPathToCommands(path, this.direction));
        },

        command(cmds) {
            this.commands = cmds;
            // console.log({direction: this.direction, location: this.location, commands: this.commands});

            for (let i = 0; i < cmds.length; i++) {
                const command = cmds[i];

                switch (command) {
                    case 'L':
                        this.rotateLeft();
                        break;

                    case 'R':
                        this.rotateRight();
                        break;

                    case 'F':
                        this.moveForward();
                        break;

                    case 'B':
                        this.moveBackward();
                        break;

                    default:
                        status = STATUS_CODES.INVALID_COMMAND;
                        break;
                }
            }

            // console.log({status, location: this.location, direction: this.direction});
            return { status, loc: this.location, dir: this.direction };
        },

        rotateLeft() {
            const currentIndex = DIRECTIONS.indexOf(this.direction);

            this.direction = currentIndex === 0 ? DIRECTIONS[DIRECTIONS.length - 1] : DIRECTIONS[currentIndex - 1];
        },

        rotateRight() {
            const currentIndex = DIRECTIONS.indexOf(this.direction);

            this.direction = currentIndex === DIRECTIONS.length - 1 ? DIRECTIONS[0] : DIRECTIONS[currentIndex + 1];
        },

        moveForward() {
            const [ x, y ] = this.location;
            const [ dx, dy ] = COORDS_DIFF[this.direction];
            const newX = x + dx;
            const newY = y + dy;

            if (canMoveTo(newX, newY)) {
                this.location = [ newX, newY ];
            } else {
                status = STATUS_CODES.OBSTACLE;
            }
        },

        moveBackward() {
            const [ x, y ] = this.location;
            const [ dx, dy ] = COORDS_DIFF[this.direction];
            const newX = x - dx;
            const newY = y - dy;

            if (canMoveTo(newX, newY)) {
                this.location = [ newX, newY ];
            } else {
                status = STATUS_CODES.OBSTACLE;
            }
        },
    };
}