$(window).on("load", e => {
	$("body").removeClass("loading").addClass("loaded");
});

let main_slider, bloking = false;

$(e => {
	let play = new playBtn({
		selector: $(".play-btn__btn"),
		delay: 1100,
	});

	main_slider = $(".main-screen__slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		slide: ".img",
		arrows: false,
		fade: true,
		infinite: false,
	}).on("beforeChange", (e, slick, curSlide, nextSlide) => {
		bloking = true,

		$(".main-screen__slider .img:eq("+curSlide+")").removeClass("js__active-slide");

		if (curSlide == 0){
			play.clear();
		}
	}).on("afterChange", (e, slick, curSlide) => {
		$(".main-screen__slider .img:eq("+curSlide+")").addClass("js__active-slide");
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
		console.log(123);
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
		if (main_slider.slick("slickCurrentSlide") == 1 && curScreen == 1){
			// removeMouseWheelHandler();
			curScreen = 2;

			$("html, body").animate({
				scrollTop: $(".img--3").offset().top
			}, 300);
		}else if (curScreen == 1){
			e.preventDefault();
			main_slider.slick("slickNext");
		}
	}
	else{
		if ($(window).scrollTop() - $(window).height() <= 0 && curScreen == 2 && $(".img--3")[0].scrollTop == 0){
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