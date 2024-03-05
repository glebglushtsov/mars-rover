import {expect} from 'chai';

import Rover from './rover.js';

describe('Mars Rover', function() {
    let rover;

    beforeEach(function() {
        rover = new Rover([2,2], 'N');
    });

    describe('When the Mars Rover is initialized', function() {
        it('should set the starting location', function() {
            expect(rover.location).to.deep.equal([2,2]);
        });

        it('should set the starting direction', function() {
            expect(rover.direction).to.equal('N');
        });
    });

    describe('When the rover receives commands', function() {
        it('should store the commands', function() {
            rover.command(['F', 'F', 'B']);

            expect(rover.commands).to.deep.equal(['F', 'F', 'B']);
        });

        it('should handle invalid commands', function() {
            const status = rover.command(['X']);

            expect(status).to.deep.equal({
                status: 'INVALID_COMMAND',
                loc: [2,2],
                dir: 'N'
            });
        });
    });

    describe('When the rover executes valid commands', function() {
        describe('When facing north', function() {
            describe('When moving forward', function() {
                it('should move north one tile', function() {
                    const state = rover.command(['F']);

                    expect(state).to.deep.equal({
                        status: 'OK',
                        loc: [2,1],
                        dir: 'N'
                    });
                });
            });

            describe('When moving backward', function() {
                it('should move south one tile', function() {
                    const state = rover.command(['B']);

                    expect(state).to.deep.equal({
                        status: 'OK',
                        loc: [2,3],
                        dir: 'N'
                    });
                });
            });

            describe('When turning left', function() {
                it('should be facing west', function() {
                    const state = rover.command(['L']);

                    expect(state).to.deep.equal({
                        status: 'OK',
                        loc: [2,2],
                        dir: 'W'
                    });
                });
            });

            describe('When turning right', function() {
                it('should be facing east', function() {
                    const state = rover.command(['R']);

                    expect(state).to.deep.equal({
                        status: 'OK',
                        loc: [2,2],
                        dir: 'E'
                    });
                });
            });
        });
    });

    describe.skip('When the rover encounters obstacles', function() {
        describe('When encountering a mountain', function() {
            it('should stop and return status', function() {
                const state = rover.command(['L', 'F']);

                expect(state).to.deep.equal({
                    status: 'OBSTACLE',
                    loc: [2,2],
                    dir: 'W'
                });
            });
        });

        describe('When encountering a crevasse', function() {
            it('should stop and return status', function() {
                const state = rover.command(['F', 'F', 'R', 'F']);

                expect(state).to.deep.equal({
                    status: 'OBSTACLE',
                    loc: [2,0],
                    dir: 'E'
                });
            });
        })

        describe('When encountering the edge of the world', function() {
            it('should stop and return status', function() {
                const state = rover.command(['F', 'F', 'F']);

                expect(state).to.deep.equal({
                    status: 'OBSTACLE',
                    loc: [2,0],
                    dir: 'N'
                });
            });
        });
    });
});