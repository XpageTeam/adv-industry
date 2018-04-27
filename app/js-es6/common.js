$(window).on("load", e => {
	$("body").removeClass("loading").addClass("loaded");
});

let main_slider, bloking = false, slidesCount = 0, currentSlide;

$(e => {

	$(".img--3")[0].scrollTop = Cookies.get("botBlockScroll") ? Cookies.get("botBlockScroll") : 0;

	$(".img--3").on("scroll", function(){
		Cookies.set("botBlockScroll", $(this)[0].scrollTop);
	});

	let play = new playBtn({
		selector: $(".play-btn__btn"),
		delay: 1100,
	});

	$(".text__text p, .text2__text-text p").each((i, el) => {
		let $this = $(el);

		new stringEffect({
			selector: $this,
			afterFinish($el, count, options){
				$el.closest(".text2__text").find(".text2__text-link").css({
					"transition-delay": (count * options.timeStep) + "s",
					transform: "translate3d(0, "+(options.transformStep * count)+"%, 0)"
				})
			}
		});
	});

	$(".port-one__title").each((i, el) => {
		new stringEffect({
			selector: $(el),
			afterFinish($el, count, options){
				// let $parent = $el.closest(".port-one");

				// $parent.find(".port-one__img").css({
				// 	// "transition-delay": (count * options.timeStep) + "s",
				// 	transform: "translate3d(0, "+(options.transformStep * count)+"%, 0)"
				// });
			}
		});
	});

	slidesCount = $(".main-screen__slider .img").length;

	main_slider = $(".main-screen__slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		slide: ".img",
		arrows: false,
		fade: true,
		// swipe: false,
		dots: true,
		appendDots: $(".img-slider__dots"),
		infinite: false,
	}).on("beforeChange", (e, slick, curSlide, nextSlide) => {
		bloking = true,


		$(".main-screen__slider .img:eq("+curSlide+")").removeClass("js__active-slide");

		if (curSlide == 0)
			play.clear();
		
		if (nextSlide == 0)
			$(".img-slider__dots").removeClass("js__visible")
		
	}).on("afterChange", (e, slick, curSlide) => {
		$(".main-screen__slider .img:eq("+curSlide+")").addClass("js__active-slide");

		currentSlide = (curSlide + 1 == slidesCount ? "last" : curSlide);

		if (curSlide == 0)
			play.startAnimate();
		else
			$(".img-slider__dots").addClass("js__visible")

		setTimeout(e => {
			bloking = false;
		}, 1100)
	});

	$(".main-screen__slider .img:eq(0)").addClass("js__active-slide");

	let $slidesTitle = $(".text2__text-title"),
		dotsCount = $(".img-slider__dots button").length - 1;

	$(".img-slider__dots button").each((i, el) => {
		if (i == 0)
			return;

		let $this = $(el);

		$this.css({
			"transition-delay": ""+(0.12 * i)+"s",
			transform: "translate3d(0, "+(30*i)+"%, 0)"
		});

		$this.html("");

		$this.append("<span>"+$($slidesTitle[i-1]).text()+"</span>");
	});

	$(".all-services").css({
		"transition-delay": ""+(0.12 * dotsCount)+"s",
		transform: "translate3d(0, "+(30*dotsCount)+"%, 0)"
	});

	addMouseWheelHandler();
})

class playBtn{
	constructor(options = {}){


		this.el = $(options.selector)[0];
		this.delay = options.delay;
		this.context = this.el.getContext("2d");
		this.center = $(this.el).width() / 2;
		this.radius = $(this.el).width() / 2;
		this.offset = 0;
		this.interval;
		// this.printTriangle();

		setTimeout(e => {
			this.startAnimate();
		}, this.delay)
	}

	clear(){
		this.stopAnimate();
		this.offset = 0;
		this.context.clearRect(0, 0, $(this.el).width(), $(this.el).width());
		$(this.el).closest(".play-btn").removeClass("js__animated");
	}

	startAnimate(){
		this.interval = setInterval(e => {
			this.animate()
		}, 5);
	}

	stopAnimate(){
		$(this.el).closest(".play-btn").addClass("js__animated");
		clearInterval(this.interval)
	}

	printTriangle(){
	}

