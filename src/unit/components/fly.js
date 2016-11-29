import H3Unit from '../h3unit'
import './component'

/**
*
* @class
*/

H3Unit.Component.Fly = function () {};

H3Unit.Component.Fly.prototype = {

    initFly: function () {

    },

    setRange: function () {
        for(let x = 0 ; x < this.state.grids.column ; x++){
            for(let y = 0 ; y < this.state.grids.row ; y++){

                var loopGrid = this.state.grids[x][y];

                if( (loopGrid.block === false) && this.state.getGridDistance(this.gridPosition, loopGrid.gridPosition) <= this.speed ){

                    if(loopGrid.unit){
                        if(this.camp === loopGrid.unit.camp){
                            if(this === loopGrid.unit){
                                loopGrid.step = 0
                                loopGrid.sprite.setTexture(this.state.grids.graphics.texture3);
                                loopGrid.mouseClass = 'mouse5';
                            }
                            else{
                                loopGrid.step = -2
                                loopGrid.mouseClass = 'mouse5';
                            }                            
                        }
                        else{
                            loopGrid.step = -3
                            loopGrid.sprite.setTexture(this.state.grids.graphics.texture3);
                        }
                    }
                    else{
                        loopGrid.step = 1;
                        loopGrid.path = [loopGrid.gridPosition];
                        loopGrid.sprite.setTexture(this.state.grids.graphics.texture3);
                        loopGrid.mouseClass = 'mouse4';
                    }                                                        
                }                
            }
        }

    },



}