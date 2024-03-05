import { createPriorityQueue, getManhattanDistance } from './utils.js';

const TERRAIN_TYPES = {
    'P': {
        obstacle:    false,
        description: 'plains',
    },
    'M': {
        obstacle:    true,
        description: 'mountains'
    },
    'C': {
        obstacle:    true,
        description: 'crevasse'
    }
};

export function createWorld(field) {
    let _field = field;

    function getPossibleMoves(location) {
        const [ x, y ] = location;

        return [ [ 0, -1 ], [ 0, 1 ], [ -1, 0 ], [ 1, 0 ] ]
            .map(([ dx, dy ]) => [ x + dx, y + dy ])
            .filter(([ newX, newY ]) => canMoveTo(newX, newY));
    }

    function canMoveTo(x, y) {
        return y >= 0 && y < _field.length && x >= 0 && x < _field[y].length && !TERRAIN_TYPES[_field[y][x]].obstacle;
    }

    return {
        canMoveTo,

        buildPath(start, end) {
            const traverseQueue = createPriorityQueue().add(start, 0);
            const explorationLog = { [start]: null };
            const stepsToLocation = {[start]: 0};

            function exploreLocation(location) {
                if (location[0] === end[0] && location[1] === end[1]) {
                    return;
                }

                getPossibleMoves(location).forEach(adjacentLocation => {
                    const distance = stepsToLocation[location] + 1;

                    if (!(adjacentLocation in stepsToLocation) || distance < stepsToLocation[adjacentLocation]) {
                        stepsToLocation[adjacentLocation] = distance;
                        traverseQueue.add(adjacentLocation, distance + getManhattanDistance(end, adjacentLocation));
                        explorationLog[adjacentLocation] = location;
                    }
                });

                // console.log({explorationLog, stepsToLocation});
                if (!traverseQueue.isEmpty()) {
                    exploreLocation(traverseQueue.remove());
                }
            }

            exploreLocation(start);

            function buildPathFromExploration(current) {
                if (current === start) {
                    return [ start ];
                }

                const previous = explorationLog[current];
                const result = buildPathFromExploration(previous);
                result.push(current);

                return result;
            }

            const path = buildPathFromExploration(end);

            // console.log({ explorationLog, path });
            return path;
        }
    }
}