	printBorder(start, end, width){
		let ctx = this.context;

		ctx.beginPath();
		ctx.arc(this.center, this.center, this.radius, start, end, false);
		ctx.lineWidth = 2;
		ctx.fillStyle = "#f7f7f7";
		ctx.strokeStyle = "#e31e24";
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
	animate(){
		this.printBorder(this.offset, this.offset + 0.045);

		this.offset += 0.045;

		if (this.offset > Math.PI * 2)
			this.stopAnimate();
	}
}

let curScreen = 1;

function addMouseWheelHandler(){
	if (document.addEventListener) {
		document.addEventListener("mousewheel", MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
		document.addEventListener("wheel", MouseWheelHandler, false); //Firefox
	}
}

function removeMouseWheelHandler(){
	if (document.addEventListener) {
		document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
		document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
	}
}

function MouseWheelHandler(e) {
	e = window.event || e;

	if (bloking){
		return
	}

	var delta = Math.max(-1, Math.min(1,
			(e.wheelDelta || -e.deltaY || -e.detail)));

	if (delta < 0){
		if (main_slider.slick("slickCurrentSlide") != 0 &&  curScreen == 1){
			// removeMouseWheelHandler();
			curScreen = 2;

			let scrollTime = 300;

			$("html, body").animate({
				scrollTop: $(".img--3").offset().top
			}, scrollTime);

			setTimeout(e => {
				$(".main-port").addClass("js__animated");
			}, scrollTime);

		}else if(curScreen == 1){
			e.preventDefault();
			console.log(123);
			main_slider.slick("slickNext");
		}
	}
	else{
		if ($(window).scrollTop() - $(window).height() <= 0 && 
			curScreen == 2 && $(".img--3")[0].scrollTop == 0){
			curScreen = 1;
			$("html, body").animate({
				scrollTop: 0
			}, 300)
		}else if (curScreen != 2){
			e.preventDefault();
	
			console.log(125312231);
			// main_slider.slick("slickPrev")
			main_slider.slick("slickGoTo", 0);
		}
	}
}

class stringEffect{
	set settings(settings){

		const defaultSettings = {
			options: {
				timeStep: .12,
				transformStep: 20, 
			}, 
			beforeStart(){

			}, 
			afterFinish(){

			},
		};

		this._settings = $.extend( true, {}, defaultSettings, settings);
	}
	get settings(){
		return this._settings;
	}
	set $el(selector){
		this._el = selector
	}
	get $el(){
		return $(this._el)
	}

	afterFinish(){
		// console.log(this.settings.afterFinish);
		this.settings.afterFinish(this.$el, this.stringCounter, this.settings.options)
	}

	beforeStart(){
		this.settings.beforeStart(this.$el, this.stringCounter, this.settings.options)
	}


	constructor(settings = {}){
		this.settings = settings;

		this.$el = this.settings.selector;

		this.init()
	}

	init(){
		this.wrapWords();
		this.createStrings();

		this.whatch();
	}

	rebuild(){
		this.destroyStrings();
		this.createStrings();
	}

	wrapWords(){
		this.beforeStart();

		let textArr = this.$el.html().split(" ");

		this.$el.html("");

		for (let i in textArr)
			this.$el.append(" <span>"+textArr[i]+"</span>")
	}

	destroyStrings(){
		this.$el.children("div").children("span").unwrap();
	}

	createStrings(){
		let $text = this.$el.children("span"),
			stringsDesc = [];

		$text.each((i, el) => {
			let $this = $(el);

			// console.log(parseInt($this.position().top);

			stringsDesc.push({
				id: i,
				text: $this.html(),
				top: parseInt($this.position().top),
			});
		});

		this.wrapStrings(stringsDesc);


		this.afterFinish();
	}

	wrapStrings(stringsDesc = []){
		this.stringCounter = 0;

		let {timeStep: time, transformStep: transStep} = this.settings.options;

		for (let i in stringsDesc){
			let word = stringsDesc[i];

			if (!this.$el.find(".string--"+word.top).length){
				this.$el.append("<div class='string string--"+word.top+"'>\
					  <span>"
						+this.$el.children("span:eq("+word.id+")").html()+
					"</span>\
				</div>");

				this.stringCounter++;

				this.$el.find(".string--"+word.top).css({
					"transition-delay": ""+(this.stringCounter*time)+"s",
					transform: "translate3d(0, "+(this.stringCounter*transStep)+"%, 0)"
				});
			}else
				this.$el.find(".string--"+word.top)
					.append(" <span>"
						+this.$el.children("span:eq("+word.id+")").html()+
					"</span>");
		}

		this.$el.children("span").remove();
	}


	whatch(){
		$(window).on("resize", e => {
			clearTimeout(this.updateTimeout);

			this.updateTimeout = setTimeout(e => {
				this.rebuild();
			}, 100)
		});
	}
}