var swiper = new Swiper(".swiper", {
	slidesPerView: "auto",
	spaceBetween: 60,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	loop: true,
	autoplay: {
		delay: 2600,
		disableOnInteraction: true,
	},
});


var swiperAlpha = new Swiper(".alpha", {
	slidesPerView: "auto",
	spaceBetween: 0,
	loop: true,
	autoplay: {
		delay: 2600,
		disableOnInteraction: true,
	},
});