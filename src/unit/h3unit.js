
/**
* @class H3Unit
* @constructor
* @extends Phaser.Sprite
* @param {Phaser.State} state - A reference to the currently running state.
* @param {number} x - The x coordinate (in grid space) to position the Sprite at.
* @param {number} y - The y coordinate (in grid space) to position the Sprite at.
* @param {object} unitAttr - A object consisting of unit attributes (spriteName, speed, animations)
* @param {number} camp - The flag of unit camp.
*/
var H3Unit = function (state, unitAttr){

    this.unitAttr = unitAttr;

    Phaser.Sprite.call(this, state.game, 0, 0, this.unitAttr.spriteName);

    //link game state
    this.state = state;

    this.exists = true;

    this.visible = true;

    this.alive = true;

    //h3unit init
    
    this.wait = false;

    this.defend = false;    

    this.cycled = false;

    // this.actable = false;

    this.animating = false;   

    this.init();
    

}

H3Unit.prototype = Object.create(Phaser.Sprite.prototype)
H3Unit.prototype.constructor = H3Unit;

H3Unit.LEFTCAMP = 1;

H3Unit.RIGHTCAMP = -1;

Object.defineProperty(H3Unit.prototype, "gridPosition", {
    get: function (){
        return this.parent.gridPosition;
    },
    set: function (value){
        this.parent && this.parent.unit && (this.parent.unit = null);
        this.state.grids[value.x][value.y].add(this);
        this.state.grids[value.x][value.y].unit = this;
    },
    configurable: true
});  

Object.defineProperty(H3Unit.prototype, "direction", {
    get: function (){
        return this.scale.x;
    },
    set: function (value){
        this.scale.x = value;
    }    
});      

Object.assign(H3Unit.prototype,{

    init: function (){

        
        this.initAnimation();

        var componentKeys = Object.keys(this.unitComponents);

        for(let i = 0, l = componentKeys.length; i < l ; i++){
            let key = componentKeys[i];
            this['init'+key].call(this); // this.initMove(); this.initAttack();        
        }

    },

    initAnimation: function (){

        var animations = this.unitAttr.animations;

        for(var i = 0, l = animations.length ; i < l ; i++ ){

            this.animations.add(animations[i].name, animations[i].frame, animations[i].rate, animations[i].loop);

        }

        this.animations.getAnimation('select').onComplete.add(function (sprite, animation){
            this.animations.play('stand');  
        }, this);

        this.animations.getAnimation('hover').onComplete.add(function (sprite, animation){
            this.animations.play('stand');            
        }, this);

        this.animations.getAnimation('stand').onStart.add(function (sprite, animation){
            this.animationTime = this.state.time.now;
            this.intervalTime = Math.floor((Math.random() * 5000 + 5000));
        }, this);

        this.animations.getAnimation('gethit').onComplete.add(function (sprite, tween) {
            this.animations.play('stand');
            this.state.selectUnit.checkStatus();               
        }, this);        

        this.animations.play('stand');

    },
    
    
        
})


export default H3Unit;
