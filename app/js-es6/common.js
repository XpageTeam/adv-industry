$(window).on("load", e => {
	$("body").removeClass("loading").addClass("loaded");

	var wow = new WOW(
	  {
	    boxClass:     'wow',      // animated element css class (default is wow)
	    animateClass: 'animated', // animation css class (default is animated)
	    offset:       0,          // distance to the element when triggering the animation (default is 0)
	    mobile:       true,       // trigger animations on mobile devices (default is true)
	    live:         true,       // act on asynchronously loaded content (default is true)
	    callback:     function(box) {
	      // the callback is fired every time an animation is started
	      // the argument that is passed in is the DOM node being animated
	    },
	    scrollContainer: null,    // optional scroll container selector, otherwise use window,
	    resetAnimation: true,     // reset animation on end (default is true)
	  }
	);

	wow.init();
});

let main_slider, 
	bloking = false, 
	slidesCount = 0, 
	currentSlide,
	mainPortImgs,
	lastSlide = 0;

$(e => {
	$(".singl-worck__slider").slick({
		slide: ".singl-worck__slide",
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		fade: true,
		speed: 400,
	});

	$(".standard-slider__list").slick({
		slide: ".standard-slider__item",
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		speed: 400,
		responsive: [
			{
				breakpoint: 820,
				settings: {
					slidesToShow: 2,
				},
				breakpoint: 660,
				settings: {
					slidesToShow: 1,
				},
			}
		]
	});

	$('body').on('click', '.burger', function(){
		var $this = $(this);

		$('body').toggleClass('mobile-menu--open');
	});

	$('.js__menu-close').click(function(){
		var $this = $(this);
		$this.closest('.footer__top').removeClass('js__submenu-open');
	});

	$('.js__menu-close').click(function(){
		var $this = $(this);

		$this.closest('.footer__menu').removeClass('js__sub');
	});


	if($(window).width() < 820){

		$('.footer-top__column--double .footer__menu').prepend('\
			<div class="js__menu-close">\
				<span>Назад</span>\
			</div>');

		

		
		$('body').on('click', '.footer-top__column-title', function(){
			var $this = $(this);

			$this.next().addClass('js__sub');
			$this.closest('.footer__top').addClass('js__submenu-open');

		});
	}

	var menu = $('.footer__top').clone();
	$('.mobile-menu').prepend(menu);

	$('.portfolio__list .portfolio__item').each(function(i, el){
		var $this = $(el);
	});

	
	$(window).on('load resize', e => {
		var setHeight = $('header').innerHeight();
		$('.services__content').css('top', setHeight);
	});

	
	$('.portfolio__list').addClass('animation');

	$(window).on('resize', e => {

		$('.text-page table').wrap('<div class="table-block"><div class="table-wrap"></div></div>');
	})

	$('.text-page table').wrap('<div class="table-block"><div class="table-wrap"></div></div>');





	if($('body').find('.video-cont').length){

		$("body").on("mouseover", ".portfolio__item", function(){
			var $video = $(this).find('video');

			if(!$video.length){
				return
			}

			if($video.attr('src')){
				$video[0].play();
				} else {
					var dataSrc = $video.attr('data-src');
					$video.attr('src', dataSrc);

					$video[0].addEventListener('loadedmetadata', () => {
						$video[0].play();
					})
				}
			
		});

		$("body").on("mouseleave", ".portfolio__item", function(){
			var $video = $(this).find('video');

			if(!$video.length){
				return
			}
			$video[0].pause();

			$video[0].currentTime = 0;
		})

	}

	if($('body .services-cont').find('video').length){
		var videoEl = document.getElementsByTagName('video')[0];

		setTimeout(function(){
			videoEl.play();
		}, 3000);
	}






	


	
	

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

	$(".fancybox").fancybox({
		beforeShow (){
			$("body").addClass("fancy-active")
		},
		afterClose (){
			$("body").removeClass("fancy-active")	
		}
	});

	
	

	// $(".port-one__title").each((i, el) => {
	// 	new stringEffect({
	// 		selector: $(el),
	// 		afterFinish($el, count, options){
	// 			// let $parent = $el.closest(".port-one");

	// 			// $parent.find(".port-one__img").css({
	// 			// 	// "transition-delay": (count * options.timeStep) + "s",
	// 			// 	transform: "translate3d(0, "+(options.transformStep * count)+"%, 0)"
	// 			// });
	// 		}
	// 	});
	// });

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

		lastSlide = curSlide;
		
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

	mainPortImgs = new mainPort(".port-one");

	if ($(window).scrollTop() > 0){
		mainPortImgs.startAnimate();
		curScreen = 2;
	}

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

			mainPortImgs.startAnimate();

			setTimeout(e => {
				$(".main-port").addClass("js__animated");
			}, scrollTime);

		}else if(curScreen == 1){
			e.preventDefault();
			if (lastSlide > 1)
				main_slider.slick("slickGoTo", lastSlide);
			else
				main_slider.slick("slickNext");
		}
	}
	else{
		if ($(window).scrollTop() - $(window).height() <= 0 && 
			curScreen == 2 && $(".img--3")[0].scrollTop == 0){
			curScreen = 1;
			$("html, body").animate({
				scrollTop: 0
			}, 300);

			mainPortImgs.hide();

		}else if (curScreen != 2){
			e.preventDefault();

			main_slider.slick("slickGoTo", 0);
		}
	}
}

