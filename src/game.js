import WalkUnit from './unit/walkunit'
import FlyUnit from './unit/flyunit'
import H3Btn from './subclass/h3btn'
import H3GridPoint from './subclass/h3gridpoint'


var Homm={}

Homm.Boot = function (game) {
};

Homm.Boot.prototype = {

    preload: function () {


    },

    create: function () {

        this.input.maxPointers = 1;

        this.state.start('Preloader');

    }

};

Homm.Preloader = function (game) {

    this.logo = null;
    this.preloadBar = null;
    this.ready = false;
    

};

Homm.Preloader.prototype = {

    init: function () {

        // this.add.sprite(265, 400, 'logo');

    },

    preload: function () {

        // this.preloadBar = this.add.sprite(120, 260, 'preload');
        // this.load.setPreloadSprite(this.preloadBar);
        
        this.load.baseURL = './';

        this.load.image('map', 'images/maps/map1.jpg');
        this.load.image('controlbar','images/ui/controlbar.bmp');
        this.load.image('attributepanel','images/ui/attributepanel.bmp');

        this.load.spritesheet('waitbtn','images/ui/wait.jpg', 48, 36, 4)
        this.load.spritesheet('defendbtn','images/ui/defend.jpg', 48, 36, 4)
        this.load.spritesheet('check6432btn','images/ui/check6432.jpg', 64, 32, 4)
        this.load.spritesheet('dragonFly', 'images/sprites/dragonfly.png', 160, 160, 54);


    },

    create: function () {
        if(window.location.search.indexOf('autostart') != -1){
            this.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(function(){
                this.state.start('Battle');
            }, this)
        }
        else{
            this.state.start('Battle');
        }
        
    },

    update: function () {

        //  Make sure all our mp3s have decoded before starting the game

        // if (!this.ready)
        // {
        //     if (this.cache.isSoundDecoded('casing') &&
        //         this.cache.isSoundDecoded('fire') &&
        //         this.cache.isSoundDecoded('reload') &&
        //         this.cache.isSoundDecoded('splat') &&
        //         this.cache.isSoundDecoded('walk'))
        //     {
        //         this.ready = true;
        //         this.state.start('Game');
        //     }
        // }

    }

};

Homm.Battle = function (game) {

    this.map = null;
    this.grids = [];
    this.selectUnit = undefined;
    this.graphicGroup = null;
    this.hoverUnit = null;


};

