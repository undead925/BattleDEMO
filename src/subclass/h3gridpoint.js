
/**
* @class H3GridPoint
* @constructor
* @param {number} [x=0] - The horizontal grid position of this Point.
* @param {number} [y=0] - The vertical grid position of this Point.
*/

var H3GridPoint = function(x, y, grids){

    x = x || 0;
    y = y || 0;

    Phaser.Point.call(this, x, y);    

    this.grids = grids;                   
}

H3GridPoint.RIGHTUP = 0;
H3GridPoint.RIGHT = 1;
H3GridPoint.RIGHTDOWN = 2;
H3GridPoint.LEFTDOWN = 3;
H3GridPoint.LEFT = 4;
H3GridPoint.LEFTUP = 5;

H3GridPoint.prototype = Object.create(Phaser.Point.prototype);
H3GridPoint.prototype.constructor = H3GridPoint;

H3GridPoint.prototype.getAroundGrid = function (direction) {     
    switch (direction){
        case 0 :
            return this.grid.rightUpGrid;
        case 1 :    
            return this.grid.rightGrid;
        case 2 :
            return  this.grid.rightDownGrid;
        case 3 :
            return this.grid.leftDownGrid;
        case 4 :
            return this.grid.leftGrid;
        case 5 :
            return this.grid.leftUpGrid;
        default:
            return this.grid.rightUpGrid;
    }
}


Object.defineProperty(H3GridPoint.prototype, "grid", {
    get: function (){
        return this.grids[this.x][this.y];
    }
});    

export default H3GridPoint;