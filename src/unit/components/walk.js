import H3Unit from '../h3unit'
import './component'

/**
*
* @class
*/

H3Unit.Component.Walk = function () {};

H3Unit.Component.Walk.prototype = {

    initWalk: function () {

    },

    setRange: function () {
        var point = this.gridPosition,
            points = [point];
        
        point.grid.step = 0;
        point.grid.direction = this.camp == 1 ? 1 : 4;
        point.grid.sprite.setTexture(this.state.grids.graphics.texture3);
        point.grid.mouseClass = 'mouse5';

        for(let step = 1 ; step <= this.speed ;step++){

            points = this.setAroundGrids(points, step);

        }

    },

    setAroundGrids: function (points, step) {
        
        var result = [] ;
        
        for(let index = 0, l = points.length; index < l; index++){

            let array = [],
                parentGrid = points[index].grid;                    
           
            for(let i = 0 ; i < 6; i++){
                let direction = (parentGrid.direction + i) % 6,
                    nextGrid =  points[index].getAroundGrid(direction);   
                    
                if(!nextGrid) continue;                
                    
                if( (nextGrid.block === false) && (nextGrid.step ===  -1)){

                    if(nextGrid.unit){
                        if(this.camp === nextGrid.unit.camp){
                            nextGrid.step = -2
                            nextGrid.mouseClass = 'mouse5';
                        }
                        else{
                            nextGrid.step = -3
                            nextGrid.sprite.setTexture(this.state.grids.graphics.texture3);
                            
                        }
                    }
                    else{  
                        
                        nextGrid.step = step
                        nextGrid.path = [...parentGrid.path];
                        nextGrid.path.unshift( nextGrid.gridPosition );
                        nextGrid.direction = direction;
                        nextGrid.mouseClass = 'mouse3';
                        
                        nextGrid.sprite.setTexture(this.state.grids.graphics.texture3);                    
                        
                        result.push( nextGrid.gridPosition );

                    }                                  
                }
            }


        }
        
        
        return result; 
        
    }, 



}