// Priority Queue implementation for A* algorithm
export function createPriorityQueue() {
    let elements = [];

    return {
        isEmpty() {
            return elements.length === 0;
        },

        add(element, priority) {
            elements.push({ element, priority });
            elements.sort((a, b) => a.priority - b.priority);

            return this;
        },

        remove() {
            return elements.shift().element;
        },
    }
}

export function getManhattanDistance(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

export function convertPathToCommands(path, dir) {
    const commands = [];
    let direction = dir;

    for (let i = 1; i < path.length; i++) {
        const [ x1, y1 ] = path[i - 1];
        const [ x2, y2 ] = path[i];

        switch (direction) {
            case 'N':
                if (x2 > x1) {
                    commands.push('R');
                    commands.push('F');

                    direction = 'E';
                } else if (x2 < x1) {
                    commands.push('L');
                    commands.push('F');

                    direction = 'W';
                } else if (y2 > y1) {
                    commands.push('B');
                } else if (y2 < y1) {
                    commands.push('F');
                }

                break;

            case 'E':
                if (x2 > x1) {
                    commands.push('F');
                } else if (x2 < x1) {
                    commands.push('B');
                } else if (y2 > y1) {
                    commands.push('R');
                    commands.push('F');

                    direction = 'S';
                } else if (y2 < y1) {
                    commands.push('L');
                    commands.push('F');

                    direction = 'N';
                }

                break;

            case 'S':
                if (x2 > x1) {
                    commands.push('L');
                    commands.push('F');

                    direction = 'E';
                } else if (x2 < x1) {
                    commands.push('R');
                    commands.push('F');

                    direction = 'W';
                } else if (y2 > y1) {
                    commands.push('F');
                } else if (y2 < y1) {
                    commands.push('B');
                }

                break;

            case 'W':
                if (x2 > x1) {
                    commands.push('B');
                } else if (x2 < x1) {
                    commands.push('F');
                } else if (y2 > y1) {
                    commands.push('L');
                    commands.push('F');

                    direction = 'S';
                } else if (y2 < y1) {
                    commands.push('R');
                    commands.push('F');

                    direction = 'N';
                }

                break;
        }
    }

    // console.log({path, commands});
    return commands;
}