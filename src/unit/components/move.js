import H3Unit from '../h3unit'
import './component'

/**
*
* @class
*/

H3Unit.Component.Move = function () {};

H3Unit.Component.Move.prototype = {

    initMove: function(){

        this.speed = this.unitAttr.speed || 0;
        this.initTurn();

    },

    initTurn: function (){

        this.animations.getAnimation('turn').onComplete.add(function (sprite, animation) {    
            if(animation.reversed == false){
                this.direction *= -1;
                animation.reverseOnce().play()
            }
            if(!animation.isPlaying){
                this.state.selectUnit.checkStatus();                 
            }  
        }, this);

    },

    moveStart: function (){
                

        this.destPosition = this.path[this.step - 1].grid.polygon.points[0];        
        
        var direction = Math.abs(Phaser.Point.angle(this.position, this.destPosition)) < Math.PI / 2 ? -1 : 1;
        // console.log(direction > 0 ? 'right' : 'left');
        
        if( this.direction !== direction ){
            this.play('turn');
        }
        else{
            this.move();
        }
        
    },

    move: function (){
        
        this.animations.play('move');        
        
        var moveTween = this.state.add.tween(this).to(this.destPosition, this.position.distance(this.destPosition, true) * 2, Phaser.Easing.Linear.None, false);
        moveTween.start().onComplete.addOnce(function (sprite, tween) {
            
            this.step--
            this.gridPosition = this.path[this.step];
            if(this.step === 0 ){
                this.animations.play('stand');
            }
            this.checkStatus();   
                 
        }, this); 
    },



}