class stringEffect{
	set settings(settings){

		const defaultSettings = {
			options: {
				timeStep: .12,
				timeOffset: 0,
				transformStep: 20,
				transformStepOffset: 0,
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
		this.afterFinish();

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
			this.$el.append(" <span>"+textArr[i]+"</span>");

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
				top: parseInt($this.position().top),
			});
		});

		this.wrapStrings(stringsDesc);
	}

	wrapStrings(stringsDesc = []){
		this.stringCounter = 0;

		let {
			timeStep: delay, 
			timeOffset: tmOffset, 
			transformStep: transStep,
			transformStepOffset: transStepOffset,
		} = this.settings.options;

		for (let i in stringsDesc){


			let word = stringsDesc[i],
				time = tmOffset + this.stringCounter * delay,
				transform = transStepOffset + this.stringCounter * transStep;

			if (!this.$el.find(".string--"+word.top).length){
				this.$el.append("<div class=\"string string--"+word.top+"\">\
					 <span>"
						+this.$el.children("span:eq("+word.id+")").html()+
					"</span>\
				</div>");

				this.stringCounter++;

				this.$el.find(".string--"+word.top).css({
					"transition-delay": time+"s",
					transform: "translate3d(0, "+transform+"%, 0)"
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

class mainPort{
	set $elements(selector){
		this._els = $(selector);
	}
	get $elements(){
		return this._els;
	}

	constructor(selector){
		this.$elements = selector;

		if (!this.$elements.length)
			return

		this.$strings = [];

		this.prepare()
	}
	prepare(){
		let $els = this.$elements;

		$els.each((i, el) => {
			let $this = $(el);

			this.$strings.push(new stringEffect({
				selector: $this.find(".port-one__title"),
				options: {
					timeOffset: 1.3,
				},
				afterFinish($el, count, options){
					let $subtitle = $el.next(".port-one__subtitle");

					// console.log(options);

					new stringEffect({
						selector: $subtitle,
						options: {
							timeOffset: options.timeOffset + options.timeStep * count,
							transformStepOffset: options.transformStep * count,
						}
					})
				}
			}))
		});
	}
	startAnimate(){
		for (let i = 0; i < this.$elements.length; i++){
			let $el = $(this.$elements[i]);

			this.show($el, i);
		}
	}
	show($block, step){
		setTimeout(e => {
			$block.addClass("js__animated");
		}, 300 * step)
	}
	hide(){
		this.$elements.removeClass("js__animated")
	}
}

$(window).on("scroll toucmove", e => {
	// mainPortImgs.sshow();
});