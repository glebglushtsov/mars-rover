import { expect } from 'chai';

import createWorld from './world.js';

describe('World', () => {
    let world;

    beforeEach(() => {
        world = createWorld([
            [ 'P', 'P', 'P', 'C', 'P' ],
            [ 'P', 'M', 'P', 'C', 'P' ],
            [ 'P', 'M', 'P', 'C', 'P' ],
            [ 'P', 'M', 'P', 'P', 'P' ],
            [ 'P', 'M', 'P', 'P', 'P' ]
        ]);
    });

    describe('When the World is created', () => {
        it('should be able to build a path', () => {
            expect(world.buildPath([ 0, 0 ], [ 4, 4 ])).to.deep.equal([
                [ 0, 0 ], [ 1, 0 ],
                [ 2, 0 ], [ 2, 1 ],
                [ 2, 2 ], [ 2, 3 ],
                [ 2, 4 ], [ 3, 4 ],
                [ 4, 4 ]
            ]);
        });
    });
});