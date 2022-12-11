window.addEventListener('DOMContentLoaded',() => {

	// Tabs
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

// Timer

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

 // Modal

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

// используем класси для карточек

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

// fetch('http://localhost:3000/menu')
// .then(data => data.json())
// .then(res => console.log(res));

// slider show
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
		if (offset == deleteNotDigits(width) * (sliders.length - 1)) { // '500px' -- если ето последний слайд, то смещение к первому слайду
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

	// localStorage.setItem('number', 5);
	// localStorage.clear();
});
