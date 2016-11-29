import H3Unit from './h3unit'
// import './components/core'
import './components/act'
import './components/move'
import './components/walk'
import './components/attack'

/**
* @class WalkUnit
* @constructor
* @extends H3Unit
* @param {Phaser.State} state - A reference to the currently running state.
* @param {number} x - The x coordinate (in grid space) to position the Sprite at.
* @param {number} y - The y coordinate (in grid space) to position the Sprite at.
* @param {object} unitAttr - A object consisting of unit attributes (spriteName, speed, moveMode, animations)
* @param {number} camp - The flag of unit camp.
*/
var WalkUnit = function (state, gridX, gridY, unitAttr, camp){

    gridX = gridX || 0;
    gridY = gridY || 0;

    H3Unit.call(this, state, unitAttr);

    this.camp = camp || H3Unit.LEFTCAMP;
    
    this.direction = this.camp;


    // add this unit to game 
    this.anchor.set(0.5,0.55);
    this.position.copyFrom(state.grids[gridX][gridY].polygon.points[0]);
    this.gridPosition = new Phaser.Point(gridX, gridY);
    this.order = state.unitCycleSet.total;
    state.unitCycleSet.add(this);

}

WalkUnit.prototype = Object.create(H3Unit.prototype)
WalkUnit.prototype.constructor = WalkUnit;

H3Unit.Component.install.call(WalkUnit.prototype, [
    'Act',
    'Move',
    'Walk',
    'Attack'
]);

// Phaser.Utils.mixinPrototype(WalkUnit.prototype, H3Unit.Component.Move.prototype)
// Phaser.Utils.mixinPrototype(WalkUnit.prototype, H3Unit.Component.Walk.prototype)

export default WalkUnit;
