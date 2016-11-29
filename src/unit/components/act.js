
import H3Unit from '../h3unit'
import './component'

/**
*
* @class
*/

H3Unit.Component.Act = function () {};

H3Unit.Component.Act.prototype = {

    initAct: function (){

        this.actable = true;

    },

    actTo: function (destGrid){

        this.destGrid = destGrid;
        this.actUnit = destGrid.unit;

        if(this.actUnit){
            //friend or enemy
            if(this.camp === this.actUnit.camp){
                // do nothing for itself
                if(this === this.actUnit){
                    this.state.openAttrPanel(this);
                    this.destGrid = null;
                }
                else{
                    this.actToFriend();
                }         
            }
            else{
                this.actToEnemy();
            }
        }

        if(this.destGrid && this.destGrid.step > -1){
            this.state.controlbar.actionGroup.callAll('disable');

            this.animating = true;
            this.step = this.destGrid.path.length;
            this.path = this.destGrid.path;
            this.state.resetGrids();
            this.checkStatus();
        }

    },

    actToEnemy: function (){

        if(this.unitComponents['Attack']){
            this.destGrid = this.destGrid.gridPosition.getAroundGrid( this.actUnit.hoverDirection );
            this.attackDirection = this.actUnit.hoverDirection > 2 ? H3Unit.LEFTCAMP : H3Unit.RIGHTCAMP;
            this.attacks = this.attacksMax;
            switch (this.actUnit.hoverDirection){
            case 0 :
                this.attackAnim = 'attackdown';
                break;
            case 1 :    
                this.attackAnim = 'attack';
                break;
            case 2 :
                this.attackAnim = 'attackup';
                break;
            case 3 :
                this.attackAnim = 'attackup'
                break;
            case 4 :
                this.attackAnim = 'attack';
                break;
            case 5 :
                this.attackAnim = 'attackdown';
                break;
            }
        }
        else{
            this.destGrid = null;
        }

    },

    actToFriend: function () {
        this.state.openAttrPanel(this.actUnit);
        this.destGrid = null;
    },

    checkStatus: function (){
        
        console.log('checkStatus  step:' + this.step);
        
        if(this.unitComponents['Move'] && this.step > 0 ){
            this.moveStart();
            return
        }

        if(this.unitComponents['Attack'] && this.attacks > 0){
            this.attack();
            return
        }

        if(this.unitComponents['Move'] && this.direction !== this.camp){
            this.play('turn');
            return
        }
        
        if(this.animating){
            this.end();  
        }else{
            this.animations.play('stand');
            this.state.selectUnit.checkStatus();
        }        
    },

    end:function (){
        
        this.cycle = true;

        this.animating = false;

        this.animations.play('stand');

        this.state.controlbar.actionGroup.callAll('enable');

        this.state.unitCycle();
        
    },

    selected: function (){

        console.log('select')

        this.animations.play('select');

        if(this.unitComponents['Move']){
            this.setRange();
        }

        if(this.unitComponents['Attack']){
            this.setAttack();
        }

    },

    actWait: function (){

        this.wait = true;

        this.state.resetGrids();

        this.state.unitCycle();

    },

    actDefend: function (){

        this.defend = true;
        
        this.state.resetGrids();

        this.state.unitCycle();

    },
    


}