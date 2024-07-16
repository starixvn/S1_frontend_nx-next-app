var play
;(function (cjs, an) {
	var p // shortcut to reference prototypes
	var lib = {}
	var ss = {}
	var img = {}
	lib.ssMetadata = [
		{
			name: 'slot_atlas_1',
			frames: [
				[0, 0, 834, 834],
				[0, 836, 834, 834],
				[836, 0, 834, 834],
				[836, 836, 834, 834],
			],
		},
		{
			name: 'slot_atlas_2',
			frames: [
				[836, 1217, 134, 161],
				[973, 1139, 117, 234],
				[1081, 1036, 146, 88],
				[973, 836, 106, 301],
				[1081, 836, 99, 198],
				[836, 836, 135, 379],
				[1182, 836, 115, 84],
				[0, 0, 834, 834],
				[0, 836, 834, 834],
				[836, 0, 834, 834],
				[1182, 922, 95, 95],
			],
		},
	]
	;(lib.AnMovieClip = function () {
		this.actionFrames = []
		this.ignorePause = false
		this.gotoAndPlay = function (positionOrLabel) {
			cjs.MovieClip.prototype.gotoAndPlay.call(this, positionOrLabel)
		}
		this.play = function () {
			cjs.MovieClip.prototype.play.call(this)
		}
		this.gotoAndStop = function (positionOrLabel) {
			cjs.MovieClip.prototype.gotoAndStop.call(this, positionOrLabel)
		}
		this.stop = function () {
			cjs.MovieClip.prototype.stop.call(this)
		}
	}).prototype = p = new cjs.MovieClip()
	// symbols:
	;(lib._7 = function () {
		this.initialize(ss['slot_atlas_1'])
		this.gotoAndStop(0)
	}).prototype = p = new cjs.Sprite()
	;(lib.bg = function () {
		this.initialize(img.bg)
	}).prototype = p = new cjs.Bitmap()
	p.nominalBounds = new cjs.Rectangle(0, 0, 2084, 2084)
	;(lib.BMP_136365d5_a210_40e8_add4_bd59badac591 = function () {
		this.initialize(ss['slot_atlas_2'])
		this.gotoAndStop(0)
	}).prototype = p = new cjs.Sprite()
	;(lib.BMP_514abf5e_0be7_473d_b3ad_9a95eecc3cf6 = function () {
		this.initialize(ss['slot_atlas_2'])
		this.gotoAndStop(1)
	}).prototype = p = new cjs.Sprite()
	;(lib.BMP_6e93da09_e19e_4297_9d7d_06fa570c0c80 = function () {
		this.initialize(ss['slot_atlas_2'])
		this.gotoAndStop(2)
	}).prototype = p = new cjs.Sprite()
	;(lib.BMP_71059833_6dea_490e_b76a_57165b646dd5 = function () {
		this.initialize(ss['slot_atlas_2'])
		this.gotoAndStop(3)
	}).prototype = p = new cjs.Sprite()
	;(lib.BMP_75e62a8e_f1ca_462f_9471_b021701dc351 = function () {
		this.initialize(ss['slot_atlas_2'])
		this.gotoAndStop(4)
	}).prototype = p = new cjs.Sprite()
	;(lib.BMP_c6afd884_c27d_4cea_bd7d_fa41fa973ecf = function () {
		this.initialize(ss['slot_atlas_2'])
		this.gotoAndStop(5)
	}).prototype = p = new cjs.Sprite()
	;(lib.BMP_d0dbc985_1ffc_482a_ad68_baea08abee0a = function () {
		this.initialize(ss['slot_atlas_2'])
		this.gotoAndStop(6)
	}).prototype = p = new cjs.Sprite()
	;(lib.friut_01 = function () {
		this.initialize(ss['slot_atlas_1'])
		this.gotoAndStop(1)
	}).prototype = p = new cjs.Sprite()
	;(lib.friut_02 = function () {
		this.initialize(ss['slot_atlas_1'])
		this.gotoAndStop(2)
	}).prototype = p = new cjs.Sprite()
	;(lib.friut_03 = function () {
		this.initialize(ss['slot_atlas_1'])
		this.gotoAndStop(3)
	}).prototype = p = new cjs.Sprite()
	;(lib.friut_04 = function () {
		this.initialize(ss['slot_atlas_2'])
		this.gotoAndStop(7)
	}).prototype = p = new cjs.Sprite()
	;(lib.friut_05 = function () {
		this.initialize(ss['slot_atlas_2'])
		this.gotoAndStop(8)
	}).prototype = p = new cjs.Sprite()
	;(lib.friut_06 = function () {
		this.initialize(ss['slot_atlas_2'])
		this.gotoAndStop(9)
	}).prototype = p = new cjs.Sprite()
	;(lib.light = function () {
		this.initialize(img.light)
	}).prototype = p = new cjs.Bitmap()
	p.nominalBounds = new cjs.Rectangle(0, 0, 2084, 2084)
	;(lib.slotcontrol = function () {
		this.initialize(ss['slot_atlas_2'])
		this.gotoAndStop(10)
	}).prototype = p = new cjs.Sprite()
	;(lib.slot = function () {
		this.initialize(img.slot)
	}).prototype = p = new cjs.Bitmap()
	p.nominalBounds = new cjs.Rectangle(0, 0, 2084, 2084)
	;(lib.slot_screen = function () {
		this.initialize(img.slot_screen)
	}).prototype = p = new cjs.Bitmap()
	p.nominalBounds = new cjs.Rectangle(0, 0, 2084, 2084)
	;(lib.WarpedAsset_1 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib.BMP_c6afd884_c27d_4cea_bd7d_fa41fa973ecf()

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(0, 0, 135, 379)
	;(lib.Tween6 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib.slotcontrol()
		this.instance.setTransform(-8.75, -8.75, 0.184, 0.184)

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(-8.7, -8.7, 17.5, 17.5)
	;(lib.Tween5 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib.slotcontrol()
		this.instance.setTransform(-8.75, -8.75, 0.184, 0.184)

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(-8.7, -8.7, 17.5, 17.5)
	;(lib.Tween4 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib._7()
		this.instance.setTransform(-20.1, -226.5, 0.048, 0.048)

		this.instance_1 = new lib._7()
		this.instance_1.setTransform(-20.1, 186.5, 0.048, 0.048)

		this.instance_2 = new lib.friut_06()
		this.instance_2.setTransform(-20.1, 9.5, 0.0482, 0.0482)

		this.instance_3 = new lib.friut_05()
		this.instance_3.setTransform(-20.1, -108.5, 0.0482, 0.0482)

		this.instance_4 = new lib.friut_04()
		this.instance_4.setTransform(-20.1, -167.5, 0.0482, 0.0482)

		this.instance_5 = new lib.friut_03()
		this.instance_5.setTransform(-20.1, 127.5, 0.0482, 0.0482)

		this.instance_6 = new lib.friut_02()
		this.instance_6.setTransform(-20.1, 68.5, 0.0482, 0.0482)

		this.instance_7 = new lib.friut_01()
		this.instance_7.setTransform(-20.1, -49.5, 0.0482, 0.0482)

		this.timeline.addTween(
			cjs.Tween.get({})
				.to({
					state: [
						{ t: this.instance_7 },
						{ t: this.instance_6 },
						{ t: this.instance_5 },
						{ t: this.instance_4 },
						{ t: this.instance_3 },
						{ t: this.instance_2 },
						{ t: this.instance_1 },
						{ t: this.instance },
					],
				})
				.wait(1)
		)

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(-20.1, -226.5, 40.2, 453)
	;(lib.Tween3 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib._7()
		this.instance.setTransform(-20.1, -226.5, 0.048, 0.048)

		this.instance_1 = new lib._7()
		this.instance_1.setTransform(-20.1, 186.5, 0.048, 0.048)

		this.instance_2 = new lib.friut_06()
		this.instance_2.setTransform(-20.1, 9.5, 0.0482, 0.0482)

		this.instance_3 = new lib.friut_05()
		this.instance_3.setTransform(-20.1, -108.5, 0.0482, 0.0482)

		this.instance_4 = new lib.friut_04()
		this.instance_4.setTransform(-20.1, -167.5, 0.0482, 0.0482)

		this.instance_5 = new lib.friut_03()
		this.instance_5.setTransform(-20.1, 127.5, 0.0482, 0.0482)

		this.instance_6 = new lib.friut_02()
		this.instance_6.setTransform(-20.1, 68.5, 0.0482, 0.0482)

		this.instance_7 = new lib.friut_01()
		this.instance_7.setTransform(-20.1, -49.5, 0.0482, 0.0482)

		this.timeline.addTween(
			cjs.Tween.get({})
				.to({
					state: [
						{ t: this.instance_7 },
						{ t: this.instance_6 },
						{ t: this.instance_5 },
						{ t: this.instance_4 },
						{ t: this.instance_3 },
						{ t: this.instance_2 },
						{ t: this.instance_1 },
						{ t: this.instance },
					],
				})
				.wait(1)
		)

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(-20.1, -226.5, 40.2, 453)
	;(lib.screen = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib.slot_screen()
		this.instance.setTransform(-1042, -1042)

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(-1042, -1042, 2084, 2084)
	;(lib.Big_button = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.shape = new cjs.Shape()
		this.shape.graphics.f('#0066CC').s().p('Aj+HqIAAvTIH9AAIAAPTg')

		this.timeline.addTween(cjs.Tween.get(this.shape).wait(1))

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(-25.5, -49, 51, 98)
	;(lib.slot_a = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// timeline functions:
		this.frame_0 = function () {
			var _this = this
			/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
			_this.stop()
			window.top.postMessage({ type: 'animation', action: 'stop' })
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(50))

		// mask_right (mask)
		var mask = new cjs.Shape()
		mask._off = true
		mask.graphics.p(
			'AjaE6QAWjcAAhXQAAg2gKiMIgKh/IFLAAIAPATQASAaAQAhQAyBrAFCLQACBJgwB8QgZA+gYAug'
		)
		mask.setTransform(93.5561, 62.15)

		// slot_right_copy
		this.instance = new lib.Tween3('synched', 0)
		this.instance.setTransform(91.75, -143)

		var maskedShapeInstanceList = [this.instance]

		for (
			var shapedInstanceItr = 0;
			shapedInstanceItr < maskedShapeInstanceList.length;
			shapedInstanceItr++
		) {
			maskedShapeInstanceList[shapedInstanceItr].mask = mask
		}

		this.timeline.addTween(
			cjs.Tween.get(this.instance)
				.wait(19)
				.to({ startPosition: 0 }, 0)
				.to({ y: 270.45 }, 20)
				.to({ y: 274.95 }, 3)
				.to({ y: 269.95 }, 4)
				.wait(4)
		)

		// mask_center (mask)
		var mask_1 = new cjs.Shape()
		mask_1._off = true
		mask_1.graphics.p('AjFE9IAAp5IGLAAIAAJ5g')
		mask_1.setTransform(46.75, 62.25)

		// slot_center
		this.instance_1 = new lib.Tween3('synched', 0)
		this.instance_1.setTransform(46.5, -143)

		var maskedShapeInstanceList = [this.instance_1]

		for (
			var shapedInstanceItr = 0;
			shapedInstanceItr < maskedShapeInstanceList.length;
			shapedInstanceItr++
		) {
			maskedShapeInstanceList[shapedInstanceItr].mask = mask_1
		}

		this.timeline.addTween(
			cjs.Tween.get(this.instance_1)
				.wait(9)
				.to({ startPosition: 0 }, 0)
				.to({ x: 46.4, y: 269.9 }, 18)
				.to({ y: 276.4 }, 2)
				.to({ y: 270 }, 3)
				.wait(18)
		)

		// mask_left (mask)
		var mask_2 = new cjs.Shape()
		mask_2._off = true
		var mask_2_graphics_0 = new cjs.Graphics().p(
			'AisDPQgwh8AChJQAFiLAyhrQAQghASgaIAPgTIFLAAIgKB/QgKCMAAA2QAABXAWDcIlWABQgYgugZg+g'
		)
		var mask_2_graphics_29 = new cjs.Graphics().p(
			'AisDPQgwh8AChJQAFiLAyhrQAQghASgaIAPgTIFLAAIgKB/QgKCMAAA2QAABXAWDcIlWABQgYgugZg+g'
		)

		this.timeline.addTween(
			cjs.Tween.get(mask_2)
				.to({ graphics: mask_2_graphics_0, x: 0.2939, y: 62.15 })
				.wait(29)
				.to({ graphics: mask_2_graphics_29, x: 0.2939, y: 62.15 })
				.wait(21)
		)

		// solt_left
		this.instance_2 = new lib.Tween4('synched', 0)
		this.instance_2.setTransform(2.1, -143)

		var maskedShapeInstanceList = [this.instance_2]

		for (
			var shapedInstanceItr = 0;
			shapedInstanceItr < maskedShapeInstanceList.length;
			shapedInstanceItr++
		) {
			maskedShapeInstanceList[shapedInstanceItr].mask = mask_2
		}

		this.timeline.addTween(
			cjs.Tween.get(this.instance_2)
				.to({ y: 269.9 }, 18)
				.to({ y: 276.35 }, 2)
				.to({ y: 269.9 }, 3)
				.wait(27)
		)

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(-18, 30.5, 129.9, 63.5)
	;(lib.PuppetShape_6 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib.WarpedAsset_1('synched', 0)

		this.instance_1 = new lib.BMP_514abf5e_0be7_473d_b3ad_9a95eecc3cf6()
		this.instance_1.setTransform(18.8, 93.95)

		this.timeline.addTween(
			cjs.Tween.get({})
				.to({ state: [{ t: this.instance }] })
				.to({ state: [{ t: this.instance_1 }] }, 1)
				.wait(1)
		)

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(0, 0, 135.8, 379)
	;(lib.PuppetShape_5 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib.WarpedAsset_1('synched', 0)

		this.instance_1 = new lib.BMP_136365d5_a210_40e8_add4_bd59badac591()
		this.instance_1.setTransform(15.05, 165.6)

		this.timeline.addTween(
			cjs.Tween.get({})
				.to({ state: [{ t: this.instance }] })
				.to({ state: [{ t: this.instance_1 }] }, 1)
				.wait(1)
		)

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(0, 0, 149.1, 379)
	;(lib.PuppetShape_4 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib.WarpedAsset_1('synched', 0)

		this.instance_1 = new lib.BMP_d0dbc985_1ffc_482a_ad68_baea08abee0a()
		this.instance_1.setTransform(10.65, 275.55)

		this.timeline.addTween(
			cjs.Tween.get({})
				.to({ state: [{ t: this.instance }] })
				.to({ state: [{ t: this.instance_1 }] }, 1)
				.wait(1)
		)

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(0, 0, 135, 379)
	;(lib.PuppetShape_3 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib.WarpedAsset_1('synched', 0)

		this.instance_1 = new lib.BMP_75e62a8e_f1ca_462f_9471_b021701dc351()
		this.instance_1.setTransform(18.4, 271.05)

		this.timeline.addTween(
			cjs.Tween.get({})
				.to({ state: [{ t: this.instance }] })
				.to({ state: [{ t: this.instance_1 }] }, 1)
				.wait(1)
		)

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(0, 0, 135, 469.1)
	;(lib.PuppetShape_2 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib.WarpedAsset_1('synched', 0)

		this.instance_1 = new lib.BMP_6e93da09_e19e_4297_9d7d_06fa570c0c80()
		this.instance_1.setTransform(10.95, 235.3)

		this.timeline.addTween(
			cjs.Tween.get({})
				.to({ state: [{ t: this.instance }] })
				.to({ state: [{ t: this.instance_1 }] }, 1)
				.to({ state: [] }, 1)
				.wait(1)
		)

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(0, 0, 157, 379)
	;(lib.PuppetShape_1 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// Layer_1
		this.instance = new lib.WarpedAsset_1('synched', 0)

		this.instance_1 = new lib.BMP_71059833_6dea_490e_b76a_57165b646dd5()
		this.instance_1.setTransform(21, 25)

		this.timeline.addTween(
			cjs.Tween.get({})
				.to({ state: [{ t: this.instance }] })
				.to({ state: [{ t: this.instance_1 }] }, 1)
				.to({ state: [] }, 1)
				.wait(5)
		)

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(0, 0, 135, 379)
	;(lib._switch = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		// timeline functions:
		this.frame_0 = function () {
			var _this = this
			/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
			_this.stop()
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(6))

		// switch_top
		this.instance = new lib.Tween5('synched', 0)
		this.instance.setTransform(104.75, -38.25)

		this.instance_1 = new lib.Tween6('synched', 0)
		this.instance_1.setTransform(104.75, 53.75)

		this.timeline.addTween(
			cjs.Tween.get({})
				.to({ state: [{ t: this.instance }] })
				.to({ state: [{ t: this.instance }] }, 3)
				.to({ state: [{ t: this.instance_1 }] }, 2)
				.wait(1)
		)
		this.timeline.addTween(
			cjs.Tween.get(this.instance)
				.to({ x: 113.1, y: 6.1 }, 3)
				.to({ _off: true, x: 104.75, y: 53.75 }, 2)
				.wait(1)
		)

		// switch_pole
		this.instance_2 = new lib.PuppetShape_1('synched', 1, false)
		this.instance_2.setTransform(
			95.4,
			-8.15,
			0.184,
			0.184,
			0,
			0,
			0,
			67.4,
			189.4
		)

		this.instance_3 = new lib.PuppetShape_6('synched', 1, false)
		this.instance_3.setTransform(
			96.55,
			-6.55,
			0.184,
			0.184,
			0,
			0,
			0,
			67.7,
			189.1
		)
		this.instance_3._off = true

		this.instance_4 = new lib.PuppetShape_5('synched', 1, false)
		this.instance_4.setTransform(97.6, -5, 0.184, 0.184, 0, 0, 0, 67.7, 189.1)
		this.instance_4._off = true

		this.instance_5 = new lib.PuppetShape_2('synched', 1, false)
		this.instance_5.setTransform(
			98.65,
			-3.4,
			0.184,
			0.184,
			0,
			0,
			0,
			67.4,
			189.4
		)
		this.instance_5._off = true

		this.instance_6 = new lib.PuppetShape_4('synched', 1, false)
		this.instance_6.setTransform(98.8, 0.1, 0.184, 0.184, 0, 0, 0, 67.7, 189.1)
		this.instance_6._off = true

		this.instance_7 = new lib.PuppetShape_3('synched', 1, false)
		this.instance_7.setTransform(96.9, 3.35, 0.184, 0.184, 0, 0, 0, 67.4, 189.4)

		this.timeline.addTween(
			cjs.Tween.get({})
				.to({ state: [{ t: this.instance_2 }] })
				.to({ state: [{ t: this.instance_3 }] }, 1)
				.to({ state: [{ t: this.instance_4 }] }, 1)
				.to({ state: [{ t: this.instance_5 }] }, 1)
				.to({ state: [{ t: this.instance_6 }] }, 1)
				.to({ state: [{ t: this.instance_7 }] }, 1)
				.wait(1)
		)
		this.timeline.addTween(
			cjs.Tween.get(this.instance_2)
				.to({ _off: true, regX: 67.7, regY: 189.1, x: 96.55, y: -6.55 }, 1)
				.wait(5)
		)
		this.timeline.addTween(
			cjs.Tween.get(this.instance_3)
				.to({ _off: false }, 1)
				.to({ _off: true, x: 97.6, y: -5 }, 1)
				.wait(4)
		)
		this.timeline.addTween(
			cjs.Tween.get(this.instance_4)
				.wait(1)
				.to({ _off: false }, 1)
				.to({ _off: true, regX: 67.4, regY: 189.4, x: 98.65, y: -3.4 }, 1)
				.wait(3)
		)
		this.timeline.addTween(
			cjs.Tween.get(this.instance_5)
				.wait(2)
				.to({ _off: false }, 1)
				.to({ _off: true, regX: 67.7, regY: 189.1, x: 98.8, y: 0.1 }, 1)
				.wait(2)
		)
		this.timeline.addTween(
			cjs.Tween.get(this.instance_6)
				.wait(3)
				.to({ _off: false }, 1)
				.to({ _off: true, regX: 67.4, regY: 189.4, x: 96.9, y: 3.35 }, 1)
				.wait(1)
		)

		this._renderFirstFrame()
	}).prototype = p = new cjs.MovieClip()
	p.nominalBounds = new cjs.Rectangle(86.9, -47, 35, 109.5)

	// stage content:
	;(lib.slot_2 = function (mode, startPosition, loop, reversed) {
		if (loop == null) {
			loop = true
		}
		if (reversed == null) {
			reversed = false
		}
		var props = new Object()
		props.mode = mode
		props.startPosition = startPosition
		props.labels = {}
		props.loop = loop
		props.reversed = reversed
		cjs.MovieClip.apply(this, [props])

		this.actionFrames = [0]
		this.isSingleFrame = false
		// timeline functions:
		this.frame_0 = function () {
			if (this.isSingleFrame) {
				return
			}
			if (this.totalFrames == 1) {
				this.isSingleFrame = true
			}
			var _this = this
			/*
		Clicking on the specified symbol instance executes a function.
		*/
			_this.big.on('click', function () {
				/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
				_this.switch_animation.play()
				_this.A.gotoAndPlay('enterFrameLabel')
			})
			play = function () {
				/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
				_this.switch_animation.play()
				_this.A.gotoAndPlay('enterFrameLabel')
			}
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1))

		// Big_button
		this.big = new lib.Big_button()
		this.big.name = 'big'
		this.big.setTransform(473.4, 175.05)
		new cjs.ButtonHelper(this.big, 0, 1, 1)

		this.timeline.addTween(cjs.Tween.get(this.big).wait(1))

		// switch_idn
		this.switch_animation = new lib._switch()
		this.switch_animation.name = 'switch_animation'
		this.switch_animation.setTransform(275, 200)

		this.timeline.addTween(cjs.Tween.get(this.switch_animation).wait(1))

		// screen
		this.instance = new lib.screen('synched', 0)
		this.instance.setTransform(274.95, 197.8, 0.2005, 0.2005, 0, 0, 0, -0.2, 0)
		this.instance.alpha = 0.2617

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))

		// slot_a
		this.A = new lib.slot_a()
		this.A.name = 'A'
		this.A.setTransform(229.1, 158)

		this.timeline.addTween(cjs.Tween.get(this.A).wait(1))

		// slot
		this.instance_1 = new lib.slot()
		this.instance_1.setTransform(66, -11, 0.2005, 0.2005)

		this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1))

		// light
		this.instance_2 = new lib.light()
		this.instance_2.setTransform(66, -11, 0.2005, 0.2005)

		this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1))

		// bg
		this.instance_3 = new lib.bg()
		this.instance_3.setTransform(-21, -11, 0.2843, 0.2005)

		this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1))

		this._renderFirstFrame()
	}).prototype = p = new lib.AnMovieClip()
	p.nominalBounds = new cjs.Rectangle(254, -11.5, 317.5, 418.4)
	// library properties:
	lib.properties = {
		id: '1B25E5E726B92D4DB434108D676CE9B2',
		width: 550,
		height: 400,
		fps: 24,
		color: '#FFFFFF',
		opacity: 1.0,
		manifest: [
			{ src: 'images/bg.png?1718615421826', id: 'bg' },
			{ src: 'images/light.png?1718615421826', id: 'light' },
			{ src: 'images/slot.png?1718615421826', id: 'slot' },
			{ src: 'images/slot_screen.png?1718615421826', id: 'slot_screen' },
			{ src: 'images/slot_atlas_1.png?1718615421806', id: 'slot_atlas_1' },
			{ src: 'images/slot_atlas_2.png?1718615421806', id: 'slot_atlas_2' },
		],
		preloads: [],
	}

	// bootstrap callback support:
	;(lib.Stage = function (canvas) {
		createjs.Stage.call(this, canvas)
	}).prototype = p = new createjs.Stage()

	p.setAutoPlay = function (autoPlay) {
		this.tickEnabled = autoPlay
	}
	p.play = function () {
		this.tickEnabled = true
		this.getChildAt(0).gotoAndPlay(this.getTimelinePosition())
	}
	p.stop = function (ms) {
		if (ms) this.seek(ms)
		this.tickEnabled = false
	}
	p.seek = function (ms) {
		this.tickEnabled = true
		this.getChildAt(0).gotoAndStop((lib.properties.fps * ms) / 1000)
	}
	p.getDuration = function () {
		return (this.getChildAt(0).totalFrames / lib.properties.fps) * 1000
	}

	p.getTimelinePosition = function () {
		return (this.getChildAt(0).currentFrame / lib.properties.fps) * 1000
	}

	an.bootcompsLoaded = an.bootcompsLoaded || []
	if (!an.bootstrapListeners) {
		an.bootstrapListeners = []
	}

	an.bootstrapCallback = function (fnCallback) {
		an.bootstrapListeners.push(fnCallback)
		if (an.bootcompsLoaded.length > 0) {
			for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
				fnCallback(an.bootcompsLoaded[i])
			}
		}
	}

	an.compositions = an.compositions || {}
	an.compositions['1B25E5E726B92D4DB434108D676CE9B2'] = {
		getStage: function () {
			return exportRoot.stage
		},
		getLibrary: function () {
			return lib
		},
		getSpriteSheet: function () {
			return ss
		},
		getImages: function () {
			return img
		},
	}

	an.compositionLoaded = function (id) {
		an.bootcompsLoaded.push(id)
		for (var j = 0; j < an.bootstrapListeners.length; j++) {
			an.bootstrapListeners[j](id)
		}
	}

	an.getComposition = function (id) {
		return an.compositions[id]
	}

	an.makeResponsive = function (
		isResp,
		respDim,
		isScale,
		scaleType,
		domContainers
	) {
		var lastW,
			lastH,
			lastS = 1
		window.addEventListener('resize', resizeCanvas)
		resizeCanvas()
		function resizeCanvas() {
			var w = lib.properties.width,
				h = lib.properties.height
			var iw = window.innerWidth,
				ih = window.innerHeight
			var pRatio = window.devicePixelRatio || 1,
				xRatio = iw / w,
				yRatio = ih / h,
				sRatio = 1
			if (isResp) {
				if (
					(respDim == 'width' && lastW == iw) ||
					(respDim == 'height' && lastH == ih)
				) {
					sRatio = lastS
				} else if (!isScale) {
					if (iw < w || ih < h) sRatio = Math.min(xRatio, yRatio)
				} else if (scaleType == 1) {
					sRatio = Math.min(xRatio, yRatio)
				} else if (scaleType == 2) {
					sRatio = Math.max(xRatio, yRatio)
				}
			}
			domContainers[0].width = w * pRatio * sRatio
			domContainers[0].height = h * pRatio * sRatio
			domContainers.forEach(function (container) {
				container.style.width = w * sRatio + 'px'
				container.style.height = h * sRatio + 'px'
			})
			stage.scaleX = pRatio * sRatio
			stage.scaleY = pRatio * sRatio
			lastW = iw
			lastH = ih
			lastS = sRatio
			stage.tickOnUpdate = false
			stage.update()
			stage.tickOnUpdate = true
		}
	}
	an.handleSoundStreamOnTick = function (event) {
		if (!event.paused) {
			var stageChild = stage.getChildAt(0)
			if (!stageChild.paused || stageChild.ignorePause) {
				stageChild.syncStreamSounds()
			}
		}
	}
	an.handleFilterCache = function (event) {
		if (!event.paused) {
			var target = event.target
			if (target) {
				if (target.filterCacheList) {
					for (var index = 0; index < target.filterCacheList.length; index++) {
						var cacheInst = target.filterCacheList[index]
						if (
							cacheInst.startFrame <= target.currentFrame &&
							target.currentFrame <= cacheInst.endFrame
						) {
							cacheInst.instance.cache(
								cacheInst.x,
								cacheInst.y,
								cacheInst.w,
								cacheInst.h
							)
						}
					}
				}
			}
		}
	}
})((createjs = createjs || {}), (AdobeAn = AdobeAn || {}))
var createjs, AdobeAn

window.addEventListener('message', ({ data }) => {
	if (data === 'play') play()
})
