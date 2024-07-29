/**
 * slot 動畫觸發事件
 * @Bootup 開機
 * @Standby 待機
 * @TicketPrint 出票
 * @TicketCutoff 掉票
 * @Shutdown 關機
 */
const SlotEventEnum = Object.freeze({
	Bootup: 'bootup',
	Standby: 'standby',
	TicketPrint: 'ticket_print',
	TicketCutoff: 'ticket_cutoff',
	Shutdown: 'shutdown',
})

/**
 * slot 滾輪滾動事件
 * @ReelDefultStart slot 機滾輪待機開始
 * @ReelDefultEnd slot 機滾輪待機結束
 * @ReelPlayStart slot 機滾輪滾動開始
 * @ReelPlayEnd slot 機滾輪滾動結束
 */
const ReelStateEnum = Object.freeze({
	ReelDefultStart: 'reel_defult_start',
	ReelDefultEnd: 'reel_defult_end',
	ReelPlayStart: 'reel_play_start',
	ReelPlayEnd: 'reel_play_end',
})

;(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
var rect; // used to reference frame bounds
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.lightorange = function() {
	this.initialize(img.lightorange);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,163,42);


(lib.lightpurle = function() {
	this.initialize(img.lightpurle);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,163,42);


(lib.reel8 = function() {
	this.initialize(img.reel8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.reeln = function() {
	this.initialize(img.reeln);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.reelo = function() {
	this.initialize(img.reelo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.reelv = function() {
	this.initialize(img.reelv);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.reel_a = function() {
	this.initialize(img.reel_a);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.screensd = function() {
	this.initialize(img.screensd);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,657,310);


(lib.slothandle = function() {
	this.initialize(img.slothandle);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,120,120);


(lib.slotmachineoff = function() {
	this.initialize(img.slotmachineoff);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,1500);


(lib.slot = function() {
	this.initialize(img.slot);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2560,1500);


(lib.ticketsd = function() {
	this.initialize(img.ticketsd);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,189,78);


(lib.ticket = function() {
	this.initialize(img.ticket);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,800);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.ticket();
	this.instance.setTransform(-31,-49.55,0.124,0.124);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-31,-49.5,62,99.2);
p.frameBounds = [rect];


(lib.Tween21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.reel_a();
	this.instance.setTransform(-14.15,-161.6,0.1415,0.1412);

	this.instance_1 = new lib.reelo();
	this.instance_1.setTransform(-14.15,-43.6,0.1415,0.1412);

	this.instance_2 = new lib.reelv();
	this.instance_2.setTransform(-14.15,-102.6,0.1415,0.1412);

	this.instance_3 = new lib.reeln();
	this.instance_3.setTransform(-14.15,15.4,0.1415,0.1412);

	this.instance_4 = new lib.reel8();
	this.instance_4.setTransform(-14.15,74.4,0.1415,0.1412);

	this.instance_5 = new lib.reel_a();
	this.instance_5.setTransform(-14.15,133.4,0.1415,0.1412);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-14.1,-161.6,28.3,323.3);
p.frameBounds = [rect];


(lib.Tween13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.slothandle();
	this.instance.setTransform(-12.9,-11.55,0.2243,0.2243);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-12.9,-11.5,26.9,26.9);
p.frameBounds = [rect];


(lib.Tween11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.slothandle();
	this.instance.setTransform(-12.9,-11.55,0.2243,0.2243);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-12.9,-11.5,26.9,26.9);
p.frameBounds = [rect];


(lib.slot_off = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// slot_off
	this.instance = new lib.slotmachineoff();
	this.instance.setTransform(-256.65,-150.35,0.2005,0.2005);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(225));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-256.6,-150.3,513.3,300.8);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.slot_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// slot
	this.instance = new lib.slot();
	this.instance.setTransform(-256.65,-150.35,0.2005,0.2005);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-256.6,-150.3,513.3,300.8);
p.frameBounds = [rect, rect];


(lib.screendiv = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// screen_div
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(102,102,102,0.498)").s().p("Ap9EwIAApfIT7AAIAAJfg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-63.8,-30.4,127.6,60.8);
p.frameBounds = [rect];


(lib.reel_A = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.reel_a();
	this.instance.setTransform(-14.15,-161.65,0.1415,0.1412);

	this.instance_1 = new lib.reelo();
	this.instance_1.setTransform(-14.15,-43.65,0.1415,0.1412);

	this.instance_2 = new lib.reelv();
	this.instance_2.setTransform(-14.15,-102.65,0.1415,0.1412);

	this.instance_3 = new lib.reeln();
	this.instance_3.setTransform(-14.15,15.35,0.1415,0.1412);

	this.instance_4 = new lib.reel8();
	this.instance_4.setTransform(-14.15,74.35,0.1415,0.1412);

	this.instance_5 = new lib.reel_a();
	this.instance_5.setTransform(-14.15,133.35,0.1415,0.1412);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.reel_A, rect = new cjs.Rectangle(-14.1,-161.6,28.3,323.3), [rect]);


(lib.lighto = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// light_orange
	this.instance = new lib.lightorange();
	this.instance.setTransform(43.6,-2.8,0.1337,0.1337);

	this.instance_1 = new lib.lightorange();
	this.instance_1.setTransform(7.6,-2.8,0.1337,0.1337);

	this.instance_2 = new lib.lightorange();
	this.instance_2.setTransform(-29.4,-2.8,0.1337,0.1337);

	this.instance_3 = new lib.lightorange();
	this.instance_3.setTransform(-65.4,-2.8,0.1337,0.1337);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},5).to({state:[]},1).wait(157));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-65.4,-2.8,130.8,5.6);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, null];


(lib.btn_on = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#61E200").s().p("AiMBJIAAiRIEZAAIAACRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-14.1,-7.3,28.2,14.6);
p.frameBounds = [rect];


(lib.btn_off = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiMBJIAAiRIEZAAIAACRg");
	this.shape.setTransform(120.15,-27.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(106.1,-34.9,28.2,14.6);
p.frameBounds = [rect];


(lib.btn_lottery_ticket_start = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6600").s().p("AiMBJIAAiRIEZAAIAACRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-14.1,-7.3,28.2,14.6);
p.frameBounds = [rect];


(lib.btn_lottery_ticket_end = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#990000").s().p("AiMBJIAAiRIEZAAIAACRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-14.1,-7.3,28.2,14.6);
p.frameBounds = [rect];


(lib.btn_defult = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#990099").s().p("AiMBJIAAiRIEZAAIAACRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-14.1,-7.3,28.2,14.6);
p.frameBounds = [rect];


(lib.Tween32 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.reel_A();
	this.instance.setTransform(0,-504.65,0.8551,0.8551);

	this.instance_1 = new lib.reel_A();
	this.instance_1.setTransform(0,-252.2,0.8551,0.8551);

	this.instance_2 = new lib.reel_A();
	this.instance_2.setTransform(0,-0.2,0.8551,0.8551);

	this.instance_3 = new lib.reel_A();
	this.instance_3.setTransform(0,252.25,0.8551,0.8551);

	this.instance_4 = new lib.reel_A();
	this.instance_4.setTransform(0,504.6,0.8551,0.8551);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-12.1,-642.8,24.2,1285.7);
p.frameBounds = [rect];


(lib.Tween31 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.reel_A();
	this.instance.setTransform(0,-504.6,0.8551,0.8551);

	this.instance_1 = new lib.reel_A();
	this.instance_1.setTransform(0,-252.4,0.8551,0.8551);

	this.instance_2 = new lib.reel_A();
	this.instance_2.setTransform(0,-0.15,0.8551,0.8551);

	this.instance_3 = new lib.reel_A();
	this.instance_3.setTransform(0,252.3,0.8551,0.8551);

	this.instance_4 = new lib.reel_A();
	this.instance_4.setTransform(0,504.65,0.8551,0.8551);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-12.1,-642.8,24.2,1285.7);
p.frameBounds = [rect];


(lib.Tween30 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.reel_A();
	this.instance.setTransform(0,-504.6,0.8551,0.8551);

	this.instance_1 = new lib.reel_A();
	this.instance_1.setTransform(0,-252.4,0.8551,0.8551);

	this.instance_2 = new lib.reel_A();
	this.instance_2.setTransform(0,-0.15,0.8551,0.8551);

	this.instance_3 = new lib.reel_A();
	this.instance_3.setTransform(0,252.3,0.8551,0.8551);

	this.instance_4 = new lib.reel_A();
	this.instance_4.setTransform(0,504.65,0.8551,0.8551);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-12.1,-642.8,24.2,1285.7);
p.frameBounds = [rect];


(lib.Tween29 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.reel_A();
	this.instance.setTransform(0,-504.65,0.8551,0.8551);

	this.instance_1 = new lib.reel_A();
	this.instance_1.setTransform(0,-252.2,0.8551,0.8551);

	this.instance_2 = new lib.reel_A();
	this.instance_2.setTransform(0,-0.2,0.8551,0.8551);

	this.instance_3 = new lib.reel_A();
	this.instance_3.setTransform(0,252.25,0.8551,0.8551);

	this.instance_4 = new lib.reel_A();
	this.instance_4.setTransform(0,504.6,0.8551,0.8551);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-12.1,-642.8,24.2,1285.7);
p.frameBounds = [rect];


(lib.Tween28 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.reel_A();
	this.instance.setTransform(0,-504.65,0.8551,0.8551);

	this.instance_1 = new lib.reel_A();
	this.instance_1.setTransform(0,-252.2,0.8551,0.8551);

	this.instance_2 = new lib.reel_A();
	this.instance_2.setTransform(0,-0.2,0.8551,0.8551);

	this.instance_3 = new lib.reel_A();
	this.instance_3.setTransform(0,252.25,0.8551,0.8551);

	this.instance_4 = new lib.reel_A();
	this.instance_4.setTransform(0,504.6,0.8551,0.8551);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-12.1,-642.8,24.2,1285.7);
p.frameBounds = [rect];


(lib.reel_g = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {reel_defult_start:0,reel_defult_end:18,reel_play_start:19,reel_play_end:229};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Mask_A (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AhzElIAApJIDnAAIAAJJg");
	var mask_graphics_30 = new cjs.Graphics().p("AhzElIAApJIDnAAIAAJJg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:54.45,y:0}).wait(30).to({graphics:mask_graphics_30,x:54.45,y:0}).wait(200));

	// slot_f_a
	this.instance = new lib.reel_A();
	this.instance.setTransform(54,-1134.55,0.8551,0.8551);

	this.instance_1 = new lib.reel_A();
	this.instance_1.setTransform(54,-882.1,0.8551,0.8551);

	this.instance_2 = new lib.reel_A();
	this.instance_2.setTransform(54,-630.1,0.8551,0.8551);

	this.instance_3 = new lib.reel_A();
	this.instance_3.setTransform(54,-377.65,0.8551,0.8551);

	this.instance_4 = new lib.reel_A();
	this.instance_4.setTransform(54,-125.3,0.8551,0.8551);

	this.instance_5 = new lib.Tween32("synched",0);
	this.instance_5.setTransform(54,-629.9);
	this.instance_5._off = true;

	this.instance_6 = new lib.Tween29("synched",0);
	this.instance_6.setTransform(54,-377.65);
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween30("synched",0);
	this.instance_7.setTransform(54,126.8);
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween31("synched",0);
	this.instance_8.setTransform(54,379.3);
	this.instance_8._off = true;

	this.instance_9 = new lib.Tween21("synched",0);
	this.instance_9.setTransform(54,126.9,0.8551,0.8551);
	this.instance_9._off = true;

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3,this.instance_4,this.instance_5,this.instance_6,this.instance_7,this.instance_8,this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_5}]},30).to({state:[{t:this.instance_6}]},16).to({state:[{t:this.instance_7}]},38).to({state:[{t:this.instance_8}]},36).to({state:[{t:this.instance_8}]},34).to({state:[{t:this.instance_8}]},4).to({state:[{t:this.instance_8}]},6).to({state:[{t:this.instance_9}]},30).to({state:[{t:this.instance_9}]},5).to({state:[{t:this.instance_9}]},5).to({state:[{t:this.instance_9}]},5).to({state:[{t:this.instance_9}]},5).to({state:[{t:this.instance_9}]},5).to({state:[{t:this.instance_9}]},5).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(30).to({_off:false},0).to({_off:true,y:-377.65},16).wait(184));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(30).to({_off:false},16).to({_off:true,y:126.8},38).wait(146));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(46).to({_off:false},38).to({_off:true,y:379.3},36).wait(110));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(84).to({_off:false},36).to({y:631.55},34).to({y:640.05},4).to({y:631.55},6).to({_off:true},30).wait(36));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(194).to({_off:false},0).to({alpha:0},5).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5).wait(6));

	// Mask_V (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_0 = new cjs.Graphics().p("AhzElIAApJIDnAAIAAJJg");
	var mask_1_graphics_30 = new cjs.Graphics().p("AhzElIAApJIDnAAIAAJJg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:18.15,y:0}).wait(30).to({graphics:mask_1_graphics_30,x:18.15,y:0}).wait(200));

	// slot_f_v
	this.instance_10 = new lib.Tween28("synched",0);
	this.instance_10.setTransform(18,-428.1);

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(30).to({startPosition:0},0).to({y:-175.7},16).to({y:328},38).to({y:581.2},55).to({y:589.7},4).to({y:581.2},6).wait(45).to({y:581.15},0).to({alpha:0},5).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5).wait(6));

	// Mask_O (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("AGsElIAApJIDpAAIAAJJgABCElIAApJIDoAAIAAJJgAkpElIAApJIDoAAIAAJJgAqUElIAApJIDpAAIAAJJg");

	// slot_f_o
	this.instance_11 = new lib.Tween28("synched",0);
	this.instance_11.setTransform(-18.2,-478.6);

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(30).to({startPosition:0},0).to({y:-226.2},16).to({y:278.25},38).to({y:530.6},40).to({y:539.1},4).to({y:530.6},6).wait(60).to({y:278.2},0).to({alpha:0},5).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5).wait(6));

	// Mask_N (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	var mask_3_graphics_0 = new cjs.Graphics().p("AhzElIAApJIDnAAIAAJJg");
	var mask_3_graphics_30 = new cjs.Graphics().p("AhzElIAApJIDnAAIAAJJg");

	this.timeline.addTween(cjs.Tween.get(mask_3).to({graphics:mask_3_graphics_0,x:-54.45,y:0}).wait(30).to({graphics:mask_3_graphics_30,x:-54.45,y:0}).wait(200));

	// slot_f_n
	this.instance_12 = new lib.Tween28("synched",0);
	this.instance_12.setTransform(-54.8,-529.1);

	var maskedShapeInstanceList = [this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(30).to({startPosition:0},0).to({y:-276.7},16).to({y:228},38).to({y:480.3},25).to({y:488.75},4).to({y:480.3},6).wait(75).to({y:-24.25},0).to({alpha:0},5).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-66,-29.3,132.1,58.6);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.light = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// light_o
	this.instance = new lib.lighto("synched",0);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1,startPosition:2},5).to({alpha:0,startPosition:0},4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-65.4,-2.8,130.8,5.6);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.slot_g = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {bootup_start:0,bootup_end:58,standby_start:59,standby_end:118,ticket_print_start:119,ticket_print_end:329,ticket_cutoff_start:330,ticket_cutoff_end:368,shutdown_start:369,shutdown_end:429};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// slot_off
	this.instance = new lib.slot_off();
	this.instance.setTransform(-0.35,-22.65);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:0},49).wait(320).to({alpha:1},60).wait(1));

	// reel_g
	this.reel_g = new lib.reel_g();
	this.reel_g.name = "reel_g";
	this.reel_g.setTransform(0.05,-133.7,1,1,0,0,0,-0.6,-109.2);

	this.timeline.addTween(cjs.Tween.get(this.reel_g).wait(430));

	// light
	this.instance_1 = new lib.light("synched",0);
	this.instance_1.setTransform(0,17.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(430));

	// light_purple
	this.instance_2 = new lib.lightpurle();
	this.instance_2.setTransform(43.6,15,0.1337,0.1337);

	this.instance_3 = new lib.lightpurle();
	this.instance_3.setTransform(7.6,15,0.1337,0.1337);

	this.instance_4 = new lib.lightpurle();
	this.instance_4.setTransform(-29.4,15,0.1337,0.1337);

	this.instance_5 = new lib.lightpurle();
	this.instance_5.setTransform(-65.4,15,0.1337,0.1337);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},119).wait(311));

	// ticket_sd
	this.instance_6 = new lib.ticketsd();
	this.instance_6.setTransform(-16,31,0.1725,0.1477);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(430));

	// ticket
	this.instance_7 = new lib.Tween25("synched",0);
	this.instance_7.setTransform(0.65,33.5,0.5801,0.0011,0,0,0,0.1,-45.5);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(304).to({_off:false},0).to({regX:0.2,scaleX:0.916,scaleY:0.8002,y:29.2},9).to({scaleX:0.958,scaleY:0.9001,y:28.95},3).to({regX:0,regY:-39.8,scaleX:1,scaleY:1,x:0.2,y:33.6},1).wait(35).to({startPosition:0},0).to({y:61.4},5).to({y:89.2,alpha:0},5).wait(68));

	// slot
	this.instance_8 = new lib.slot_1();
	this.instance_8.setTransform(-0.35,-22.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(430));

	// slot_handle
	this.instance_9 = new lib.Tween11();
	this.instance_9.setTransform(100.9,-34.85);

	this.instance_10 = new lib.Tween13();
	this.instance_10.setTransform(100.9,1.15);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(119).to({_off:true,y:1.15},6).wait(8).to({_off:false,y:-34.85,mode:"synched",startPosition:0},24).to({y:-32.45},8).to({y:-34.85,mode:"independent"},23).wait(242));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(119).to({_off:false},6).to({y:7.15,mode:"synched",startPosition:0},3).to({y:5.25},5).to({_off:true,y:-34.85},24).wait(273));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-257,-1297.2,513.3,1487.5);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


