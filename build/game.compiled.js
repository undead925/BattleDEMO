/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _walkunit = __webpack_require__(1);

	var _walkunit2 = _interopRequireDefault(_walkunit);

	var _flyunit = __webpack_require__(8);

	var _flyunit2 = _interopRequireDefault(_flyunit);

	var _h3btn = __webpack_require__(10);

	var _h3btn2 = _interopRequireDefault(_h3btn);

	var _h3gridpoint = __webpack_require__(11);

	var _h3gridpoint2 = _interopRequireDefault(_h3gridpoint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Homm = {};

	Homm.Boot = function (game) {};

	Homm.Boot.prototype = {

	    preload: function preload() {},

	    create: function create() {

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

	    init: function init() {

	        // this.add.sprite(265, 400, 'logo');

	    },

	    preload: function preload() {

	        // this.preloadBar = this.add.sprite(120, 260, 'preload');
	        // this.load.setPreloadSprite(this.preloadBar);

	        this.load.baseURL = './';

	        this.load.image('map', 'images/maps/map1.jpg');
	        this.load.image('controlbar', 'images/ui/controlbar.bmp');
	        this.load.image('attributepanel', 'images/ui/attributepanel.bmp');

	        this.load.spritesheet('waitbtn', 'images/ui/wait.jpg', 48, 36, 4);
	        this.load.spritesheet('defendbtn', 'images/ui/defend.jpg', 48, 36, 4);
	        this.load.spritesheet('check6432btn', 'images/ui/check6432.jpg', 64, 32, 4);
	        this.load.spritesheet('dragonFly', 'images/sprites/dragonfly.png', 160, 160, 54);
	    },

	    create: function create() {
	        if (window.location.search.indexOf('autostart') != -1) {
	            this.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(function () {
	                this.state.start('Battle');
	            }, this);
	        } else {
	            this.state.start('Battle');
	        }
	    },

	    update: function update() {

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

	    init: function init() {

	        // this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
	        // this.scale.forceOrientation(false, true);
	        console.log(this.scale.screenOrientation);
	        console.log(this.scale.isGamePortrait);
	    },

	    preload: function preload() {

	        this.time.advancedTiming = true;
	    },

	    create: function create() {
	        console.log(this);

	        this.map = this.add.sprite(0, 0, 'map');

	        this.controlbar = this.add.sprite(0, 556, 'controlbar');
	        this.controlbar.actionGroup = this.add.group(this.controlbar);

	        this.waitbtn = new _h3btn2.default(this, 697, 4, 'waitbtn', function (button, point) {
	            if (button.input.pointerOver()) {
	                this.selectUnit.actWait();
	            }
	        }, this, 0, 0, 1, 0, this.controlbar.actionGroup);

	        this.defendbtn = new _h3btn2.default(this, 748, 4, 'defendbtn', function (button, point) {
	            if (button.input.pointerOver()) {
	                this.selectUnit.actDefend();
	            }
	        }, this, 0, 0, 1, 0, this.controlbar.actionGroup);

	        this.attributepanel = this.add.sprite(0, 0, 'attributepanel');
	        this.attributepanel.visible = false;

	        this.attributepanel.textGroup = this.add.group(this.attributepanel);
	        this.attributepanel.unitName = this.add.text(0, 0, 'name', {
	            font: '14px Arial',
	            fill: '#ffffff',
	            boundsAlignH: 'center'
	        }, this.attributepanel.textGroup).setTextBounds(20, 22, 260, 26);

	        this.attributepanel.atk = this.add.text(0, 0, '3-5', {
	            font: '14px Arial',
	            fill: '#ffffff',
	            boundsAlignH: 'right'
	        }, this.attributepanel.textGroup).setTextBounds(150, 48, 125, 24);

	        this.check6432btn = new _h3btn2.default(this, 210, 238, 'check6432btn', function (button, point) {
	            if (button.input.pointerOver()) {
	                this.closeAttrPanel();
	            }
	        }, this, 0, 0, 1, 0, this.attributepanel);

	        // init girds
	        this.hexagonGridsInit(102, 82, 44, 10, 32, 15, 11);
	        this.hexagonGraphicsInit();
	        this.unitCycleSetInit();

	        var unit1Attr = {

	            spriteName: 'dragonFly',
	            name: 'dragonFly',
	            speed: 8,
	            attacks: 1,
	            animations: [{
	                name: 'stand',
	                frame: [0],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'select',
	                frame: [0, 1, 2, 3, 4],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'hover',
	                frame: [0, 5, 6, 7, 8],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'move',
	                frame: [10, 11, 12, 13, 14, 15],
	                rate: 20,
	                loop: true
	            }, {
	                name: 'turn',
	                frame: [0, 16, 17, 18],
	                rate: 30,
	                loop: false
	            }, {
	                name: 'attackup',
	                frame: [0, 25, 26, 27, 28, 29, 30],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'attack',
	                frame: [0, 31, 32, 33, 34, 35, 36],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'attackdown',
	                frame: [0, 37, 38, 39, 40, 41, 42],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'gethit',
	                frame: [0, 43, 44, 45, 46, 47],
	                rate: 20,
	                loop: false
	            }]

	        };

	        var unit2Attr = {

	            spriteName: 'dragonFly',
	            name: '龙蝇',
	            speed: 9,
	            attacks: 2,
	            animations: [{
	                name: 'stand',
	                frame: [0],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'select',
	                frame: [0, 1, 2, 3, 4],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'hover',
	                frame: [0, 5, 6, 7, 8],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'move',
	                frame: [10, 11, 12, 13, 14, 15],
	                rate: 20,
	                loop: true
	            }, {
	                name: 'turn',
	                frame: [0, 16, 17, 18],
	                rate: 30,
	                loop: false
	            }, {
	                name: 'attackup',
	                frame: [0, 25, 26, 27, 28, 29, 30],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'attack',
	                frame: [0, 31, 32, 33, 34, 35, 36],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'attackdown',
	                frame: [0, 37, 38, 39, 40, 41, 42],
	                rate: 20,
	                loop: false
	            }, {
	                name: 'gethit',
	                frame: [0, 43, 44, 45, 46, 47],
	                rate: 20,
	                loop: false
	            }]

	        };

	        this.dragonFly1 = new _walkunit2.default(this, 3, 5, unit1Attr);
	        this.dragonFly2 = new _walkunit2.default(this, 10, 1, unit2Attr, -1);
	        this.dragonFly3 = new _flyunit2.default(this, 5, 7, unit2Attr);

	        this.unitCycle();

	        this.input.onDown.add(this.clickedGrid, this);

	        this.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(function () {
	            this.game.state.restart();
	        }, this);
	    },

	    render: function render() {
	        // game.debug.pointer(game.input.mousePointer);
	        this.game.debug.text('fps: ' + this.time.fps, 32, 32);

	        // this.game.debug.text('1', this.game.input.x, this.game.input.y,  'rgb(255,255,255)', '16px Courier');     
	    },

	    update: function update() {

	        if (this.grids.focus) {
	            this.girdHoverUpdate();

	            this.unitUpdate();
	        }
	    },

	    hexagonGridsInit: function hexagonGridsInit(px, py, w, h1, h2, column, row) {

	        // init gridsGroup
	        this.grids = this.add.group();

	        var grids = this.grids;

	        grids.column = column;
	        grids.row = row;
	        grids.focus = true;

	        grids.hoverPosition = new _h3gridpoint2.default(0, 0, grids);

	        for (var i = 0; i < row; i++) {
	            this['row' + i] = this.add.group(grids, 'row' + i);
	        }

	        for (var x = 0; x < column; x++) {
	            grids[x] = [];
	            for (var y = 0; y < row; y++) {

	                grids[x][y] = this.add.group(this['row' + y], 'row' + y + 'column' + x);
	                grids[x][y].polygon = new Phaser.Polygon([new Phaser.Point(px + w * x - y % 2 * w / 2, py + (h1 + h2) * y), new Phaser.Point(px + w * x - y % 2 * w / 2 + w / 2, py + (h1 + h2) * y + h1), new Phaser.Point(px + w * x - y % 2 * w / 2 + w / 2, py + (h1 + h2) * y + h1 + h2), new Phaser.Point(px + w * x - y % 2 * w / 2, py + (h1 + h2) * y + h1 + h2 + h1), new Phaser.Point(px + w * x - y % 2 * w / 2 - w / 2, py + (h1 + h2) * y + h1 + h2), new Phaser.Point(px + w * x - y % 2 * w / 2 - w / 2, py + (h1 + h2) * y + h1), new Phaser.Point(px + w * x - y % 2 * w / 2, py + (h1 + h2) * y)]);

	                grids[x][y].gridPosition = new _h3gridpoint2.default(x, y, grids);
	                grids[x][y].block = false;
	                grids[x][y].path = [];
	                grids[x][y].step = -1;
	                grids[x][y].direction = 1;
	                grids[x][y].centerPoint = new Phaser.Point(px + w * x - y % 2 * w / 2, py + (h1 + h2) * y + h1 + h2 / 2);

	                for (var _i = 0; _i < 6; _i++) {
	                    grids[x][y][_i] = new Phaser.Polygon(grids[x][y].polygon.points[_i], grids[x][y].polygon.points[_i + 1], grids[x][y].centerPoint);
	                }
	            }
	        }

	        for (var _x = 0; _x < column; _x++) {
	            for (var _y = 0; _y < row; _y++) {

	                grids[_x][_y].rightUpGrid = grids[_x - _y % 2 + 1] && grids[_x - _y % 2 + 1][_y - 1];
	                grids[_x][_y].rightGrid = grids[_x + 1] && grids[_x + 1][_y];
	                grids[_x][_y].rightDownGrid = grids[_x - _y % 2 + 1] && grids[_x - _y % 2 + 1][_y + 1];
	                grids[_x][_y].leftDownGrid = grids[_x - _y % 2] && grids[_x - _y % 2][_y + 1];
	                grids[_x][_y].leftGrid = grids[_x - 1] && grids[_x - 1][_y];
	                grids[_x][_y].leftUpGrid = grids[_x - _y % 2] && grids[_x - _y % 2][_y - 1];
	            }
	        }
	    },

	    hexagonGraphicsInit: function hexagonGraphicsInit() {

	        var grids = this.grids;

	        this.graphicGroup = this.add.group(this.grids);
	        this.grids.sendToBack(this.graphicGroup);
	        // graphicGroup.visible = false;


	        //normalGrid Texture generate
	        grids.graphics = this.add.graphics(0, 0);
	        grids.graphics.lineStyle(1, 0x8b883b);
	        grids.graphics.beginFill(0x000000, 0);
	        grids.graphics.drawPolygon(grids[0][0].polygon.points);
	        grids.graphics.endFill();
	        grids.graphics.texture1 = grids.graphics.generateTexture();
	        grids.graphics.clear();

	        //hoverGrid Texture generate
	        grids.graphics.lineStyle(1, 0x8b883b);
	        grids.graphics.beginFill(0x000000, 0.8);
	        grids.graphics.drawPolygon(grids[0][0].polygon.points);
	        grids.graphics.endFill();
	        grids.graphics.texture2 = grids.graphics.generateTexture();
	        grids.graphics.clear();

	        //activeRange Texture generate
	        grids.graphics.lineStyle(1, 0x8b883b);
	        grids.graphics.beginFill(0x000000, 0.5);
	        grids.graphics.drawPolygon(grids[0][0].polygon.points);
	        grids.graphics.endFill();
	        grids.graphics.texture3 = grids.graphics.generateTexture();
	        grids.graphics.clear();

	        grids.paintPosition = new _h3gridpoint2.default(0, 0, grids);

	        for (var x = 0; x < grids.column; x++) {
	            for (var y = 0; y < grids.row; y++) {

	                grids[x][y].sprite = this.add.sprite(0, 0, grids.graphics.texture1, 0, this.graphicGroup);
	                grids[x][y].sprite.anchor.set(0.5, 0);
	                grids[x][y].sprite.position.copyFrom(grids[x][y].polygon.points[0]);
	            }
	        }
	    },

	    unitCycleSetInit: function unitCycleSetInit() {

	        // init unitGroup

	        this.unitCycleSet = new Phaser.ArraySet();

	        this.unitCycleSet.position = -1;

	        this.unitCycleSet.reverse = false;

	        Object.defineProperty(this.unitCycleSet, "last", {

	            get: function get() {

	                if (this.position >= 0) {
	                    this.position--;

	                    return this.list[this.position];
	                } else {
	                    return null;
	                }
	            }

	        });

	        this.unitCycleSet.add = function (item) {

	            if (!this.exists(item)) {
	                var added = false;
	                var l = this.list.length;
	                for (var i = 0; i < l; i++) {
	                    if (item.speed > this.list[i].speed || item.speed == this.list[i].speed && item.order < this.list[i].order) {
	                        this.list.splice(i, 0, item);
	                        added = true;
	                        break;
	                    }
	                }
	                if (!added) {
	                    this.list.push(item);
	                }
	                this.reverse ? this.position = l : this.position = -1;
	            }

	            return item;
	        };
	    },

	    getGridDistance: function getGridDistance(p1, p2) {
	        var maxX,
	            minX,
	            x1 = p1.x,
	            y1 = p1.y,
	            x2 = p2.x,
	            y2 = p2.y,
	            disty = Math.abs(y2 - y1);
	        maxX = x1 + (disty + y2 % 2 - y1 % 2) / 2;
	        minX = x1 - (disty - y2 % 2 + y1 % 2) / 2;
	        if (x2 > maxX) {
	            return x2 - maxX + disty;
	        } else if (x2 < minX) {
	            return minX - x2 + disty;
	        } else {
	            return disty;
	        }
	    },

	    //单位循环
	    unitCycle: function unitCycle() {

	        console.log('unitCycle');
	        // console.log(this.selectUnit)
	        var unitCycleSet = this.unitCycleSet;
	        var next;

	        next = unitCycleSet.reverse ? unitCycleSet.last : unitCycleSet.next;

	        if (next) {

	            if (!next.cycled && next.actable && (unitCycleSet.reverse ? next.wait : !next.wait)) {

	                next.wait = false;

	                this.selectUnit = next;
	            } else {

	                this.unitCycle();
	                return;
	            }
	        } else {

	            if (unitCycleSet.getByKey('wait', true)) {
	                //单位死亡wait = false
	                unitCycleSet.reverse = true;

	                this.waitbtn.switch = false;

	                this.unitCycle();

	                return;
	            } else {

	                this.roundEnd();

	                return;
	            }
	        }

	        this.selectUnit.selected();
	    },

	    //回合结束
	    roundEnd: function roundEnd() {

	        console.log('roundEnd');

	        var unitCycleSet = this.unitCycleSet;

	        unitCycleSet.reverse = false;

	        unitCycleSet.setAll('defend', false);

	        unitCycleSet.setAll('cycled', false);

	        this.waitbtn.switch = true;

	        unitCycleSet.position = -1;

	        this.unitCycle();
	    },

	    resetGrids: function resetGrids() {

	        for (var x = 0; x < this.grids.column; x++) {
	            for (var y = 0; y < this.grids.row; y++) {

	                var loopGrid = this.grids[x][y];

	                //reset move grid
	                if (loopGrid.step !== -1) {

	                    loopGrid.step = -1;
	                    loopGrid.path = [];
	                    loopGrid.direction = this.selectUnit.camp;
	                    loopGrid.mouseClass = 'mouse2';

	                    loopGrid.sprite.setTexture(this.grids.graphics.texture1);
	                }

	                //reset act grid
	                if (loopGrid.unit) {
	                    for (var i = 0; i < 6; i++) {
	                        loopGrid[i].mouseClass = 'mouse2';
	                    }
	                }
	            }
	        }
	    },

	    girdHoverUpdate: function girdHoverUpdate() {

	        var grids = this.grids;

	        grids.isHover = false;
	        outerloop: for (var x = 0; x < grids.column; x++) {
	            for (var y = 0; y < grids.row; y++) {

	                var loopGrid = grids[x][y];

	                if (loopGrid.polygon.contains(this.input.x, this.input.y)) {

	                    grids.isHover = true;
	                    //change hoverPosition
	                    if (!grids.hoverPosition.equals({ x: x, y: y })) {

	                        grids.hoverPosition.set(x, y);

	                        this.hoverGridChange();
	                    }

	                    break outerloop;
	                }
	            }
	        }

	        if (grids.isHover) {

	            //set attack cursor
	            if (this.selectUnit.unitComponents['Attack'] && this.hoverUnit) {
	                //enemy area
	                if (this.hoverUnit.camp !== this.selectUnit.camp) {
	                    for (var i = 0; i < 6; i++) {
	                        if (this.hoverUnit.parent[i].contains(this.input.x, this.input.y)) {

	                            this.hoverUnit.hoverDirection = i;
	                            this.setMouse(this.hoverUnit.parent[i].mouseClass);

	                            break;
	                        }
	                    }
	                }
	            }
	        } else {
	            if (!grids.hoverPosition.equals(new Phaser.Point(0, -1))) {

	                grids.hoverPosition.set(0, -1);

	                if (grids.paintPosition.grid.step < 0) {
	                    grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture1);
	                } else {
	                    grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture3);
	                }

	                this.hoverUnit = null;

	                this.setMouse('mouse1');
	            }
	        }
	    },

	    hoverGridChange: function hoverGridChange() {

	        this.graphicsUpdate();

	        this.hoverUnitChange();

	        this.mouseChange();
	    },

	    mouseChange: function mouseChange() {

	        this.setMouse('mouse1');

	        if (this.grids.isHover) {
	            this.setMouse(this.grids.hoverPosition.grid.mouseClass);
	        }
	    },

	    hoverUnitChange: function hoverUnitChange() {

	        var hoverUnit = this.grids.hoverPosition.grid.unit;

	        if (hoverUnit) {

	            if (hoverUnit.animations.name == 'stand' || hoverUnit.animations.name == 'select') {
	                hoverUnit.animations.play('hover');
	            }

	            this.hoverUnit = hoverUnit;
	        } else {
	            this.hoverUnit = null;
	        }
	    },

	    graphicsUpdate: function graphicsUpdate() {

	        var grids = this.grids,
	            graphicGroup = this.graphicGroup;

	        if (graphicGroup.visible) {

	            if (grids.paintPosition.grid.step < 0) {
	                if (grids.paintPosition.grid.step === -1) {
	                    grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture1);
	                }

	                if (grids.paintPosition.grid.step === -2) {
	                    grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture1);
	                }

	                if (grids.paintPosition.grid.step === -3) {
	                    grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture3);
	                }
	            } else {
	                grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture3);
	            }

	            grids.paintPosition.copyFrom(grids.hoverPosition);
	            grids.paintPosition.grid.sprite.setTexture(grids.graphics.texture2);
	        }
	    },

	    unitUpdate: function unitUpdate() {

	        // random standUnit anim
	        for (var i = 0, l = this.unitCycleSet.list.length; i < l; i++) {
	            var unit = this.unitCycleSet.list[i];
	            if (unit.animations.name == 'stand' && this.time.now > unit.animationTime + unit.intervalTime) {
	                unit.animations.play('hover');
	            }
	        }
	    },

	    clickedGrid: function clickedGrid() {

	        var grids = this.grids,
	            hoverGrid = grids.hoverPosition.grid;

	        // grid click
	        if (this.grids.focus && hoverGrid) {
	            this.selectUnit.actTo(hoverGrid);
	        }
	    },

	    setMouse: function setMouse(mouseClass) {
	        this.game.canvas.className = mouseClass;
	    },

	    openAttrPanel: function openAttrPanel(unit) {

	        this.grids.focus = false;
	        this.controlbar.actionGroup.callAll('disable');
	        this.attributepanel.visible = true;
	        this.attributepanel.bringToTop();
	        this.setMouse('mouse1');
	        this.attributepanel.position.set(100, 100);

	        this.attributepanel.unitName.setText(unit.unitAttr.name);
	    },

	    closeAttrPanel: function closeAttrPanel() {
	        console.log('closePanel');
	        this.grids.focus = true;
	        this.controlbar.actionGroup.callAll('enable');
	        this.attributepanel.visible = false;
	    },

	    shutdown: function shutdown() {

	        console.log('shutDown');
	        // this.grids = [];
	        // this.selectUnit = undefined;
	    }

	};

	if (document.readyState === 'complete' || document.readyState === 'interactive') {
	    start();
	} else {
	    document.addEventListener('DOMContentLoaded', start, false);
	}

	function start() {

	    document.removeEventListener('DOMContentLoaded', start, false);

	    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

	    game.state.add('Boot', Homm.Boot);
	    game.state.add('Preloader', Homm.Preloader);
	    game.state.add('Battle', Homm.Battle);

	    game.state.start('Boot');
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _h3unit = __webpack_require__(2);

	var _h3unit2 = _interopRequireDefault(_h3unit);

	__webpack_require__(3);

	__webpack_require__(5);

	__webpack_require__(6);

	__webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	// import './components/core'
	var WalkUnit = function WalkUnit(state, gridX, gridY, unitAttr, camp) {

	    gridX = gridX || 0;
	    gridY = gridY || 0;

	    _h3unit2.default.call(this, state, unitAttr);

	    this.camp = camp || _h3unit2.default.LEFTCAMP;

	    this.direction = this.camp;

	    // add this unit to game 
	    this.anchor.set(0.5, 0.55);
	    this.position.copyFrom(state.grids[gridX][gridY].polygon.points[0]);
	    this.gridPosition = new Phaser.Point(gridX, gridY);
	    this.order = state.unitCycleSet.total;
	    state.unitCycleSet.add(this);
	};

	WalkUnit.prototype = Object.create(_h3unit2.default.prototype);
	WalkUnit.prototype.constructor = WalkUnit;

	_h3unit2.default.Component.install.call(WalkUnit.prototype, ['Act', 'Move', 'Walk', 'Attack']);

	// Phaser.Utils.mixinPrototype(WalkUnit.prototype, H3Unit.Component.Move.prototype)
	// Phaser.Utils.mixinPrototype(WalkUnit.prototype, H3Unit.Component.Walk.prototype)

	exports.default = WalkUnit;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

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
	var H3Unit = function H3Unit(state, unitAttr) {

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
	};

	H3Unit.prototype = Object.create(Phaser.Sprite.prototype);
	H3Unit.prototype.constructor = H3Unit;

	H3Unit.LEFTCAMP = 1;

	H3Unit.RIGHTCAMP = -1;

	Object.defineProperty(H3Unit.prototype, "gridPosition", {
	    get: function get() {
	        return this.parent.gridPosition;
	    },
	    set: function set(value) {
	        this.parent && this.parent.unit && (this.parent.unit = null);
	        this.state.grids[value.x][value.y].add(this);
	        this.state.grids[value.x][value.y].unit = this;
	    },
	    configurable: true
	});

	Object.defineProperty(H3Unit.prototype, "direction", {
	    get: function get() {
	        return this.scale.x;
	    },
	    set: function set(value) {
	        this.scale.x = value;
	    }
	});

	Object.assign(H3Unit.prototype, {

	    init: function init() {

	        this.initAnimation();

	        var componentKeys = Object.keys(this.unitComponents);

	        for (var i = 0, l = componentKeys.length; i < l; i++) {
	            var key = componentKeys[i];
	            this['init' + key].call(this); // this.initMove(); this.initAttack();        
	        }
	    },

	    initAnimation: function initAnimation() {

	        var animations = this.unitAttr.animations;

	        for (var i = 0, l = animations.length; i < l; i++) {

	            this.animations.add(animations[i].name, animations[i].frame, animations[i].rate, animations[i].loop);
	        }

	        this.animations.getAnimation('select').onComplete.add(function (sprite, animation) {
	            this.animations.play('stand');
	        }, this);

	        this.animations.getAnimation('hover').onComplete.add(function (sprite, animation) {
	            this.animations.play('stand');
	        }, this);

	        this.animations.getAnimation('stand').onStart.add(function (sprite, animation) {
	            this.animationTime = this.state.time.now;
	            this.intervalTime = Math.floor(Math.random() * 5000 + 5000);
	        }, this);

	        this.animations.getAnimation('gethit').onComplete.add(function (sprite, tween) {
	            this.animations.play('stand');
	            this.state.selectUnit.checkStatus();
	        }, this);

	        this.animations.play('stand');
	    }

	});

	exports.default = H3Unit;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _h3unit = __webpack_require__(2);

	var _h3unit2 = _interopRequireDefault(_h3unit);

	__webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	*
	* @class
	*/

	_h3unit2.default.Component.Act = function () {};

	_h3unit2.default.Component.Act.prototype = {

	    initAct: function initAct() {

	        this.actable = true;
	    },

	    actTo: function actTo(destGrid) {

	        this.destGrid = destGrid;
	        this.actUnit = destGrid.unit;

	        if (this.actUnit) {
	            //friend or enemy
	            if (this.camp === this.actUnit.camp) {
	                // do nothing for itself
	                if (this === this.actUnit) {
	                    this.state.openAttrPanel(this);
	                    this.destGrid = null;
	                } else {
	                    this.actToFriend();
	                }
	            } else {
	                this.actToEnemy();
	            }
	        }

	        if (this.destGrid && this.destGrid.step > -1) {
	            this.state.controlbar.actionGroup.callAll('disable');

	            this.animating = true;
	            this.step = this.destGrid.path.length;
	            this.path = this.destGrid.path;
	            this.state.resetGrids();
	            this.checkStatus();
	        }
	    },

	    actToEnemy: function actToEnemy() {

	        if (this.unitComponents['Attack']) {
	            this.destGrid = this.destGrid.gridPosition.getAroundGrid(this.actUnit.hoverDirection);
	            this.attackDirection = this.actUnit.hoverDirection > 2 ? _h3unit2.default.LEFTCAMP : _h3unit2.default.RIGHTCAMP;
	            this.attacks = this.attacksMax;
	            switch (this.actUnit.hoverDirection) {
	                case 0:
	                    this.attackAnim = 'attackdown';
	                    break;
	                case 1:
	                    this.attackAnim = 'attack';
	                    break;
	                case 2:
	                    this.attackAnim = 'attackup';
	                    break;
	                case 3:
	                    this.attackAnim = 'attackup';
	                    break;
	                case 4:
	                    this.attackAnim = 'attack';
	                    break;
	                case 5:
	                    this.attackAnim = 'attackdown';
	                    break;
	            }
	        } else {
	            this.destGrid = null;
	        }
	    },

	    actToFriend: function actToFriend() {
	        this.state.openAttrPanel(this.actUnit);
	        this.destGrid = null;
	    },

	    checkStatus: function checkStatus() {

	        console.log('checkStatus  step:' + this.step);

	        if (this.unitComponents['Move'] && this.step > 0) {
	            this.moveStart();
	            return;
	        }

	        if (this.unitComponents['Attack'] && this.attacks > 0) {
	            this.attack();
	            return;
	        }

	        if (this.unitComponents['Move'] && this.direction !== this.camp) {
	            this.play('turn');
	            return;
	        }

	        if (this.animating) {
	            this.end();
	        } else {
	            this.animations.play('stand');
	            this.state.selectUnit.checkStatus();
	        }
	    },

	    end: function end() {

	        this.cycle = true;

	        this.animating = false;

	        this.animations.play('stand');

	        this.state.controlbar.actionGroup.callAll('enable');

	        this.state.unitCycle();
	    },

	    selected: function selected() {

	        console.log('select');

	        this.animations.play('select');

	        if (this.unitComponents['Move']) {
	            this.setRange();
	        }

	        if (this.unitComponents['Attack']) {
	            this.setAttack();
	        }
	    },

	    actWait: function actWait() {

	        this.wait = true;

	        this.state.resetGrids();

	        this.state.unitCycle();
	    },

	    actDefend: function actDefend() {

	        this.defend = true;

	        this.state.resetGrids();

	        this.state.unitCycle();
	    }

	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _h3unit = __webpack_require__(2);

	var _h3unit2 = _interopRequireDefault(_h3unit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_h3unit2.default.Component = function () {}; // import H3Unit from '../h3unit'

	_h3unit2.default.Component.install = function (components) {

	    // Always install 'Core' first
	    // Phaser.Utils.mixinPrototype(this, Phaser.Component.Core.prototype);

	    this.unitComponents = {};

	    for (var i = 0; i < components.length; i++) {
	        var id = components[i];
	        var replace = false;

	        // if (id === 'Destroy')
	        // {
	        //     replace = true;
	        // }

	        Phaser.Utils.mixinPrototype(this, _h3unit2.default.Component[id].prototype, replace);

	        this.unitComponents[id] = true;
	    }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _h3unit = __webpack_require__(2);

	var _h3unit2 = _interopRequireDefault(_h3unit);

	__webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	*
	* @class
	*/

	_h3unit2.default.Component.Move = function () {};

	_h3unit2.default.Component.Move.prototype = {

	    initMove: function initMove() {

	        this.speed = this.unitAttr.speed || 0;
	        this.initTurn();
	    },

	    initTurn: function initTurn() {

	        this.animations.getAnimation('turn').onComplete.add(function (sprite, animation) {
	            if (animation.reversed == false) {
	                this.direction *= -1;
	                animation.reverseOnce().play();
	            }
	            if (!animation.isPlaying) {
	                this.state.selectUnit.checkStatus();
	            }
	        }, this);
	    },

	    moveStart: function moveStart() {

	        this.destPosition = this.path[this.step - 1].grid.polygon.points[0];

	        var direction = Math.abs(Phaser.Point.angle(this.position, this.destPosition)) < Math.PI / 2 ? -1 : 1;
	        // console.log(direction > 0 ? 'right' : 'left');

	        if (this.direction !== direction) {
	            this.play('turn');
	        } else {
	            this.move();
	        }
	    },

	    move: function move() {

	        this.animations.play('move');

	        var moveTween = this.state.add.tween(this).to(this.destPosition, this.position.distance(this.destPosition, true) * 2, Phaser.Easing.Linear.None, false);
	        moveTween.start().onComplete.addOnce(function (sprite, tween) {

	            this.step--;
	            this.gridPosition = this.path[this.step];
	            if (this.step === 0) {
	                this.animations.play('stand');
	            }
	            this.checkStatus();
	        }, this);
	    }

	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _h3unit = __webpack_require__(2);

	var _h3unit2 = _interopRequireDefault(_h3unit);

	__webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	*
	* @class
	*/

	_h3unit2.default.Component.Walk = function () {};

	_h3unit2.default.Component.Walk.prototype = {

	    initWalk: function initWalk() {},

	    setRange: function setRange() {
	        var point = this.gridPosition,
	            points = [point];

	        point.grid.step = 0;
	        point.grid.direction = this.camp == 1 ? 1 : 4;
	        point.grid.sprite.setTexture(this.state.grids.graphics.texture3);
	        point.grid.mouseClass = 'mouse5';

	        for (var step = 1; step <= this.speed; step++) {

	            points = this.setAroundGrids(points, step);
	        }
	    },

	    setAroundGrids: function setAroundGrids(points, step) {

	        var result = [];

	        for (var index = 0, l = points.length; index < l; index++) {

	            var array = [],
	                parentGrid = points[index].grid;

	            for (var i = 0; i < 6; i++) {
	                var direction = (parentGrid.direction + i) % 6,
	                    nextGrid = points[index].getAroundGrid(direction);

	                if (!nextGrid) continue;

	                if (nextGrid.block === false && nextGrid.step === -1) {

	                    if (nextGrid.unit) {
	                        if (this.camp === nextGrid.unit.camp) {
	                            nextGrid.step = -2;
	                            nextGrid.mouseClass = 'mouse5';
	                        } else {
	                            nextGrid.step = -3;
	                            nextGrid.sprite.setTexture(this.state.grids.graphics.texture3);
	                        }
	                    } else {

	                        nextGrid.step = step;
	                        nextGrid.path = [].concat(_toConsumableArray(parentGrid.path));
	                        nextGrid.path.unshift(nextGrid.gridPosition);
	                        nextGrid.direction = direction;
	                        nextGrid.mouseClass = 'mouse3';

	                        nextGrid.sprite.setTexture(this.state.grids.graphics.texture3);

	                        result.push(nextGrid.gridPosition);
	                    }
	                }
	            }
	        }

	        return result;
	    }

	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _h3unit = __webpack_require__(2);

	var _h3unit2 = _interopRequireDefault(_h3unit);

	__webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	*
	* @class
	*/

	_h3unit2.default.Component.Attack = function () {};

	_h3unit2.default.Component.Attack.prototype = {

	    initAttack: function initAttack() {

	        this.attacks = 0;

	        this.attacksMax = this.unitAttr.attacks || 0;

	        // this.attacks = this.attacksMax;
	        var attackEnd = function attackEnd() {
	            this.attacks--;
	            this.actUnit.animations.play('gethit');
	            this.animations.play('stand');
	        };

	        this.animations.getAnimation('attackup').onComplete.add(attackEnd, this);
	        this.animations.getAnimation('attack').onComplete.add(attackEnd, this);
	        this.animations.getAnimation('attackdown').onComplete.add(attackEnd, this);
	        this.animations.getAnimation('gethit').onComplete.removeAll();
	        this.animations.getAnimation('gethit').onComplete.add(function (sprite, tween) {
	            this.checkStatus();
	        }, this);
	    },

	    attack: function attack() {
	        if (this.direction !== this.attackDirection) {
	            this.play('turn');
	        } else if (this.actUnit.unitComponents['Move'] && this.direction == this.actUnit.direction) {
	            this.actUnit.play('turn');
	        } else {
	            this.play(this.attackAnim);
	        }
	    },

	    setAttack: function setAttack() {
	        var list = this.state.unitCycleSet.list;
	        for (var i = 0, l = list.length; i < l; i++) {
	            var loopUnit = list[i];
	            if (this.camp !== loopUnit.camp) {
	                for (var j = 0; j < 6; j++) {
	                    var aroundGrid = loopUnit.gridPosition.getAroundGrid(j);
	                    if (aroundGrid && aroundGrid.step > -1) {
	                        loopUnit.parent[j].mouseClass = 'mouse' + (j + 6);
	                    } else {
	                        loopUnit.parent[j].mouseClass = 'mouse2';
	                    }
	                }
	            }
	        }
	    }

	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _h3unit = __webpack_require__(2);

	var _h3unit2 = _interopRequireDefault(_h3unit);

	__webpack_require__(3);

	__webpack_require__(5);

	__webpack_require__(9);

	__webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	// import './components/core'
	var FlyUnit = function FlyUnit(state, gridX, gridY, unitAttr, camp) {

	    gridX = gridX || 0;
	    gridY = gridY || 0;

	    _h3unit2.default.call(this, state, unitAttr);

	    this.camp = camp || _h3unit2.default.LEFTCAMP;

	    this.direction = this.camp;

	    // add this unit to game 
	    this.anchor.set(0.5, 0.55);
	    this.position.copyFrom(state.grids[gridX][gridY].polygon.points[0]);
	    this.gridPosition = new Phaser.Point(gridX, gridY);
	    this.order = state.unitCycleSet.total;
	    state.unitCycleSet.add(this);
	};

	FlyUnit.prototype = Object.create(_h3unit2.default.prototype);
	FlyUnit.prototype.constructor = FlyUnit;

	_h3unit2.default.Component.install.call(FlyUnit.prototype, ['Act', 'Move', 'Fly', 'Attack']);

	// Phaser.Utils.mixinPrototype(WalkUnit.prototype, H3Unit.Component.Move.prototype)
	// Phaser.Utils.mixinPrototype(WalkUnit.prototype, H3Unit.Component.Walk.prototype)
	exports.default = FlyUnit;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _h3unit = __webpack_require__(2);

	var _h3unit2 = _interopRequireDefault(_h3unit);

	__webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	*
	* @class
	*/

	_h3unit2.default.Component.Fly = function () {};

	_h3unit2.default.Component.Fly.prototype = {

	    initFly: function initFly() {},

	    setRange: function setRange() {
	        for (var x = 0; x < this.state.grids.column; x++) {
	            for (var y = 0; y < this.state.grids.row; y++) {

	                var loopGrid = this.state.grids[x][y];

	                if (loopGrid.block === false && this.state.getGridDistance(this.gridPosition, loopGrid.gridPosition) <= this.speed) {

	                    if (loopGrid.unit) {
	                        if (this.camp === loopGrid.unit.camp) {
	                            if (this === loopGrid.unit) {
	                                loopGrid.step = 0;
	                                loopGrid.sprite.setTexture(this.state.grids.graphics.texture3);
	                                loopGrid.mouseClass = 'mouse5';
	                            } else {
	                                loopGrid.step = -2;
	                                loopGrid.mouseClass = 'mouse5';
	                            }
	                        } else {
	                            loopGrid.step = -3;
	                            loopGrid.sprite.setTexture(this.state.grids.graphics.texture3);
	                        }
	                    } else {
	                        loopGrid.step = 1;
	                        loopGrid.path = [loopGrid.gridPosition];
	                        loopGrid.sprite.setTexture(this.state.grids.graphics.texture3);
	                        loopGrid.mouseClass = 'mouse4';
	                    }
	                }
	            }
	        }
	    }

	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

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

	var H3Btn = function H3Btn(state, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, parent) {

	    x = x || 0;
	    y = y || 0;
	    key = key || null;
	    callback = callback || null;
	    callbackContext = callbackContext || this;

	    Phaser.Button.call(this, state.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

	    if (parent === undefined) {
	        parent = state.world;
	    }

	    parent.addChild(this);

	    this._switch = true;
	};

	H3Btn.prototype = Object.create(Phaser.Button.prototype);
	H3Btn.prototype.constructor = H3Btn;

	H3Btn.prototype.disable = function () {

	    if (this.switch) {
	        this.inputEnabled = false;
	        this.setFrames(2, 2, 2, 2);
	    }
	};
	H3Btn.prototype.enable = function () {

	    if (this.switch) {
	        this.inputEnabled = true;
	        this.setFrames(0, 0, 1, 0);
	    }
	};

	Object.defineProperty(H3Btn.prototype, "switch", {
	    get: function get() {
	        return this._switch;
	    },
	    set: function set(value) {
	        if (value) {
	            this._switch = true;
	            this.inputEnabled = true;
	            this.setFrames(0, 0, 1, 0);
	        } else {
	            this._switch = false;
	            this.inputEnabled = false;
	            this.setFrames(2, 2, 2, 2);
	        }
	    }
	});

	exports.default = H3Btn;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	/**
	* @class H3GridPoint
	* @constructor
	* @param {number} [x=0] - The horizontal grid position of this Point.
	* @param {number} [y=0] - The vertical grid position of this Point.
	*/

	var H3GridPoint = function H3GridPoint(x, y, grids) {

	    x = x || 0;
	    y = y || 0;

	    Phaser.Point.call(this, x, y);

	    this.grids = grids;
	};

	H3GridPoint.RIGHTUP = 0;
	H3GridPoint.RIGHT = 1;
	H3GridPoint.RIGHTDOWN = 2;
	H3GridPoint.LEFTDOWN = 3;
	H3GridPoint.LEFT = 4;
	H3GridPoint.LEFTUP = 5;

	H3GridPoint.prototype = Object.create(Phaser.Point.prototype);
	H3GridPoint.prototype.constructor = H3GridPoint;

	H3GridPoint.prototype.getAroundGrid = function (direction) {
	    switch (direction) {
	        case 0:
	            return this.grid.rightUpGrid;
	        case 1:
	            return this.grid.rightGrid;
	        case 2:
	            return this.grid.rightDownGrid;
	        case 3:
	            return this.grid.leftDownGrid;
	        case 4:
	            return this.grid.leftGrid;
	        case 5:
	            return this.grid.leftUpGrid;
	        default:
	            return this.grid.rightUpGrid;
	    }
	};

	Object.defineProperty(H3GridPoint.prototype, "grid", {
	    get: function get() {
	        return this.grids[this.x][this.y];
	    }
	});

	exports.default = H3GridPoint;

/***/ }
/******/ ]);