Homm.Battle.prototype = {

    init: function () {

        // this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        // this.scale.forceOrientation(false, true);
        console.log(this.scale.screenOrientation);
        console.log(this.scale.isGamePortrait);
    },

    preload: function () {
        
        this.time.advancedTiming = true;
        
    },

    create: function () {
        console.log(this);
        
        this.map = this.add.sprite(0,0,'map');

        this.controlbar = this.add.sprite(0,556,'controlbar');
        this.controlbar.actionGroup = this.add.group(this.controlbar);
        
        this.waitbtn = new H3Btn(this, 697, 4, 'waitbtn', function(button,point){
            if( button.input.pointerOver() ){
                this.selectUnit.actWait();
            }            
        }, this, 0, 0, 1, 0, this.controlbar.actionGroup);           

        

        this.defendbtn = new H3Btn(this, 748, 4,'defendbtn', function(button,point){
            if( button.input.pointerOver() ){
                this.selectUnit.actDefend();
            }            
        }, this, 0, 0, 1, 0, this.controlbar.actionGroup);

        this.attributepanel = this.add.sprite(0,0,'attributepanel');
        this.attributepanel.visible = false;

        this.attributepanel.textGroup = this.add.group(this.attributepanel);
        this.attributepanel.unitName = this.add.text(0, 0, 'name', {
            font: '14px Arial',
            fill: '#ffffff',
            boundsAlignH: 'center',
        }, this.attributepanel.textGroup).setTextBounds(20, 22, 260, 26);

        this.attributepanel.atk = this.add.text(0, 0, '3-5', {
            font: '14px Arial',
            fill: '#ffffff',
            boundsAlignH: 'right',
        }, this.attributepanel.textGroup).setTextBounds(150, 48, 125, 24);

        this.check6432btn = new H3Btn(this, 210, 238,'check6432btn', function(button,point){
            if( button.input.pointerOver() ){
                this.closeAttrPanel();
            }
        }, this, 0, 0, 1, 0, this.attributepanel);

        

        
        
        
        
        // init girds
        this.hexagonGridsInit(102, 82, 44, 10, 32, 15, 11);
        this.hexagonGraphicsInit();
        this.unitCycleSetInit();
        
        
        
        var unit1Attr = {

                spriteName  : 'dragonFly',
                name        : 'dragonFly',
                speed       : 8,
                attacks     : 1,
                animations  : [
                    {
                        name: 'stand',
                        frame: [0],
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'select',
                        frame: [0, 1, 2, 3, 4],
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'hover',
                        frame: [0, 5, 6, 7, 8],
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'move',
                        frame: [10, 11, 12, 13, 14, 15],
                        rate: 20,
                        loop: true
                    },
                    {
                        name: 'turn',
                        frame: [0, 16, 17, 18],
                        rate: 30,
                        loop: false
                    },
                    {
                        name: 'attackup',
                        frame: [0, 25, 26, 27, 28, 29, 30], 
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'attack',
                        frame: [0, 31, 32, 33, 34, 35, 36], 
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'attackdown',
                        frame: [0, 37, 38, 39, 40, 41, 42], 
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'gethit',
                        frame: [0, 43, 44, 45, 46, 47], 
                        rate: 20,
                        loop: false
                    },


                    



                ]

        }

        var unit2Attr = {

                spriteName  : 'dragonFly',
                name        : '龙蝇',
                speed       : 9,
                attacks     : 2,
                animations  : [
                    {
                        name: 'stand',
                        frame: [0],
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'select',
                        frame: [0, 1, 2, 3, 4],
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'hover',
                        frame: [0, 5, 6, 7, 8],
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'move',
                        frame: [10, 11, 12, 13, 14, 15],
                        rate: 20,
                        loop: true
                    },
                    {
                        name: 'turn',
                        frame: [0, 16, 17, 18],
                        rate: 30,
                        loop: false
                    },
                    {
                        name: 'attackup',
                        frame: [0, 25, 26, 27, 28, 29, 30], 
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'attack',
                        frame: [0, 31, 32, 33, 34, 35, 36], 
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'attackdown',
                        frame: [0, 37, 38, 39, 40, 41, 42], 
                        rate: 20,
                        loop: false
                    },
                    {
                        name: 'gethit',
                        frame: [0, 43, 44, 45, 46, 47], 
                        rate: 20,
                        loop: false
                    },



                    



                ]

        }


        this.dragonFly1 = new WalkUnit(this, 3, 5, unit1Attr);
        this.dragonFly2 = new WalkUnit(this, 10, 1, unit2Attr, -1);
        this.dragonFly3 = new FlyUnit(this, 5, 7, unit2Attr);
        
        
        this.unitCycle();

        
        
        
        this.input.onDown.add(this.clickedGrid, this);        
        
        this.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(function(){
            this.game.state.restart();
        }, this)
        
        
    },
    
    render: function () {
        // game.debug.pointer(game.input.mousePointer);
        this.game.debug.text('fps: '+this.time.fps, 32, 32);            
        
        // this.game.debug.text('1', this.game.input.x, this.game.input.y,  'rgb(255,255,255)', '16px Courier');     
    },

    update: function () {

        if(this.grids.focus){
            this.girdHoverUpdate(); 

            this.unitUpdate();
        }
               
        
                

    },
    
    
    
    hexagonGridsInit: function (px, py, w, h1, h2, column, row) {

        // init gridsGroup
        this.grids = this.add.group();

        var grids = this.grids;
        
        grids.column = column;
        grids.row = row;
        grids.focus = true;
        
        grids.hoverPosition =  new H3GridPoint(0, 0, grids);

        for(let i = 0; i < row ;i++){
            this['row' + i] = this.add.group(grids, 'row' + i);
        }
        
        
        for(let x = 0 ; x < column ; x++){
            grids[x]=[];
            for(let y = 0 ; y < row ; y++){
                
                grids[x][y] = this.add.group(this['row' + y], 'row' + y +'column' + x);
                grids[x][y].polygon = new Phaser.Polygon([ 
                    new Phaser.Point(px + w * x - ( y % 2) * w / 2, py + ( h1 + h2 ) * y), 
                    new Phaser.Point(px + w * x - ( y % 2) * w / 2 + w / 2, py + ( h1 + h2 ) * y + h1), 
                    new Phaser.Point(px + w * x - ( y % 2) * w / 2 + w / 2, py + ( h1 + h2 ) * y + h1 + h2), 
                    new Phaser.Point(px + w * x - ( y % 2) * w / 2, py + ( h1 + h2 ) * y + h1 + h2 + h1), 
                    new Phaser.Point(px + w * x - ( y % 2) * w / 2 - w / 2, py + ( h1 + h2 ) * y + h1 + h2), 
                    new Phaser.Point(px + w * x - ( y % 2) * w / 2 - w / 2, py + ( h1 + h2 ) * y + h1), 
                    new Phaser.Point(px + w * x - ( y % 2) * w / 2, py + ( h1 + h2 ) * y)
                ])
                
                grids[x][y].gridPosition = new H3GridPoint(x, y, grids);
                grids[x][y].block = false;
                grids[x][y].path = [];
                grids[x][y].step = -1;
                grids[x][y].direction = 1;
                grids[x][y].centerPoint = new Phaser.Point(px + w * x - ( y % 2) * w / 2, py + ( h1 + h2 ) * y + h1 + h2/2);

                for(let i = 0; i < 6 ; i++){
                    grids[x][y][i] = new Phaser.Polygon( grids[x][y].polygon.points[i], grids[x][y].polygon.points[i+1], grids[x][y].centerPoint );
                }

            }
        }

        for(let x = 0 ; x < column ; x++){
            for(let y = 0 ; y < row ; y++){

                grids[x][y].rightUpGrid = grids[x - y % 2 + 1] && grids[x - y % 2 + 1][y - 1]
                grids[x][y].rightGrid = grids[x + 1] && grids[x + 1][y]
                grids[x][y].rightDownGrid = grids[x - y % 2 + 1] && grids[x - y % 2 + 1][y + 1]
                grids[x][y].leftDownGrid = grids[x - y % 2] && grids[x - y % 2][y + 1]
                grids[x][y].leftGrid = grids[x - 1] && grids[x - 1][y]
                grids[x][y].leftUpGrid = grids[x - y % 2] && grids[x - y % 2][y - 1]

            }
        }
    },

    hexagonGraphicsInit: function () {
        
        var grids = this.grids;
            
        this.graphicGroup = this.add.group(this.grids);
        this.grids.sendToBack(this.graphicGroup);
        // graphicGroup.visible = false;
        
        
        //normalGrid Texture generate
        grids.graphics = this.add.graphics(0, 0);
        grids.graphics.lineStyle(1,0x8b883b);
        grids.graphics.beginFill(0x000000,0);
        grids.graphics.drawPolygon(grids[0][0].polygon.points);
        grids.graphics.endFill();
        grids.graphics.texture1 = grids.graphics.generateTexture();
        grids.graphics.clear();
        
        //hoverGrid Texture generate
        grids.graphics.lineStyle(1,0x8b883b);
        grids.graphics.beginFill(0x000000,0.8);
        grids.graphics.drawPolygon(grids[0][0].polygon.points);
        grids.graphics.endFill();
        grids.graphics.texture2 = grids.graphics.generateTexture();
        grids.graphics.clear();
        
        //activeRange Texture generate
        grids.graphics.lineStyle(1,0x8b883b);
        grids.graphics.beginFill(0x000000,0.5);
        grids.graphics.drawPolygon(grids[0][0].polygon.points);
        grids.graphics.endFill();
        grids.graphics.texture3 = grids.graphics.generateTexture();
        grids.graphics.clear();
        
        grids.paintPosition =  new H3GridPoint(0, 0, grids);
        
        for(let x = 0 ; x < grids.column ; x++){
            for(let y = 0 ; y < grids.row ; y++){
                
                grids[x][y].sprite = this.add.sprite(0, 0, grids.graphics.texture1, 0, this.graphicGroup);
                grids[x][y].sprite.anchor.set(0.5,0);
                grids[x][y].sprite.position.copyFrom(grids[x][y].polygon.points[0]);          
                
            }
        }
    
    
    },
    
    unitCycleSetInit: function (){
        
        // init unitGroup
        
        this.unitCycleSet = new Phaser.ArraySet(); 
        
        this.unitCycleSet.position = -1;

        this.unitCycleSet.reverse = false;

        Object.defineProperty(this.unitCycleSet, "last", {

            get: function () {

                if (this.position >= 0)
                {
                    this.position--;

                    return this.list[this.position];
                }
                else
                {
                    return null;
                }

            }

        });



        this.unitCycleSet.add=function (item) {

            if (!this.exists(item))
            {
                var added = false;
                var l = this.list.length;
                for(let i = 0; i < l ;i++){
                    if(item.speed > this.list[i].speed || (item.speed == this.list[i].speed && item.order < this.list[i].order) ){
                        this.list.splice(i, 0, item);
                        added = true;
                        break;
                    }
                }
                if(!added){
                    this.list.push(item);                    
                }
                this.reverse ? this.position = l : this.position = -1;
            }

            return item;

        }    
    },    
    
    getGridDistance: function (p1, p2){
        var maxX, minX,
            x1 = p1.x,
            y1 = p1.y,
            x2 = p2.x,
            y2 = p2.y, 
            disty = Math.abs(y2 - y1);
        maxX = x1 + (disty + y2 % 2 - y1 % 2) / 2
        minX = x1 - (disty - y2 % 2 + y1 % 2) / 2
        if( x2 > maxX){
            return x2 - maxX + disty
        }
        else if( x2 < minX){
            return minX - x2 + disty
        }
        else{
            return disty
        }     
    },
    
    
    
    //单位循环
    unitCycle: function () {
        
        console.log('unitCycle')
        // console.log(this.selectUnit)
        var unitCycleSet = this.unitCycleSet;
        var next;
    
        next = unitCycleSet.reverse ? unitCycleSet.last : unitCycleSet.next;

        if( next ){


            if( !next.cycled && next.actable && ( unitCycleSet.reverse ? next.wait : !next.wait )){

                next.wait = false;

                this.selectUnit = next;

            }
            else{

                this.unitCycle();
                return;

            }

        }
        else{

            if(unitCycleSet.getByKey('wait', true)){
                //单位死亡wait = false
                unitCycleSet.reverse = true;

                this.waitbtn.switch = false;

                this.unitCycle();
                
                return;

            }
            else{
                
                this.roundEnd();
                
                return;

            }


        }
        
        
        this.selectUnit.selected();         
        
    },
    

    //回合结束
    roundEnd: function () {
        
        console.log('roundEnd');
        
        var unitCycleSet = this.unitCycleSet;
        
        unitCycleSet.reverse = false;
                
        unitCycleSet.setAll('defend', false);

        unitCycleSet.setAll('cycled', false);

        this.waitbtn.switch = true;
        
        unitCycleSet.position = -1;
        
        this.unitCycle();
        
    },
    

    resetGrids: function () {


        for(let x = 0 ; x < this.grids.column ; x++){
            for(let y = 0 ; y < this.grids.row ; y++){

                var loopGrid = this.grids[x][y];

                //reset move grid
                if(loopGrid.step !== -1){
                    
                    loopGrid.step = -1;
                    loopGrid.path = [];
                    loopGrid.direction = this.selectUnit.camp;
                    loopGrid.mouseClass = 'mouse2';

                    loopGrid.sprite.setTexture(this.grids.graphics.texture1);
                    
                }

                //reset act grid
                if(loopGrid.unit){
                    for(let i = 0;i < 6;i++){
                        loopGrid[i].mouseClass = 'mouse2';
                    }
                }

            }
        }

        

    },
    
    girdHoverUpdate: function () {
        
    
        var grids = this.grids;
        
        grids.isHover = false;
        outerloop:
        for(let x = 0 ; x < grids.column ; x++){
            for(let y = 0 ; y < grids.row ; y++){
                
                let loopGrid = grids[x][y];
                
                if(loopGrid.polygon.contains(this.input.x, this.input.y)){
                    
                    grids.isHover = true;
                    //change hoverPosition
                    if(!( grids.hoverPosition.equals( {x, y} ) )) {
                        
                        grids.hoverPosition.set(x,y);
                        
                        this.hoverGridChange();                      
                                                
                    }
                    
                    break outerloop;
                }
            }
        }

        

        if(grids.isHover){

            //set attack cursor
            if(this.selectUnit.unitComponents['Attack'] && this.hoverUnit){
                //enemy area
                if(this.hoverUnit.camp !== this.selectUnit.camp){                
                    for(let i = 0; i < 6;i++){
                        if(this.hoverUnit.parent[i].contains(this.input.x, this.input.y)){

                            this.hoverUnit.hoverDirection = i;
                            this.setMouse(this.hoverUnit.parent[i].mouseClass);
                            
                            break;
                        }   
                    }
                } 
            }     
        }
        else{
            if(!( grids.hoverPosition.equals( new Phaser.Point(0, -1) ))) {
                            
                grids.hoverPosition.set(0, -1);
                
                if(grids.paintPosition.grid.step < 0 ){
                    grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture1);
                }
                else{
                    grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture3);
                }

                this.hoverUnit = null;

                this.setMouse('mouse1');
            }

        }
        
        
        
         
    },

    hoverGridChange: function () {

        this.graphicsUpdate();

        this.hoverUnitChange();

        this.mouseChange();
    },

    mouseChange: function () {

        this.setMouse('mouse1');

        if(this.grids.isHover){
            this.setMouse(this.grids.hoverPosition.grid.mouseClass);
        }

        
    },
    
    hoverUnitChange: function () {             

        var hoverUnit =  this.grids.hoverPosition.grid.unit ;
        
        if(hoverUnit){

            if(hoverUnit.animations.name =='stand' || hoverUnit.animations.name == 'select'){
                hoverUnit.animations.play('hover'); 
            }            

            this.hoverUnit = hoverUnit;

        }
        else{
            this.hoverUnit = null;
        }
        
    },

    
    
    graphicsUpdate: function () {
    
        var grids = this.grids,
            graphicGroup = this.graphicGroup;
        
        if(graphicGroup.visible){                                   

            if(grids.paintPosition.grid.step < 0 ){
                if(grids.paintPosition.grid.step === -1){
                    grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture1);
                }

                if(grids.paintPosition.grid.step === -2){
                    grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture1);
                }

                if(grids.paintPosition.grid.step === -3){
                    grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture3);
                }              
            }
            else{
                grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture3);
            }
            
            grids.paintPosition.copyFrom(grids.hoverPosition);
            grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture2);            
            
        }
        
    },
    
    unitUpdate: function () {

        // random standUnit anim
        for(let i = 0,l = this.unitCycleSet.list.length; i < l; i++){
            let unit = this.unitCycleSet.list[i];
            if(unit.animations.name =='stand' && this.time.now > unit.animationTime + unit.intervalTime ){
                unit.animations.play('hover');     
            }
        } 
          
    },      
    
    
    clickedGrid: function () {
        
        var grids = this.grids,
            hoverGrid = grids.hoverPosition.grid;
        
        
        
        // grid click
        if(this.grids.focus && hoverGrid){        
            this.selectUnit.actTo(hoverGrid);                        
        }
        
    },  

    setMouse: function (mouseClass) {
        this.game.canvas.className = mouseClass;
    }, 

    openAttrPanel: function (unit){

        this.grids.focus = false;
        this.controlbar.actionGroup.callAll('disable');
        this.attributepanel.visible = true;        
        this.attributepanel.bringToTop();
        this.setMouse('mouse1');
        this.attributepanel.position.set(100,100);

        this.attributepanel.unitName.setText(unit.unitAttr.name)

    },

    closeAttrPanel: function (){
        console.log('closePanel');
        this.grids.focus = true;
        this.controlbar.actionGroup.callAll('enable');
        this.attributepanel.visible = false;   

    },
    
    
    
    shutdown: function () {
        
        console.log('shutDown')
        // this.grids = [];
        // this.selectUnit = undefined;

    },
        

};



if (document.readyState === 'complete' || document.readyState === 'interactive')
{
    start();
}
else
{
    document.addEventListener('DOMContentLoaded', start, false);
}

function start () {

    document.removeEventListener('DOMContentLoaded', start, false);

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

    game.state.add('Boot', Homm.Boot);
    game.state.add('Preloader', Homm.Preloader);
    game.state.add('Battle', Homm.Battle);

    game.state.start('Boot');

    
    
}



















