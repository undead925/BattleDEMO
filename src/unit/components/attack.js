import H3Unit from '../h3unit'
import './component'

/**
*
* @class
*/

H3Unit.Component.Attack = function () {};

H3Unit.Component.Attack.prototype = {

    initAttack: function (){

        this.attacks = 0;

        this.attacksMax = this.unitAttr.attacks || 0;

        // this.attacks = this.attacksMax;
        var attackEnd = function () {
            this.attacks--
            this.actUnit.animations.play('gethit');
            this.animations.play('stand');
        }

        this.animations.getAnimation('attackup').onComplete.add(attackEnd, this);
        this.animations.getAnimation('attack').onComplete.add(attackEnd, this);
        this.animations.getAnimation('attackdown').onComplete.add(attackEnd, this);
        this.animations.getAnimation('gethit').onComplete.removeAll();
        this.animations.getAnimation('gethit').onComplete.add(function (sprite, tween) {
            this.checkStatus();                
        }, this);        


    },

    attack: function (){
        if( this.direction !== this.attackDirection ){
            this.play('turn');
        }
        else if (this.actUnit.unitComponents['Move'] && this.direction == this.actUnit.direction){
            this.actUnit.play('turn');
        }
        else{
            this.play(this.attackAnim);
        }
    },

    setAttack: function (){
        var list = this.state.unitCycleSet.list;
        for(let i = 0, l = list.length; i < l ; i++){
            var loopUnit = list[i];
            if(this.camp !== loopUnit.camp){
                for(let j = 0;j < 6;j++){
                    let aroundGrid = loopUnit.gridPosition.getAroundGrid(j);
                    if(aroundGrid && aroundGrid.step > -1){
                        loopUnit.parent[j].mouseClass = 'mouse'+(j + 6);
                    }
                    else{
                        loopUnit.parent[j].mouseClass = 'mouse2';
                    }
                }
            }
        }

    },


    


}