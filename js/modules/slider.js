function slider(){
	const sliders = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		next = document.querySelector('.offer__slider-next'),
		prev = document.querySelector('.offer__slider-prev'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width;

let indexSlider = 1;
let offset = 0;
// ініцалация індекса
if(sliders.length < 10){
	total.textContent = `0${sliders.length}`;
	current.textContent = `0${indexSlider}`;
} else {
	total.textContent = sliders.length;
	current.textContent = indexSlider;
}

slidesField.style.width = 100 * sliders.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

sliders.forEach(slide => {
	slide.style.width = width;
});
// 1. устанавливаем свойство relative для самого слайдера,чтоби потом относительно его позиционириновать точки
slider.style.position = 'relative';
// 2. создаем обертку для точек чтоби его застилизовать
const indicators = document.createElement('ol'),
		dots = [];
		indicators.classList.add('carousel-indicators');
		indicators.style.cssText = `
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 15;
			display: flex;
			justify-content: center;
			margin-right: 15%;
			margin-left: 15%;
			list-style: none;
		`;
// 3. добавляем индикатори на страницу
slider.append(indicators);
// 4. в блоке точек создаем такое количество точек сколько есть сладеров
	for(let i = 0; i < sliders.length; i++){
		const dot = document.createElement('li');
		dot.setAttribute(`data-slide-to`, i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}
// преобразование строки у число з використанням регулярних виразів
	function deleteNotDigits(str){
		return +str.replace(/\D/g, '');
	}

// установка стіля для актівнї точки
	function setDotStyle(){
		dots.forEach(item => item.style.opacity = '0.5');
		dots[indexSlider - 1].style.opacity = '1';
	}
// правільное отображеніе индекса на странице
	function setCurIndexSlider(){
		if(sliders.length < 10){
			current.textContent = `0${indexSlider}`;
		} else {
			current.textContent = indexSlider;
		}
	}

	next.addEventListener('click', () => {
		// механізм проверки смещения - offset
		if (offset == deleteNotDigits(width) * (sliders.length - 1)) {
			// '500px' -- если ето последний слайд, то смещение к первому слайду
			offset = 0;
		} else {

			offset += deleteNotDigits(width);// не последний слайд то добавляем смещение на ширину слада
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		//контроль индекса слайдера
			if( indexSlider == sliders.length){
				indexSlider = 1;
			} else{
				indexSlider++;
			}
		// установка текущего индекса на странице
		setCurIndexSlider();
		// for dots
		setDotStyle();
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (sliders.length - 1);

		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		// контроль индекса слайдера
		if( indexSlider == 1){
			indexSlider = sliders.length;
		} else{
			indexSlider--;
		}
		// установка текущего индекса на странице
			setCurIndexSlider();
		// for dots
			setDotStyle();
	});

// добавление точек к слайдеру
	dots.forEach(dot => {
		dot.addEventListener('click', (e) =>{
			const slideTo = e.target.getAttribute('data-slide-to');

			indexSlider = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			// установка текущего индекса на странице
			setCurIndexSlider();
			// for dots
			setDotStyle();
		});
	});

}

module.exports = slider;
