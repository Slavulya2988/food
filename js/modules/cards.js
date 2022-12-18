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
