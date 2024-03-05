import { expect } from 'chai';

import { createPriorityQueue, getManhattanDistance, convertPathToCommands } from './utils.js';

describe('Utils', () => {
    describe('PriorityQueue', () => {
        let queue;

        beforeEach(() => {
            queue = createPriorityQueue();
        });

        it('creates an empty PriorityQueue', () => {
            expect(queue.isEmpty()).to.equal(true);
        });

        it('adds elements to the queue', () => {
            queue.add('foo', 2)

            expect(queue.isEmpty()).to.equal(false);
        });

        it('pops elements according to priority', () => {
            queue.add('foo', 2)
            queue.add('baz', 0)
            queue.add('bar', 4)

            expect(queue.remove()).to.deep.equal('baz');
        });
    })

    describe('getManhattanDistance()', () => {
        it('calculates manhattan distance between 2 locations', () => {
            expect(getManhattanDistance([ 4, 8 ], [ 7, 12 ])).to.equal(7);
        });
    })

    describe('convertPathToCommands()', () => {
        it('converts path to commands', () => {
            expect(convertPathToCommands([
                [ 0, 0 ], [ 1, 0 ],
                [ 2, 0 ], [ 2, 1 ],
                [ 2, 2 ], [ 2, 3 ],
                [ 2, 4 ], [ 3, 4 ],
                [ 4, 4 ]
            ], 'E')).to.deep.equal([ 'F', 'F', 'R', 'F', 'F', 'F', 'F', 'L', 'F', 'F' ]);
        });
    });
});