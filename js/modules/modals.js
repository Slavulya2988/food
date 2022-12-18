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
