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
