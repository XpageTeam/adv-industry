$(window).on("load", e => {
	$("body").removeClass("loading").addClass("loaded");
});

let main_slider, bloking = false, slidesCount = 0, currentSlide;

$(e => {
	let play = new playBtn({
		selector: $(".play-btn__btn"),
		delay: 1100,
	});

	$(".text__text p, .text2__text-text p").each((i, el) => {
		let $this = $(el);

		new stringEffect($this);
	});

	slidesCount = $(".main-screen__slider .img").length;

	main_slider = $(".main-screen__slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		slide: ".img",
		arrows: false,
		fade: true,
		swipe: false,
		infinite: false,
	}).on("beforeChange", (e, slick, curSlide, nextSlide) => {
		bloking = true,


		$(".main-screen__slider .img:eq("+curSlide+")").removeClass("js__active-slide");

		if (curSlide == 0){
			play.clear();
		}
	}).on("afterChange", (e, slick, curSlide) => {
		$(".main-screen__slider .img:eq("+curSlide+")").addClass("js__active-slide");

		currentSlide = (curSlide + 1 == slidesCount ? "last" : curSlide);

		if (curSlide == 0)
			play.startAnimate()

		setTimeout(e => {
			bloking = false;
		}, 1100)
	});

	$(".main-screen__slider .img:eq("+0+")").addClass("js__active-slide");

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
		let ctx = this.context,
			img = new Image();

		img.src = "img/play-btn.jpg";

		img.onload = e => {
			// $(".img--1").append(img);
			// ctx.beginPath()
			// ctx.fillStyle = ctx.createPattern(img, "no-repeat");
			// ctx.fillRect(0,0,90,$(this.el).width())
			// ctx.

			
		}

		// ctx
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
	} else {
		document.attachEvent("onmousewheel", MouseWheelHandler); //IE 6/7/8
	}
}

function removeMouseWheelHandler(){
	if (document.addEventListener) {
		document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
		document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
	} else {
		document.detachEvent("onmousewheel", MouseWheelHandler); //IE 6/7/8
	}
}

function MouseWheelHandler(e) {
	e = window.event || e;

	if (bloking){
		// e.preventDefault();
		return
	}

	var delta = Math.max(-1, Math.min(1,
			(e.wheelDelta || -e.deltaY || -e.detail)));

	if (delta < 0){
		if (main_slider.slick("slickCurrentSlide") == slidesCount-1 &&  curScreen == 1 && currentSlide == "last"){
			// removeMouseWheelHandler();
			curScreen = 2;

			$("html, body").animate({
				scrollTop: $(".img--3").offset().top
			}, 300);
		}else{
			e.preventDefault();
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
		}else if (curScreen == 1){
			e.preventDefault();
			main_slider.slick("slickPrev")
		}
	}
}

class stringEffect{
	set $el(selector){
		this._el = selector
	}
	get $el(){
		return $(this._el)
	}


	constructor(selector){
		this.$el = selector;

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
		let textArr = this.$el.html().split(" ");

		this.$el.html("");

		for (let i in textArr){
			this.$el.append("<span>"+textArr[i]+"</span> ")
		}
	}

	destroyStrings(){
		this.$el.children("div").children("span").unwrap();
	}

	createStrings(){
		let $text = this.$el.children("span"),
			stringsDesc = [];

		$text.each((i, el) => {
			let $this = $(el);

			stringsDesc.push({
				id: i,
				text: $this.html(),
				top: parseInt($this.position().top),
			});
		});

		console.log(stringsDesc);

		this.wrapStrings(stringsDesc);
	}

	wrapStrings(stringsDesc = []){
		// console.log(stringsDesc)
		this.stringCounter = 0;
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
					"transition-delay": (this.stringCounter*0.12)+"s",
					transform: "translate3d(0, "+(this.stringCounter*2)+"0%, 0)"
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