// stage content:
(lib.slot_final_4_for_switch_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.stop();
		
		// 確保所有按鈕和影片剪輯存在於場景中
		console.log(this.btn_bootup); // 應該輸出按鈕對象，如果是 undefined，則按鈕引用有問題
		console.log(this.btn_standby);
		console.log(this.ticket_print);
		console.log(this.ticket_cutoff);
		console.log(this.btn_shutdown);
		console.log(this.slot_g); // 確認 slot_g 存在
		console.log(this.slot_g.reel_g); // 確認 reel_g 存在，這是包含四個標籤的元件
		
		// 確保所有影片剪輯停止並切換到初始標籤
		this.slot_g.stop();
		this.slot_g.reel_g.gotoAndStop("reel_defult_start");
		
		// 定義通用的播放函數
		function playPart(startLabel, endLabel, reelStartLabel, reelEndLabel) {
		    var _this = this;
		
		    // 先移除之前的 tick 事件監聽器
		    _this.off("tick");
		
		    // 確保當前動畫停止
		    _this.stop();
		
		    // 切換到指定的 reel_g 標籤
		    this.reel_g.gotoAndPlay(reelStartLabel);
		    console.log("Switched to reel_g start label: " + reelStartLabel); // 檢查是否成功切換標籤
		
		    // 在 'tick' 事件中檢查當前標籤，停止在 reelEndLabel
		    this.reel_g.on("tick", function() {
		        if (this.reel_g.currentLabel === reelEndLabel) {
		            this.reel_g.stop();
		            this.reel_g.off("tick", arguments.callee);
		        }
		    }.bind(this));
		
		    // 播放指定的起始標籤
		    _this.gotoAndPlay(startLabel);
		
		    // 在 'tick' 事件中檢查當前標籤，停止在 endLabel
		    _this.on("tick", function() {
		        if (_this.currentLabel === endLabel) {
		            _this.stop(); // 當到達結束標籤時停止播放
		            _this.off("tick", arguments.callee); // 移除 'tick' 事件監聽器
		        }
		    });
		}
		
		// 綁定按鈕點擊事件處理程序
		this.btn_bootup.addEventListener("click", function() {
		    playPart.call(this.slot_g, "bootup_start", "bootup_end", "reel_defult_start", "reel_defult_end");
		}.bind(this));
		
		this.btn_standby.addEventListener("click", function() {
		    playPart.call(this.slot_g, "standby_start", "standby_end", "reel_defult_start", "reel_defult_end");
		}.bind(this));
		
		this.ticket_print.addEventListener("click", function() {
		    playPart.call(this.slot_g, "ticket_print_start", "ticket_print_end", "reel_play_start", "reel_play_end");
		}.bind(this));
		
		this.ticket_cutoff.addEventListener("click", function() {
		    playPart.call(this.slot_g, "ticket_cutoff_start", "ticket_cutoff_end", "reel_defult_start", "reel_defult_end");
		}.bind(this));
		
		this.btn_shutdown.addEventListener("click", function() {
		    playPart.call(this.slot_g, "shutdown_start", "shutdown_end", "reel_defult_start", "reel_defult_end");
		}.bind(this));
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// btn
	// this.ticket_cutoff = new lib.btn_lottery_ticket_end();
	// this.ticket_cutoff.name = "ticket_cutoff";
	// this.ticket_cutoff.setTransform(119.95,11.95);
	// new cjs.ButtonHelper(this.ticket_cutoff, 0, 1, 1);

	// this.btn_shutdown = new lib.btn_off();
	// this.btn_shutdown.name = "btn_shutdown";
	// this.btn_shutdown.setTransform(32.1,39.55);
	// new cjs.ButtonHelper(this.btn_shutdown, 0, 1, 1);

	// this.ticket_print = new lib.btn_lottery_ticket_start();
	// this.ticket_print.name = "ticket_print";
	// this.ticket_print.setTransform(87.65,11.95);
	// new cjs.ButtonHelper(this.ticket_print, 0, 1, 1);

	// this.btn_standby = new lib.btn_defult();
	// this.btn_standby.name = "btn_standby";
	// this.btn_standby.setTransform(55.35,11.95);
	// new cjs.ButtonHelper(this.btn_standby, 0, 1, 1);

	// this.btn_bootup = new lib.btn_on();
	// this.btn_bootup.name = "btn_bootup";
	// this.btn_bootup.setTransform(23.05,11.95);
	// new cjs.ButtonHelper(this.btn_bootup, 0, 1, 1);

	// this.shape = new cjs.Shape();
	// this.shape.graphics.f("rgba(51,153,153,0)").s().p("AgKAJQgCgBgBgFQgBgDACgFQACgEADgCQACgCAFAAQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQAIACACACIACAEQAFAGgEAHQgDAHgJABIgBAAQgGAAgEgGg");
	// this.shape.setTransform(-29.2009,15.5817);

	// this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.btn_bootup},{t:this.btn_standby},{t:this.ticket_print},{t:this.btn_shutdown},{t:this.ticket_cutoff}]}).wait(1));

	// screen_sd
	this.instance = new lib.screensd();
	this.instance.setTransform(60,119,0.1993,0.1962);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// screen_div
	this.screentext = new lib.screendiv();
	this.screentext.name = "screentext";
	this.screentext.setTransform(124.6,73.6);

	this.timeline.addTween(cjs.Tween.get(this.screentext).wait(1));

	// slot_group
	this.slot_g = new lib.slot_g();
	this.slot_g.name = "slot_g";
	this.slot_g.setTransform(124.95,172.9);

	this.timeline.addTween(cjs.Tween.get(this.slot_g).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-7.1,-974.3,513.3,1487.4);
p.frameBounds = [rect];
// library properties:
lib.properties = {
	id: '1B25E5E726B92D4DB434108D676CE9B2',
	width: 250,
	height: 300,
	fps: 30,
	color: "#FFFFFF",
	opacity: 0.00,
	manifest: [
		{src:"img/event/lottery/lightorange.png", id:"lightorange"},
		{src:"img/event/lottery/lightpurle.png", id:"lightpurle"},
		{src:"img/event/lottery/reel8.png", id:"reel8"},
		{src:"img/event/lottery/reeln.png", id:"reeln"},
		{src:"img/event/lottery/reelo.png", id:"reelo"},
		{src:"img/event/lottery/reelv.png", id:"reelv"},
		{src:"img/event/lottery/reel_a.png", id:"reel_a"},
		{src:"img/event/lottery/screensd.png", id:"screensd"},
		{src:"img/event/lottery/slothandle.png", id:"slothandle"},
		{src:"img/event/lottery/slotmachineoff.png", id:"slotmachineoff"},
		{src:"img/event/lottery/slot.png", id:"slot"},
		{src:"img/event/lottery/ticketsd.png", id:"ticketsd"},
		{src:"img/event/lottery/ticket.png", id:"ticket"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['1B25E5E726B92D4DB434108D676CE9B2'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
/** 監聽 react 組件發過來的廣播事件，並播放指定的動畫
 *  @event 廣播事件 */
window.addEventListener('message', function (event) {
	if (!exportRoot || !exportRoot.slot_g) return

	/** 動畫的 instance */
	const slotG = exportRoot.slot_g

	if (typeof slotG.playPart !== 'function') {
		/**
		 * 定義通用的播放函數
		 * @param {string} startLabel 當前動畫開始的名稱
		 * @param {string} endLabel  當前動畫結束的名稱
		 * @param {string} reelStartLabel  滾輪是否轉動開始
		 * @param {string} reelEndLabel  滾輪是否轉動結束
		 * @param {string} animationName  當前動畫名稱 */
		slotG.playPart = function (
			startLabel,
			endLabel,
			reelStartLabel,
			reelEndLabel,
			animationName
		) {
			let _this = this

			/** 確認動畫是否結束，動畫的監聽是每幀確認一次，故每次播放動畫都需要重置此變數，不然會不斷的監聽 */
			let animationEnded = false

			_this.off('tick') // 先移除之前的 tick 事件監聽器
			_this.stop() // 確保當前動畫停止
			this.reel_g.gotoAndPlay(reelStartLabel) // 切換到指定的 reel_g 標籤

			// 在 'tick' 事件中檢查當前標籤，停止在 reelEndLabel
			this.reel_g.on(
				'tick',
				function () {
					if (this.reel_g.currentLabel === reelEndLabel) {
						this.reel_g.stop()
						this.reel_g.off('tick', arguments.callee)
					}
				}.bind(this)
			)
			_this.gotoAndPlay(startLabel) // 播放指定的起始標籤

			// 動畫播放每幀都會觸發 'tick' 事件
			_this.on('tick', function () {
				if (_this.currentLabel === endLabel) {
					_this.stop() // 當到達結束標籤時停止播放

					// 確保只觸發一次
					if (!animationEnded) {
						/** 傳給前端的事件，跟結束的動畫名稱 */
						const postData = {
							type: 'animationEnded',
							animationName: animationName,
						}
						window.parent.postMessage(postData, '*')
						animationEnded = true
					}
					_this.off('tick', arguments.callee) // 移除 'tick' 事件監聽器
				}
			})
		}
	}
	/** 根據前端廣播來決定播放哪個動畫
	 * @param {string} animationName 當前動畫的名稱
	 * @param {string} reelStartLabel  slot 機滾輪開始狀態文字
	 * @param {string} reelEndLabel   slot 機滾輪結束狀態文字 */
	const playSlotAnimation = (animationName, reelStartLabel, reelEndLabel) => {
		slotG.playPart(
			`${animationName}_start`,
			`${animationName}_end`,
			reelStartLabel,
			reelEndLabel,
			animationName
		)
	}

	// 根據前端廣播來決定播放哪個動畫
	switch (event.data) {
		case SlotEventEnum.Bootup:
			playSlotAnimation(
				SlotEventEnum.Bootup,
				ReelStateEnum.ReelDefultStart,
				ReelStateEnum.ReelDefultEnd
			)
			break
		case SlotEventEnum.Standby:
			playSlotAnimation(
				SlotEventEnum.Standby,
				ReelStateEnum.ReelDefultStart,
				ReelStateEnum.ReelDefultEnd
			)
			break
		case SlotEventEnum.TicketPrint:
			playSlotAnimation(
				SlotEventEnum.TicketPrint,
				ReelStateEnum.ReelPlayStart,
				ReelStateEnum.ReelPlayEnd
			)
			break
		case SlotEventEnum.TicketCutoff:
			playSlotAnimation(
				SlotEventEnum.TicketCutoff,
				ReelStateEnum.ReelDefultStart,
				ReelStateEnum.ReelDefultEnd
			)
			break
		case SlotEventEnum.Shutdown:
			playSlotAnimation(
				SlotEventEnum.Shutdown,
				ReelStateEnum.ReelDefultStart,
				ReelStateEnum.ReelDefultStart
			)
			break
	}
})
