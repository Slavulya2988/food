/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc(){
	let sex,height, weight, age, ratio;
const result = document.querySelector('.calculating__result span');
	if (localStorage.getItem('sex')){
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}
	if (localStorage.getItem('ratio')){
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

function initLocalsetting(selector, activeClass){
	const elem = document.querySelectorAll(`${selector} div`),
			sex = localStorage.getItem('sex'),
			ratio = localStorage.getItem('ratio');
	elem.forEach(elem => {
		elem.classList.remove(activeClass);

		if(elem.getAttribute('id') === sex){
			elem.classList.add(activeClass);
		}

		if(elem.getAttribute('data-ratio') === ratio){
			elem.classList.add(activeClass);
		}

	});

}

initLocalsetting('#gender', 'calculating__choose-item_active');
initLocalsetting('.calculating__choose_big', 'calculating__choose-item_active');

function calcTotal(){
	if (!sex || !height || !weight || !age || !ratio){
		result.textContent = '';
		return;
	}

	if (sex === 'female') {
		result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
	} else {
		result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
	}
}

calcTotal();

function getStaticInformation (selector, activeClass){
	const elements = document.querySelectorAll(`${selector} div`);

	elements.forEach(elem => {
		elem.addEventListener('click', (e) => {
			if(e.target.getAttribute('data-ratio')){
				ratio = +e.target.getAttribute('data-ratio');
				localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
			} else{
				sex = e.target.getAttribute('id');
				localStorage.setItem('sex', e.target.getAttribute('id'));
			}
			elements.forEach(elem => {
				elem.classList.remove(activeClass);
			});

			e.target.classList.add(activeClass);
			calcTotal();
		});
	});

	}

getStaticInformation('#gender', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
	const input = document.querySelector(selector);

	input.addEventListener('input', () => {
		if(input.value.match(/\D/g)){
			input.style.border = '1px solid red';
		} else {
			input.style.border = 'none';
		}

		switch(input.getAttribute('id')){
			case 'height':
				height = +input.value;
				break;
			case 'weight':
				weight = +input.value;
				break;
			case 'age':
				age = +input.value;
				break;
		}
		calcTotal();
	});


}
getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');

}

module.exports = calc;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
	class MenuCards {
		constructor(src, alt, title, descr, price, parentSelector){
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH(){
			this.price = this.price * this.transfer;
		}

		render(){
			const element = document.createElement('div');
			element.innerHTML = `
			<div class="menu__item">
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			  </div>
			`;
			this.parent.append(element);
		}

	}
	const getResource = async (url) => {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCards(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	//формування верстки налету
	// getResource('http://localhost:3000/menu')
	// 	.then(data => createCard(data));

	// function createCard(data){
	// 	data.forEach(({img, altimg, title, descr, price}) => {
	// 		const element = document.createElement('div');
	// 		element.classList.add('menu__item');
	// 		element.innerHTML = `
	// 		<img src=${img} alt=${altimg}>
	// 			<h3 class="menu__item-subtitle">${title}</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Цена:</div>
	// 				<div class="menu__item-total"><span>${price}</span> грн/день</div>
	// 		`;
	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }



	// fetch('http://localhost:3000/menu')
	// .then(data => data.json())
	// .then(res => console.log(res));
}
module.exports = cards;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms(){
// POST - взять несклько форм и из них отправлять дание в файл server.php

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		sucsess: 'Дякую, ми скоро передзвонимо...',
		failure: 'Щось пійшло не так...'
	};
	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
				method: "POST",
				headers: {
					'Content-type': 'application/json'
				},
				body: data
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
					statusMessage.src = message.loading;
					statusMessage.style.cssText = `
					display: block;
					margin: 0 auto;
					`;
			form.insertAdjacentElement('afterend', statusMessage);

			// об'кет FormData позволяет сформіровать из форми все данние ключ-значеніе
			// в html  страници в елемнтах input всегда должни бить указан атрибут name
			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.sucsess);
				statusMessage.remove();
			}).catch(() =>{
				showThanksModal(message.failure);
			}).finally( () => {
				form.reset();
			});
		});
	}

	// функция відображення повідомлення у модальному вікні

	function showThanksModal(message){
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
		<div data-close class="modal__close">×</div>
		<div class="modal__title">${message}</div>
		</div>
		`;

		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);


	}

}

module.exports = forms;


/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/***/ ((module) => {

function modals(){
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalCloseBtn = document.querySelector('[data-close]')
 ;

 modalTrigger.forEach(btn => {
	btn.addEventListener('click', openModal);
  });

function openModal() {
	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	clearInterval(modalIntervalId);
}

function closeModal(){
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
  }

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e)=> {
	if(e.target === modal || e.target.getAttribute('data-close') == ''){
		closeModal();
	}
  });

document.addEventListener('keydown', (e) => {
	if(e.code === 'Escape' && modal.classList.contains('show')){
		closeModal();
	}
  });

const modalIntervalId = setTimeout(openModal, 50000);

function showWindowByScroll() {
	if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
		openModal();
		window.removeEventListener('scroll', showWindowByScroll);
 	}
 }

// window.addEventListener('scroll', showWindowByScroll);

}

module.exports = modals;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs(){
	const tabs = document.querySelectorAll('.tabheader__item'),
			tabsContent = document.querySelectorAll('.tabcontent'),
			tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show' , 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');

		});
	}

	function showTabContent(i = 0){
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains('tabheader__item')){
			tabs.forEach( (item , i) => {
				if(target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

}

module.exports = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer(){

const deadLine = '2022-12-31 GMT+0200';
// получиім разницн между датами
function getTimeRemaining(endTime) {
	// Date.parse(endTime) количество милисекунд до которого нам нужно дойти
	// Date.parse(new Date()) текущее время в милисекундах
	const t = Date.parse(endTime) - Date.parse(new Date());
	let days, hours, minutes, seconds;

	if (t < 0) {
		days = 0;
		hours = 0;
		minutes = 0;
		seconds = 0;
	} else {
		   days = Math.floor    ( t / (1000 * 60 * 60 * 24) );
			hours = Math.floor   ((t / (1000 * 60 * 60)) % 24);
			minutes = Math.floor ((t / (1000 * 60)) % 60);
			seconds = Math.floor  ((t /  1000) % 60);
	}

	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'second': seconds
	};
}

function getZero(num) {
	if(num >= 0 &&  num < 10){
		return `0${num}`;
	} else {
		return num;
	}
}

function setClock(selector, endTime){
	const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			second = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000)
			;

	updateClock();

	function updateClock() {
		const t = getTimeRemaining(endTime);

		days.innerHTML = getZero(t.days);
		hours.innerHTML = getZero(t.hours);
		minutes.innerHTML = getZero(t.minutes);
		second.innerHTML = getZero(t.second);

		if(t.total <= 0) {
			clearInterval(timeInterval);
		}

	}
}
	setClock('.timer', deadLine);
}
module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded',() => {

// Tabs
// Timer
// Modal
// используем класси для карточек
// slider
// calculator
// forms

const tabs   =  __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
		timer  =  __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
		modal  =  __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js"),
		cards  =  __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
		slider =  __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
		calc   =  __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
		forms  =  __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");

tabs();
timer();
modal();
cards();
slider();
calc();
forms();

});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map