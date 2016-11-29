
/**
* @class H3Btn
* @constructor
* @extends Phaser.Button
* @param {Phaser.State} state Current state instance.
* @param {number} [x=0] - X position of the Button.
* @param {number} [y=0] - Y position of the Button.
* @param {string} [key] - The image key (in the Game.Cache) to use as the texture for this Button.
* @param {function} [callback] - The function to call when this Button is pressed.
* @param {object} [callbackContext] - The context in which the callback will be called (usually 'this').
* @param {string|integer} [overFrame] - The frame / frameName when the button is in the Over state.
* @param {string|integer} [outFrame] - The frame / frameName when the button is in the Out state.
* @param {string|integer} [downFrame] - The frame / frameName when the button is in the Down state.
* @param {string|integer} [upFrame] - The frame / frameName when the button is in the Up state.
* @param {DisplayObjectContainer} [parent] - Optional DisplayObjectContainer to add the object to. If not specified it will be added to the World group.
* @return {H3Btn} The newly created Button object.
*/

var H3Btn = function(state, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, parent){

    x = x || 0;
    y = y || 0;
    key = key || null;
    callback = callback || null;
    callbackContext = callbackContext || this;

    Phaser.Button.call(this, state.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    if ( parent === undefined) { parent = state.world; }

    parent.addChild(this);

    this._switch = true;                         

}

H3Btn.prototype = Object.create(Phaser.Button.prototype);
H3Btn.prototype.constructor = H3Btn;

H3Btn.prototype.disable = function () {

    if(this.switch){
        this.inputEnabled = false;
        this.setFrames(2, 2, 2, 2);
    }

}
H3Btn.prototype.enable = function (){

    if(this.switch){
        this.inputEnabled = true;
        this.setFrames(0, 0, 1, 0);
    }

}

Object.defineProperty(H3Btn.prototype, "switch", {
    get: function (){
        return this._switch;
    },
    set: function (value) {     
        if(value){
            this._switch = true;
            this.inputEnabled = true;
            this.setFrames(0, 0, 1, 0);
        }
        else{
            this._switch = false;
            this.inputEnabled = false;
            this.setFrames(2, 2, 2, 2);
        }       
    }
});    

export default H3Btn;